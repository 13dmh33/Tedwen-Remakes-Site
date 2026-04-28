import Image from "next/image";
// Photos in /public/gallery/ — job1.jpg (home bar), job2.jpg (kitchen), job3.jpg (wine cellar)
const photos = [
  { src: "/gallery/job1.jpg", label: "Home Bar Build-Out", alt: "Custom home bar with marble countertop and wine rack" },
  { src: "/gallery/job2.jpg", label: "Kitchen Backsplash & Fixtures", alt: "Stone tile backsplash with lighting and outlet work" },
  { src: "/gallery/job3.jpg", label: "Wine Cellar Shelving", alt: "Custom wine cellar with built-in shelving and stone accent wall" },
];
export default function Gallery() {
  return (
    <section id="gallery" className="bg-warm-dark py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-warm-gray mb-4">Portfolio</p>
        <h2 className="font-display text-3xl md:text-4xl font-normal mb-14">Our Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map(({ src, label, alt }) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden group">
              <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs tracking-widest uppercase font-sans font-semibold">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
