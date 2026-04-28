"use client";
import { useState, FormEvent } from "react";
const services = ["Painting","Drywall Repair","Fixture Installation","Hanging (shelves, mirrors, TVs, artwork)","General Home Repairs","Other / Not Sure"];
type FormState = "idle" | "submitting" | "success" | "error";
export default function Contact() {
  const [state, setState] = useState<FormState>("idle");
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { setState("success"); form.reset(); } else { setState("error"); }
    } catch { setState("error"); }
  }
  const inputClass = "w-full bg-warm-dark border border-border-gray text-white placeholder:text-warm-gray px-4 py-3 text-sm focus:outline-none focus:border-warm-gray transition-colors";
  return (
    <section id="contact" className="bg-charcoal py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-warm-gray mb-4">Reach Out</p>
        <h2 className="font-display text-3xl md:text-4xl font-normal mb-4">Get a Free Estimate</h2>
        <p className="text-warm-gray mb-12 text-sm leading-relaxed max-w-lg">Tell us about your project and we&apos;ll get back to you promptly. No pressure, no obligation.</p>
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2 flex flex-col gap-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-warm-gray mb-2">Email</p>
              {/* TODO: Replace with Ted's actual email */}
              <a href="mailto:13dmh33@gmail.com" className="text-white text-sm hover:text-warm-gray transition-colors">13dmh33@gmail.com</a>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-warm-gray mb-2">Phone</p>
              {/* TODO: Replace with Ted's actual phone number */}
              <a href="tel:+15555555555" className="text-white text-sm hover:text-warm-gray transition-colors">(555) 555-5555</a>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-warm-gray mb-2">Location</p>
              <p className="text-white text-sm">Canonsburg, PA</p>
              <p className="text-warm-gray text-sm">Serving the greater Pittsburgh area</p>
            </div>
          </div>
          <div className="md:col-span-3">
            {state === "success" ? (
              <div className="border border-border-gray p-8 text-center">
                <p className="font-display text-xl mb-2">We&apos;ll be in touch.</p>
                <p className="text-warm-gray text-sm">Your message was received. Expect a response within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="name" type="text" placeholder="Name" required className={inputClass} />
                  <input name="phone" type="tel" placeholder="Phone" className={inputClass} />
                </div>
                <input name="email" type="email" placeholder="Email" required className={inputClass} />
                <select name="service" required className={`${inputClass} cursor-pointer`}>
                  <option value="" disabled>Service Needed</option>
                  {services.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
                <textarea name="message" placeholder="Tell us about your project..." rows={5} className={inputClass} />
                {state === "error" && <p className="text-red-400 text-xs">Something went wrong. Please try again or email us directly.</p>}
                <button type="submit" disabled={state === "submitting"} className="mt-2 px-8 py-3 bg-white text-black font-sans font-bold text-xs tracking-widest uppercase hover:bg-off-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-start">
                  {state === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
