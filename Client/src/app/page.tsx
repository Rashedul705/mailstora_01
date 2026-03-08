import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import Process from "./components/Process";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Services />
      <Pricing />
      <Portfolio />
      <Testimonials />
      <Stats />
      <Process />
      <CTA />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
