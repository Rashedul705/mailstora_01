import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Consultation from "./components/Consultation";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Portfolio from "./components/Portfolio";
import Stats from "./components/Stats";
import Process from "./components/Process";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Consultation />
      <Services />
      <Pricing />
      <Portfolio />
      <Stats />
      <Process />
      <CTA />
      <Contact />
      <Terms />
      <Privacy />
      <Footer />
    </main>
  );
}
