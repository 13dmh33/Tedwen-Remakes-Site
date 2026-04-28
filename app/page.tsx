import Script from "next/script";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import SocialFollow from "@/components/SocialFollow";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <SocialFollow />
        <Contact />
      </main>
      <Footer />
      <Script src="/tedwen-widget.js" strategy="afterInteractive" />
    </>
  );
}
