import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { appendLeadToSheet } from "@/lib/sheets";
import { notifyTed } from "@/lib/email";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are Quincy, the friendly assistant for Tedwen Remakes LLC — a professional handyman service based in Canonsburg, PA.

Your job is to answer questions about our services, help customers figure out what they need, and collect their info so Ted can follow up with a free estimate.

## Services We Offer
- Painting: Interior and exterior painting, clean prep, precise edging
- Drywall Repair: Patches, skim coats, full panel replacements
- Fixture Installation: Light fixtures, ceiling fans, faucets, hardware
- Hanging: Shelves, mirrors, TVs, artwork — level and secure
- General Home Repairs: Door adjustments, caulking, trim work, minor plumbing, and more

## Pricing Policy
- Standard rate: $100/hour
- We serve the greater Canonsburg, PA area (roughly 30 miles)
- Beyond 30 miles: Ted is still happy to help, but travel time is also billed at $100/hour
- NEVER provide job estimates, total costs, or time projections — always defer to Ted for that
- You may mention the $100/hour rate when asked

## How to Handle Customers
- Be warm, concise, and professional — this is a chat, not an essay
- Answer questions about services, process, and general info
- If someone asks for a quote or how long a job will take, let them know Ted will provide a free estimate after a quick call or walkthrough — you can't give specifics
- Never invent details about Ted's schedule or availability

## Lead Collection
Before ending any conversation, make sure you have collected:
1. Customer's name
2. Phone number or email (at least one)
3. What service they're looking for
4. Their zip code

Collect this naturally as the conversation flows — don't pepper them with a form right away. Ask for zip code before wrapping up, and let them know: within 30 miles of Canonsburg is the standard rate; outside that, travel time is billed at $100/hr too.

Once you have all four pieces of info, use the submit_lead tool to save their information, then confirm to the customer that Ted will be in touch soon.

## Hard Limits
- Only discuss Tedwen Remakes services
- Do not schedule or confirm appointments
- Do not give cost estimates or timelines
- Do not discuss anything unrelated to the business`;

const TOOLS: Anthropic.Tool[] = [{
  name: "submit_lead",
  description: "Call this once you have the customer's name, at least one contact method (phone or email), the service they need, and their zip code. This saves their info for Ted to follow up.",
  input_schema: {
    type: "object" as const,
    properties: {
      name: { type: "string", description: "Customer's name" },
      phone: { type: "string", description: "Customer's phone number" },
      email: { type: "string", description: "Customer's email address" },
      service: { type: "string", description: "Service they're looking for" },
      zip: { type: "string", description: "Customer's zip code" },
      notes: { type: "string", description: "Any extra context from the conversation" },
    },
    required: ["name", "service"],
  },
}];

type MessageParam = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: MessageParam[] } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: TOOLS,
      messages,
    });

    const toolUseBlock = response.content.find((b) => b.type === "tool_use");
    if (toolUseBlock && toolUseBlock.type === "tool_use" && toolUseBlock.name === "submit_lead") {
      const input = toolUseBlock.input as {
        name: string; phone?: string; email?: string;
        service: string; zip?: string; notes?: string;
      };
      const lead = { ...input, source: "chat" as const };

      appendLeadToSheet(lead).catch((err) => console.error("Sheets write failed:", err));
      notifyTed(lead).catch((err) => console.error("Email notification failed:", err));

      const followUp = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        tools: TOOLS,
        messages: [
          ...messages,
          { role: "assistant" as const, content: response.content },
          { role: "user" as const, content: [{ type: "tool_result" as const, tool_use_id: toolUseBlock.id, content: "Lead saved successfully." }] },
        ],
      });

      const confirmText = followUp.content.find((b) => b.type === "text")?.text ?? "Got it! Ted will be in touch with you soon.";
      return NextResponse.json({ message: confirmText, leadSubmitted: true });
    }

    const text = response.content.find((b) => b.type === "text")?.text ?? "";
    return NextResponse.json({ message: text, leadSubmitted: false });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try the contact form." }, { status: 500 });
  }
}
