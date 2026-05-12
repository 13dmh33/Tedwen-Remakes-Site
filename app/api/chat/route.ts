import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

const SYSTEM_PROMPT = `You are the scheduling assistant for Tedwen Remakes LLC, a home repair and renovation company in Canonsburg, PA serving greater Pittsburgh.

Your job is one continuous goal: understand the customer's project, get their contact info, and lock in their availability — all woven together as one natural text conversation. Don't treat these as separate phases or steps. Just talk like a person.

Services: Painting, Drywall Repair, Fixture Installation, Hanging (shelves, mirrors, TVs, artwork), General Home Repairs.

Rules:
- Keep every reply to 1–2 short sentences. Texting style.
- Never ask more than one question per message.
- Let the project details guide what you ask next — don't follow a rigid script.
- Weave in name/contact asks naturally when the moment feels right, not upfront.
- Once you have their name, a way to reach them (phone or email), what they need, and when they're thinking — call capture_lead. Don't announce you're doing it.
- After capturing the lead, tell them Ted will be in touch and wrap up warmly.`;

const CAPTURE_LEAD_TOOL: Anthropic.Tool = {
  name: "capture_lead",
  description:
    "Call when you have the customer's name, contact info (phone or email), the service they need, and their availability. This notifies Ted.",
  input_schema: {
    type: "object" as const,
    properties: {
      name: { type: "string" },
      contact: { type: "string", description: "Phone number or email" },
      service: { type: "string" },
      availability: { type: "string" },
      notes: { type: "string", description: "Any other relevant project details" },
    },
    required: ["name", "contact", "service", "availability"],
  },
};

interface LeadData {
  name: string;
  contact: string;
  service: string;
  availability: string;
  notes?: string;
}

async function notifyTed(lead: LeadData) {
  if (!process.env.RESEND_API_KEY) return;
  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@tedwenremakes.com";
  const to = process.env.TED_EMAIL ?? "13dmh33@gmail.com";
  await resend.emails.send({
    from,
    to,
    subject: `New Lead: ${lead.name} — ${lead.service}`,
    html: `
      <h2 style="font-family:sans-serif">New lead from website chat</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 16px 6px 0;color:#666">Name</td><td>${lead.name}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666">Contact</td><td>${lead.contact}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666">Service</td><td>${lead.service}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666">Availability</td><td>${lead.availability}</td></tr>
        ${lead.notes ? `<tr><td style="padding:6px 16px 6px 0;color:#666">Notes</td><td>${lead.notes}</td></tr>` : ""}
      </table>
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 256,
      system: SYSTEM_PROMPT,
      tools: [CAPTURE_LEAD_TOOL],
      messages,
    });

    // Handle tool use: notify Ted, then get Claude's closing message
    if (response.stop_reason === "tool_use") {
      const toolBlock = response.content.find((b) => b.type === "tool_use");
      if (toolBlock?.type === "tool_use" && toolBlock.name === "capture_lead") {
        await notifyTed(toolBlock.input as LeadData).catch(console.error);

        const followUp = await anthropic.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 128,
          system: SYSTEM_PROMPT,
          tools: [CAPTURE_LEAD_TOOL],
          messages: [
            ...messages,
            { role: "assistant" as const, content: response.content },
            {
              role: "user" as const,
              content: [
                {
                  type: "tool_result" as const,
                  tool_use_id: toolBlock.id,
                  content: "Lead captured.",
                },
              ],
            },
          ],
        });

        const text = followUp.content.find((b) => b.type === "text")?.text ?? "";
        return NextResponse.json({ text, lead_captured: true });
      }
    }

    const text = response.content.find((b) => b.type === "text")?.text ?? "";
    return NextResponse.json({ text, lead_captured: false });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
