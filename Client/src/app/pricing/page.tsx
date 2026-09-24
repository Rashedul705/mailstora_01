import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PricingComponent from "../components/Pricing";
import Breadcrumb from "../components/Breadcrumb";
import FAQ from "../components/FAQ";

export const metadata: Metadata = {
    title: "Pricing — HTML Email Development & Services | MailStora",
    description: "Transparent pricing for custom HTML email templates, signatures, and Klaviyo flow setups. No hidden fees. Agency white-label retainers available.",
    alternates: {
        canonical: "https://mailstora.com/pricing"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Pricing', url: '/pricing' }
];

const pricingFaqs = [
    {
        q: "Do you offer discounts for multiple templates?",
        a: "Yes. If you order 3 or more templates at once, we offer a 10% volume discount. For agencies needing 10+ templates per month, contact us for white-label retainer rates."
    },
    {
        q: "How does payment work?",
        a: "For standard projects, we require a 50% deposit upfront and the remaining 50% upon final approval and delivery of the files. For retainers, we bill at the beginning of the month."
    },
    {
        q: "Are there any hidden fees?",
        a: "No. The price we quote is the price you pay. It includes the coding, Litmus testing across 30+ clients, and minor revisions to ensure everything renders perfectly."
    },
    {
        q: "What if my design is incredibly complex?",
        a: "Our standard pricing covers 95% of designs. If your email contains highly complex interactive elements (like CSS carousels or accordions) or is exceptionally long, we will provide a custom quote before beginning any work."
    }
];

export default async function PricingPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://mailstora.com/pricing/#webpage",
        "url": "https://mailstora.com/pricing",
        "name": "Pricing - MailStora",
        "description": "Transparent pricing for custom HTML email templates.",
        "isPartOf": { "@id": "https://mailstora.com/#website" }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            
            <section className="sp-hero" style={{ paddingTop: '140px', paddingBottom: '40px', background: '#0f172a', color: '#fff' }}>
                <div className="container">
                    <Breadcrumb items={breadcrumbItems} />
                    <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto', marginTop: '2rem' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Transparent Pricing, No Surprises</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
                            Quality code takes time, but it shouldn't cost a fortune. Find the package that fits your needs.
                        </p>
                    </div>
                </div>
            </section>

            <PricingComponent />
            
            <FAQ data={pricingFaqs} />

            <Footer />
        </>
    );
}
