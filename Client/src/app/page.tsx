import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Trust from "./components/Trust";
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

async function getLandingData() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  if (!process.env.NEXT_PUBLIC_API_URL && process.env.NODE_ENV === 'production') {
    console.warn("NEXT_PUBLIC_API_URL is not set. API calls will likely fail in production.");
  }

  try {
    const urls = [
      `${API_BASE}/api/content/hero`,
      `${API_BASE}/api/services`,
      `${API_BASE}/api/pricing`,
      `${API_BASE}/api/portfolio`,
      `${API_BASE}/api/testimonials`,
      `${API_BASE}/api/faq`,
      `${API_BASE}/api/partners`
    ];

    const responses = await Promise.all(
      urls.map(url => fetch(url, { cache: 'no-store' })
        .then(res => res.ok ? res : Promise.reject(res))
        .catch(err => {
          console.error(`Failed to fetch ${url}:`, err.status || err.message || err);
          return null;
        }))
    );

    return {
      hero: responses[0] ? await responses[0].json() : [],
      services: responses[1] ? await responses[1].json() : [],
      pricing: responses[2] ? await responses[2].json() : [],
      portfolio: responses[3] ? await responses[3].json() : [],
      testimonials: responses[4] ? await responses[4].json() : [],
      faq: responses[5] ? await responses[5].json() : [],
      partners: responses[6] ? await responses[6].json() : []
    };
  } catch (error) {
    console.error("Failed to fetch landing data", error);
    return { hero: [], services: [], pricing: [], portfolio: [], testimonials: [], faq: [], partners: [] };
  }
}

export default async function Home() {
  const data = await getLandingData();
  const activeHero = data.hero?.find((h: any) => h.is_active) || data.hero?.[0] || null;

  return (
    <>
      <Navbar />
      <main className="main">
        <Hero data={activeHero} />
      <Problem />
      <Trust data={data.partners} />
      <Services data={data.services} />
      <Portfolio data={data.portfolio} />
      <Testimonials data={data.testimonials} />
      <Stats />
      <Process />
      <Pricing data={data.pricing} />
      <CTA />
      <FAQ data={data.faq} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
