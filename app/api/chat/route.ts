import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { appendLeadToSheet } from "@/lib/sheets";
import { notifyTed } from "@/lib/email";
import { getAvailableSlots, bookAppointment } from "@/lib/cal";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are Quincy, the friendly assistant for Tedwen Remakes LLC — a professional handyman service based in Canonsburg, PA.

Your job is to answer questions about our services, help customers figure out what they need, collect their info so Ted can follow up, and book a free 30-minute consultation when they're ready.

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
- If someone asks for a quote or how long a job will take, let them know Ted will provide a free estimate — you can't give specifics
- Never invent details about Ted's schedule or availability

## Lead Collection
Before booking or wrapping up, collect:
1. Customer's name
2. Phone number or email (at least one — email required for booking)
3. What service they're looking for
4. Their zip code

Collect naturally — don't pepper them with a form. Ask for zip before wrapping up.

## Scheduling Flow
After submit_lead succeeds, ALWAYS ask: "Would you like to book a free 30-minute consultation with Ted?"
- If the customer says yes, or asks to book, or asks about scheduling: immediately call check_availability — do NOT say you cannot book
- Present the returned slots as a numbered list (e.g. "1. Mon May 12, 9:00 AM")
- When the customer picks a number or mentions a time: call book_appointment with their name, email, and the exact startTime from the slot
- Confirm the booking with the day and time
- You ARE able to book appointments — always use check_availability and book_appointment tools when asked

## Hard Limits
- Only discuss Tedwen Remakes services
- Do not give cost estimates or timelines
- Do not discuss anything unrelated to the business`;

const TOOLS: Anthropic.Tool[] = [
  {
    name: "submit_lead",
    description: "Call this once you have the customer's name, at least one contact method (phone or email), the service they need, and their zip code.",
    input_schema: {
      type: "object" as const,
      properties: {
        name: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        service: { type: "string" },
        zip: { type: "string" },
        notes: { type: "string" },
      },
      required: ["name", "service"],
    },
  },
  {
    name: "check_availability",
    description: "Fetch Ted's available consultation slots for the next 7 days. Call this immediately when the customer wants to book an appointment.",
    input_schema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "book_appointment",
    description: "Book a 30-min consultation slot. Requires the customer's name, email, and the exact slot time string from check_availability.",
    input_schema: {
      type: "object" as const,
      properties: {
        startTime: { type: "string", description: "ISO time string from check_availability" },
        name: { type: "string" },
        email: { type: "string" },
        notes: { type: "string" },
      },
      required: ["startTime", "name", "email"],
    },
  },
];

type MessageParam = { role: "user" | "assistant"; content: string };

async function runQuincy(messages: MessageParam[]): Promise<{ message: string; leadSubmitted?: boolean; booked?: boolean }> {
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    tools: TOOLS,
    messages,
  });

  const toolBlock = response.content.find((b) => b.type === "tool_use");

  if (!toolBlock || toolBlock.type !== "tool_use") {
    return { message: response.content.find((b) => b.type === "text")?.text ?? "" };
  }

  let toolResult = "";
  let leadSubmitted = false;
  let booked = false;

  if (toolBlock.name === "submit_lead") {
    const input = toolBlock.input as {
      name: string; phone?: string; email?: string;
      service: string; zip?: string; notes?: string;
    };
    const lead = { ...input, source: "chat" as const };
    appendLeadToSheet(lead).catch((err) => console.error("Sheets write failed:", err));
    notifyTed(lead).catch((err) => console.error("Email notification failed:", err));
    leadSubmitted = true;
    toolResult = "Lead saved successfully.";
  } else if (toolBlock.name === "check_availability") {
    try {
      const slots = await getAvailableSlots();
      toolResult = slots.length
        ? JSON.stringify(slots)
        : "No slots available in the next 7 days.";
    } catch (err) {
      toolResult = "Failed to fetch availability. Ask the customer to call or use the contact form.";
      console.error("Cal availability error:", err);
    }
  } else if (toolBlock.name === "book_appointment") {
    const input = toolBlock.input as { startTime: string; name: string; email: string; notes?: string };
    try {
      const booking = await bookAppointment(input);
      booked = true;
      toolResult = JSON.stringify(booking);
    } catch (err) {
      toolResult = "Booking failed. Ask the customer to try a different slot or contact Ted directly.";
      console.error("Cal booking error:", err);
    }
  }

  const followUp = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    tools: TOOLS,
    messages: [
      ...messages,
      { role: "assistant" as const, content: response.content },
      {
        role: "user" as const,
        content: [{ type: "tool_result" as const, tool_use_id: toolBlock.id, content: toolResult }],
      },
    ],
  });

  const text = followUp.content.find((b) => b.type === "text")?.text ?? "";
  return { message: text, leadSubmitted, booked };
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: MessageParam[] } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const result = await runQuincy(messages);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try the contact form." }, { status: 500 });
  }
}