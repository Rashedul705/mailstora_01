import { withSeo } from "@/lib/seo";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FounderBar from "./components/FounderBar";
import LogoStrip from "./components/LogoStrip";
import HomeServices from "./components/HomeServices";
import HomeProcess from "./components/HomeProcess";
import PageDecor from "./components/PageDecor";
import Pricing from "./components/Pricing";
import RecentWork from "./components/RecentWork";
import Platforms from "./components/Platforms";
import HomeReviews from "./components/HomeReviews";
import HomeWhyUs from "./components/HomeWhyUs";
import FounderQuote from "./components/FounderQuote";
import PricingOverview from "./components/PricingOverview";
import HomeFAQ from "./components/HomeFAQ";
import MidCTA from "./components/MidCTA";
import HomeContact from "./components/HomeContact";
import HomeAgencies from "./components/HomeAgencies";
import Footer from "./components/Footer";
import { Metadata } from "next";

const baseMetadata: Metadata = {
  title: "HTML Email Development Agency: Custom Templates | MailStora",
  keywords: ["HTML email development agency", "custom HTML email templates", "email template development", "Klaviyo email templates", "HTML email signatures", "Outlook email rendering", "MailStora"],
  description: "MailStora is a founder-led HTML email development agency. Hand-coded, Outlook-tested email templates, Klaviyo flows and email signatures, delivered in 24–48h.",
  alternates: {
    canonical: "https://mailstora.com/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
    return withSeo(baseMetadata);
}

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
      `${API_BASE}/api/portfolio?limit=20`,
      `${API_BASE}/api/testimonials`,
      `${API_BASE}/api/faq`,
      `${API_BASE}/api/trust-logos`,
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
      clientLogos: responses[6] ? await responses[6].json() : [],
    };
  } catch (error) {
    console.error("Failed to fetch landing data", error);
    return { hero: [], services: [], pricing: [], portfolio: [], testimonials: [], faq: [], clientLogos: [] };
  }
}

export default async function Home() {
  const data = await getLandingData();
  const activeHero = data.hero?.find((h: any) => h.is_active) || data.hero?.[0] || null;


  return (
    <>
      <Navbar />
      <main className="main">
        <PageDecor />
        <Hero data={activeHero} />
        <LogoStrip clients={Array.isArray(data.clientLogos) ? data.clientLogos : []} />
        <FounderBar />
        <HomeServices />
        <HomeProcess />
      <Platforms />
      <RecentWork items={Array.isArray(data.portfolio?.items) ? data.portfolio.items : []} />
      <MidCTA />
      <HomeReviews reviews={Array.isArray(data.testimonials?.data) ? data.testimonials.data : []} />
      <HomeWhyUs />
      <HomeAgencies />
      <FounderQuote />
      <PricingOverview data={data.pricing} />

      <HomeFAQ />
        <HomeContact />
      </main>
      <Footer />
    </>
  );
}
