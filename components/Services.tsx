const services = [
  { name: "Painting", description: "Interior and exterior painting with clean prep, precise edging, and a finish that lasts.", icon: (<svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 32l4-4 16-16-4-4L8 24v8z" /><path d="M24 8l4 4" /><path d="M30 6c1.1 1.1 1.1 2.9 0 4l-2 2-4-4 2-2c1.1-1.1 2.9-1.1 4 0z" /><path d="M6 34h4" /></svg>) },
  { name: "Drywall Repair", description: "Patches, skim coats, and full panel replacements — seamlessly matched to the existing wall.", icon: (<svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="28" height="28" rx="1" /><path d="M14 14h12M14 20h12M14 26h8" /><circle cx="28" cy="26" r="3" /></svg>) },
  { name: "Fixture Installation", description: "Light fixtures, ceiling fans, faucets, hardware — installed correctly and up to code.", icon: (<svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M28 12l-4 4-2-2 4-4a4 4 0 00-5.66-5.66L16 8.68V11l-8 8 3 3 8-8h2.32l4.34-4.34A4 4 0 0028 12z" /><path d="M14 26l-6 6" /><path d="M20 20l6 6-4 4-6-6" /></svg>) },
  { name: "Hanging", description: "Shelves, mirrors, TVs, and artwork hung level, anchored securely, and exactly where you want them.", icon: (<svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="14" width="24" height="18" rx="1" /><path d="M20 14v-6" /><circle cx="20" cy="6" r="2" /><path d="M14 22h12M14 28h8" /></svg>) },
  { name: "General Home Repairs", description: "Door adjustments, caulking, trim work, minor plumbing, and the dozen other things on your list.", icon: (<svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 30l4-4 4 4-4 4-4-4z" /><path d="M14 26L28 12" /><path d="M24 8l4 4-2 2-4-4 2-2z" /><path d="M8 32l2-2" /><circle cx="30" cy="30" r="4" /><path d="M30 26v4h4" /></svg>) },
];
export default function Services() {
  return (
    <section id="services" className="bg-charcoal py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-warm-gray mb-4">What We Do</p>
        <h2 className="font-display text-3xl md:text-4xl font-normal mb-14">Our Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.name} className="bg-warm-dark border border-border-gray p-8 flex flex-col gap-4 hover:border-warm-gray transition-colors">
              <div className="text-warm-gray">{service.icon}</div>
              <h3 className="font-display text-xl font-normal text-white">{service.name}</h3>
              <p className="text-warm-gray text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
