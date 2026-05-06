import { NextRequest, NextResponse } from "next/server";
import { appendLeadToSheet } from "@/lib/sheets";
import { notifyTed } from "@/lib/email";

// TODO: Replace 13dmh33@gmail.com with Ted's actual email in lib/email.ts
// TODO: Replace (555) 555-5555 with Ted's actual phone in components/Contact.tsx

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, message } = body;
    if (!name || !email || !service) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const lead = { name, phone: phone || undefined, email, service, notes: message || undefined, source: "form" as const };
    await Promise.allSettled([appendLeadToSheet(lead), notifyTed(lead)]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
