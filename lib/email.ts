import { Resend } from "resend";
import type { Lead } from "./sheets";

// TODO: Replace with Ted's actual email address
const TED_EMAIL = "13dmh33@gmail.com";

export async function notifyTed(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email notification.");
    return;
  }

  const resend = new Resend(apiKey);
  const subject = lead.source === "chat"
    ? `New Quincy Lead: ${lead.name} — ${lead.service}`
    : `New Contact Form: ${lead.name} — ${lead.service}`;

  const body = `
New lead from the Tedwen Remakes website.

Source: ${lead.source === "chat" ? "Quincy Chat" : "Contact Form"}
Name: ${lead.name}
Phone: ${lead.phone || "—"}
Email: ${lead.email || "—"}
Service: ${lead.service}
Zip Code: ${lead.zip || "—"}
Notes: ${lead.notes || "—"}
  `.trim();

  await resend.emails.send({
    from: "Tedwen Remakes <noreply@tedwenremakes.com>",
    to: TED_EMAIL,
    subject,
    text: body,
  });
}
