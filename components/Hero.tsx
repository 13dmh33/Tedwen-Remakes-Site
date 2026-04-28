import Logo from "./Logo";
export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-charcoal px-6 text-center">
      <Logo size={130} variant="light" className="mb-10" />
      <h1 className="font-display text-4xl md:text-6xl font-normal leading-tight mb-5 max-w-2xl">
        Quality Craftsmanship,<br />Every Repair.
      </h1>
      <p className="text-warm-gray text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
        Painting, drywall, fixtures, hanging, and general home repairs — done right the first time.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a href="#services" className="px-8 py-3 bg-white text-black font-sans font-bold text-xs tracking-widest uppercase hover:bg-off-white transition-colors">View Services</a>
        <a href="#contact" className="px-8 py-3 border border-white text-white font-sans font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors">Book a Consultation</a>
      </div>
    </section>
  );
}
