import { NextRequest, NextResponse } from "next/server";

// TODO: Wire up email delivery before going live.
// Options:
//   A) Resend — add RESEND_API_KEY to Vercel env vars
//   B) Formspree — replace fetch in Contact.tsx with Formspree endpoint
// Recipient: replace 13dmh33@gmail.com with Ted's actual address

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, message } = body;
    if (!name || !email || !service) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    console.log("Contact form submission:", { name, phone, email, service, message });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
