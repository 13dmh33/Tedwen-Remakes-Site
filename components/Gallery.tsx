// TODO: Replace placeholder divs with real project photos.
// Use Next.js <Image>: import Image from "next/image"
// Place photos in /public/gallery/ and reference as src="/gallery/photo-1.jpg"
const placeholders = [
  { id: 1, label: "Painting Project" }, { id: 2, label: "Drywall Repair" },
  { id: 3, label: "Fixture Installation" }, { id: 4, label: "Shelf Hanging" },
  { id: 5, label: "Home Repair" }, { id: 6, label: "Interior Painting" },
];
export default function Gallery() {
  return (
    <section id="gallery" className="bg-warm-dark py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-warm-gray mb-4">Portfolio</p>
        <h2 className="font-display text-3xl md:text-4xl font-normal mb-14">Our Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {placeholders.map(({ id, label }) => (
            <div key={id} className="aspect-[4/3] bg-charcoal border border-border-gray flex flex-col items-center justify-center gap-3 text-center p-6">
              <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 text-border-gray" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="8" width="32" height="24" rx="2" /><circle cx="14" cy="17" r="3" /><path d="M4 28l8-8 6 6 4-4 10 10" /></svg>
              <p className="text-border-gray text-xs tracking-widest uppercase">{label}</p>
              <p className="text-warm-gray text-xs">Photo coming soon</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
