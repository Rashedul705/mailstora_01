import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Trust from "./components/Trust";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Portfolio from "./components/Portfolio";
import Platforms from "./components/Platforms";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Email Template Developer — Custom Coded, Outlook-Tested | MailStora",
  description: "Freelance HTML email developer providing custom, hand-coded, and Outlook-tested responsive email templates. 24-48h delivery.",
  alternates: {
    canonical: "https://mailstora.com"
  }
};

async function getLandingData() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

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
    };
  } catch (error) {
    console.error("Failed to fetch landing data", error);
    return { hero: [], services: [], pricing: [], portfolio: [], testimonials: [], faq: [] };
  }
}

export default async function Home() {
  const data = await getLandingData();
  const activeHero = data.hero?.find((h: any) => h.is_active) || data.hero?.[0] || null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: 'MailStora',
    url: 'https://mailstora.com',
    logo: 'https://mailstora.com/logo.png',
    sameAs: [
      'https://www.upwork.com/freelancers/~01b606ebbf402120db',
      'https://www.linkedin.com/in/rashedulafl/'
    ],
    founder: {
      '@type': 'Person',
      name: 'Rashedul Islam',
      jobTitle: 'Founder & Lead Developer',
      knowsAbout: ['HTML Email', 'Klaviyo', 'Outlook Rendering']
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="main">
        <Hero data={activeHero} />
      <Problem />
      <div style={{ width: '100%', height: '1px', background: '#e2e4f0', margin: '0 auto' }} />
      <Trust />
      <Services data={data.services} />
      <Platforms />
      <Portfolio data={data.portfolio} />
      <Testimonials data={data.testimonials} />
      <WhyChooseUs />

      <FAQ data={data.faq} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
