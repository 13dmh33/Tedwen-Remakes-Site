import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Tedwen Remakes LLC | Handyman Services — Canonsburg, PA",
  description: "Professional handyman services including painting, drywall repair, fixture installation, hanging, and general home repairs. Serving Canonsburg, PA and surrounding areas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-charcoal text-white font-sans">{children}</body>
    </html>
  );
}
