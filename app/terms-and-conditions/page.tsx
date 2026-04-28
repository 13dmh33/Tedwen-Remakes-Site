import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms & Conditions | Tedwen Remakes LLC" };
export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-charcoal px-6 py-24">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-warm-gray text-xs tracking-widest uppercase hover:text-white transition-colors mb-12 inline-block">← Back to Home</Link>
        <h1 className="font-display text-3xl md:text-4xl font-normal mb-6">Terms &amp; Conditions</h1>
        <p className="text-warm-gray leading-relaxed">Terms and Conditions coming soon.</p>
      </div>
    </main>
  );
}
