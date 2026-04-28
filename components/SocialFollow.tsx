const socials = [
  { label: "Instagram", href: "https://www.instagram.com/TEDWENRemakesLLC", icon: (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></svg>) },
  { label: "Facebook", href: "https://www.facebook.com/people/Tedwen-Remakes-LLC/100095170577049", icon: (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>) },
  { label: "Yelp", href: "https://www.yelp.com/biz/tedwen-remakes-canonsburg-4", icon: (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>) },
];
export default function SocialFollow() {
  return (
    <section id="social" className="bg-charcoal border-t border-border-gray py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs tracking-widest uppercase text-warm-gray mb-4">Stay Connected</p>
        <h2 className="font-display text-3xl md:text-4xl font-normal mb-5">Follow Our Work</h2>
        <p className="text-warm-gray text-sm leading-relaxed mb-10 max-w-md mx-auto">New projects posted regularly. See what we&apos;ve been building.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {socials.map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 border border-border-gray text-warm-gray hover:text-white hover:border-warm-gray transition-colors text-xs tracking-widest uppercase font-sans font-bold">{icon}{label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
