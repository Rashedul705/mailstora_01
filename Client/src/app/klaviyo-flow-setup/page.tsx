import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Klaviyo Flow Setup — Welcome, Cart & Browse Flows | MailStora",
    description: "Klaviyo flows built and designed for you: welcome series, abandoned cart, browse abandonment, post-purchase and win-back. Custom-coded emails included.",
    alternates: {
        canonical: "https://mailstora.com/klaviyo-flow-setup"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Klaviyo Flow Setup', url: '/klaviyo-flow-setup' }
];

const klaviyoFlowFaqs = [
    {
        q: "What is the difference between this and Klaviyo Email Templates?",
        a: "Our Templates service is just for design and coding. This Flow Setup service is comprehensive: we build the automation logic, configure the triggers and splits in Klaviyo, AND design/code the emails."
    },
    {
        q: "Do you integrate this with Shopify?",
        a: "Yes. Klaviyo's power comes from its deep integration with Shopify. We utilize Shopify events (like 'Added to Cart' or 'Placed Order') to trigger specific emails with dynamic product blocks."
    },
    {
        q: "Do you provide the copywriting?",
        a: "We can provide structural copy and subject lines based on ecommerce best practices. However, for highly specialized brand voices, we recommend you provide the raw copy and we will adapt it to the email design."
    },
    {
        q: "How long does a full setup take?",
        a: "A standard setup covering the core flows (Welcome, Cart, Checkout, Post-Purchase) typically takes 5 to 7 days from strategy approval to going live."
    }
];

export default async function KlaviyoFlowSetupPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/klaviyo-flow-setup/#service",
        "name": "Klaviyo Flow Setup",
        "serviceType": "Klaviyo email automation setup",
        "description": "Comprehensive Klaviyo automation setup including strategy, triggers, design, and coding.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Shopify Ecommerce Brands" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "300",
            "url": "https://mailstora.com/klaviyo-flow-setup/"
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
                        <div className="section-pill" style={{ display: 'inline-block', marginBottom: '1.5rem', background: 'rgba(255, 107, 0, 0.1)', color: '#ff6b00', padding: '6px 16px', borderRadius: '30px', fontWeight: 'bold' }}>SHOPIFY INTEGRATION</div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Klaviyo Flow Setup for Shopify Brands</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Turn your store's traffic into recurring revenue. We strategize, design, code, and configure your core Klaviyo automation flows from scratch.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Get a Free Quote</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why Automations Matter More Than Campaigns</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            While sending newsletter blasts is important, the highest ROI in email marketing comes from behavior-triggered automations (flows). A well-optimized Welcome Series and Abandoned Cart flow can passively generate 15-30% of your store's total revenue while you sleep.
                        </p>
                        
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', marginTop: '3rem' }}>Core Flows We Build</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderLeft: '4px solid #ff6b00', borderRadius: '8px' }}>
                                <h3>Welcome Series</h3>
                                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Convert new subscribers into first-time buyers with targeted incentives and brand storytelling.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderLeft: '4px solid #ff6b00', borderRadius: '8px' }}>
                                <h3>Abandoned Checkout</h3>
                                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Recover lost revenue by reminding customers what they left behind with dynamic product feeds.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderLeft: '4px solid #ff6b00', borderRadius: '8px' }}>
                                <h3>Abandoned Cart</h3>
                                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Triggered specifically on "Added to Cart" (before checkout), capturing higher funnel intent.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderLeft: '4px solid #ff6b00', borderRadius: '8px' }}>
                                <h3>Browse Abandonment</h3>
                                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Engage window shoppers who viewed a product but didn't add it to their cart.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderLeft: '4px solid #ff6b00', borderRadius: '8px' }}>
                                <h3>Post-Purchase</h3>
                                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Upsell, cross-sell, and request reviews from customers exactly when they are most excited.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderLeft: '4px solid #ff6b00', borderRadius: '8px' }}>
                                <h3>Win-Back & Sunset</h3>
                                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Re-engage lapsed customers, and clean your list by filtering out those who never open.</p>
                            </div>
                        </div>

                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Segmentation & Triggers</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            We don't just set up linear emails. We configure conditional splits within your flows. For example, a customer who has purchased before receives a different Abandoned Cart discount than a first-time buyer. We use Shopify's custom events and Klaviyo's profile properties to make the messaging hyper-relevant.
                        </p>

                        <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '12px', color: '#fff', textAlign: 'center', marginTop: '3rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Design + Code Included</h2>
                            <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                                Unlike agencies that just handle the strategy, we actually design the UI in Figma and code the custom HTML templates for every email in your flow.
                            </p>
                            <Link href="/klaviyo-email-templates" className="btn btn-outline-light" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>See Our Klaviyo Design Work</Link>
                        </div>
                    </div>
                </div>
            </section>
            
            <FAQ data={klaviyoFlowFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
