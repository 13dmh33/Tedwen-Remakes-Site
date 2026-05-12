import ChatWidget from "./ChatWidget";

export default function Contact() {
  return (
    <section id="contact" className="bg-charcoal py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-warm-gray mb-4">Reach Out</p>
        <h2 className="font-display text-3xl md:text-4xl font-normal mb-4">
          Get a Free Estimate
        </h2>
        <p className="text-warm-gray mb-12 text-sm leading-relaxed max-w-lg">
          Tell us about your project and we&apos;ll get back to you promptly. No pressure, no
          obligation.
        </p>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Sidebar */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-warm-gray mb-2">Email</p>
              <a
                href="mailto:13dmh33@gmail.com"
                className="text-white text-sm hover:text-warm-gray transition-colors"
              >
                13dmh33@gmail.com
              </a>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-warm-gray mb-2">Phone</p>
              <a
                href="tel:+15555555555"
                className="text-white text-sm hover:text-warm-gray transition-colors"
              >
                (555) 555-5555
              </a>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-warm-gray mb-2">Location</p>
              <p className="text-white text-sm">Canonsburg, PA</p>
              <p className="text-warm-gray text-sm">Serving the greater Pittsburgh area</p>
            </div>
          </div>

          {/* Chat */}
          <div className="md:col-span-3">
            <ChatWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
