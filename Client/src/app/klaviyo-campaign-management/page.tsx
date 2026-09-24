import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Klaviyo Campaign Management Service | MailStora",
    description: "Done-for-you Klaviyo and ESP campaigns: design, coding, segmentation, subject lines, QA and scheduling. Monthly packages available.",
    alternates: {
        canonical: "https://mailstora.com/klaviyo-campaign-management"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Klaviyo & Email Campaign Management', url: '/klaviyo-campaign-management' }
];

const campaignFaqs = [
    {
        q: "What platforms do you manage?",
        a: "We specialize in Klaviyo for ecommerce, but we also manage ongoing campaigns in Mailchimp, HubSpot, ActiveCampaign, and Campaign Monitor."
    },
    {
        q: "Do you offer month-to-month retainers?",
        a: "Yes. Our campaign management service is typically structured as a monthly retainer (e.g., 4 or 8 campaigns per month), though we do accept one-off seasonal projects like BFCM."
    },
    {
        q: "Who provides the graphics and copy?",
        a: "We can handle the UI design, layout, and HTML coding. For specific product photography or highly technical copywriting, we rely on assets provided by your team."
    },
    {
        q: "How do you ensure emails don't go to spam?",
        a: "We manage list segmentation aggressively, sending only to engaged cohorts (e.g., 30-day or 90-day openers) to protect your sender reputation."
    }
];

export default async function CampaignManagementPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/klaviyo-campaign-management/#service",
        "name": "Klaviyo & Email Campaign Management",
        "serviceType": "Email campaign management",
        "description": "Done-for-you email campaign production, segmentation, and scheduling in Klaviyo and other ESPs.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Ecommerce Brands" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "400",
            "url": "https://mailstora.com/klaviyo-campaign-management/"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            
            <section className="sp-hero" style={{ paddingTop: '140px', paddingBottom: '80px', background: '#0f172a', color: '#fff' }}>
                <div className="container">
                    <Breadcrumb items={breadcrumbItems} />
                    <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto', marginTop: '2rem' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Klaviyo & Email Campaign Management</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Stop stressing over your sending schedule. We handle the design, coding, segmentation, QA, and scheduling of your weekly email broadcasts.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>View Monthly Packages</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Done-For-You Campaign Production</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            Running an ecommerce store is hard enough without having to worry about building the weekly newsletter. We operate as your fractional email marketing team, taking your raw product updates and turning them into beautiful, high-converting emails.
                        </p>
                        
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', marginTop: '3rem' }}>What's Included in Every Send</h2>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            <li style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '1rem' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>🎨 Design & Custom Coding</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>We don't use generic drag-and-drop layouts. We design custom modules in Figma and hand-code them in HTML so your campaigns stand out.</p>
                            </li>
                            <li style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '1rem' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>🎯 Audience Segmentation</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>We define the exact lists to send to—targeting engaged openers to protect deliverability, or suppressing recent purchasers.</p>
                            </li>
                            <li style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '1rem' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>📝 Subject Lines & Preview Text</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>We write A/B tested subject lines and compelling preview text to maximize your open rates.</p>
                            </li>
                            <li style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '1rem' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>✅ Pre-Flight QA</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>Every link is clicked, every dark-mode inversion is checked, and we run Litmus tests before hitting schedule.</p>
                            </li>
                        </ul>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '3rem' }}>
                            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px' }}>
                                <h3 style={{ color: '#0f172a' }}>Monthly Retainers</h3>
                                <p style={{ color: '#475569', marginTop: '10px' }}>Perfect for brands needing 4 to 8 consistent campaigns per month. We integrate into your Slack and project management tools.</p>
                            </div>
                            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px' }}>
                                <h3 style={{ color: '#0f172a' }}>Seasonal / One-Off (BFCM)</h3>
                                <p style={{ color: '#475569', marginTop: '10px' }}>Need a 10-email sequence for Black Friday? We offer fixed-price projects for major product launches and holiday seasons.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <FAQ data={campaignFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
