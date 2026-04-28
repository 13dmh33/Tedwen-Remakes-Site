"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";
const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? "bg-charcoal border-b border-border-gray" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" aria-label="Tedwen Remakes LLC — back to top"><Logo size={36} variant="light" /></a>
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-warm-gray hover:text-white transition-colors text-xs tracking-widest uppercase">{link.label}</a>
          ))}
        </div>
        <button className="md:hidden text-white p-1" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle navigation menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (<><line x1="5" y1="5" x2="17" y2="17" /><line x1="17" y1="5" x2="5" y2="17" /></>) : (<><line x1="3" y1="6" x2="19" y2="6" /><line x1="3" y1="11" x2="19" y2="11" /><line x1="3" y1="16" x2="19" y2="16" /></>)}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-border-gray px-6 py-5 flex flex-col gap-5">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-warm-gray hover:text-white transition-colors text-xs tracking-widest uppercase" onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
