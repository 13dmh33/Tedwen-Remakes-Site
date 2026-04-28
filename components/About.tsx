export default function About() {
  return (
    <section id="about" className="bg-warm-dark py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-warm-gray mb-4">Who We Are</p>
        <h2 className="font-display text-3xl md:text-4xl font-normal mb-10 max-w-xl leading-snug">Built on Reliability.<br />Finished with Pride.</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-warm-gray leading-relaxed mb-6">Tedwen Remakes LLC is a handyman services company based in Canonsburg, PA, dedicated to delivering quality craftsmanship on every project — no matter the size. From a fresh coat of paint to a complete drywall repair, we treat every home as if it were our own.</p>
            <p className="text-warm-gray leading-relaxed">We believe good work speaks for itself. Our approach is straightforward: show up on time, communicate clearly, and leave the job cleaner than we found it. That commitment to professionalism is what keeps our customers coming back.</p>
          </div>
          <div className="flex flex-col gap-6">
            {[
              { label: "Canonsburg, PA", sub: "Serving the greater Pittsburgh area" },
              { label: "No Job Too Small", sub: "Single repairs to full room refreshes" },
              { label: "Free Estimates", sub: "Know the cost before work begins" },
            ].map(({ label, sub }) => (
              <div key={label} className="border-l-2 border-border-gray pl-5">
                <p className="text-white font-sans font-semibold text-sm mb-1">{label}</p>
                <p className="text-warm-gray text-sm">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
