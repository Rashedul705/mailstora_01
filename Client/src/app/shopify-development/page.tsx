import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Shopify Store Development & Customization | MailStora",
    description: "Custom Shopify store development, theme customization, and optimization. Seamless integration with Klaviyo for maximum ecommerce growth.",
    alternates: {
        canonical: "https://mailstora.com/shopify-development"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Shopify Store Development', url: '/shopify-development' }
];

const shopifyFaqs = [
    {
        q: "Do you build Shopify stores from scratch?",
        a: "Yes. We can take your brand from concept to a fully functional Shopify store, including theme selection, custom liquid coding, and app integration."
    },
    {
        q: "Can you customize my existing theme?",
        a: "Absolutely. If you love your current theme but need custom sections, a new mega-menu, or specific product page layouts, we can write the custom Liquid and CSS."
    },
    {
        q: "Do you optimize for page speed?",
        a: "Yes. Fast loading times are critical for conversion. We audit apps, compress assets, and defer off-screen Javascript to improve your core web vitals."
    },
    {
        q: "How does this tie into your email services?",
        a: "We ensure your Shopify store is perfectly integrated with Klaviyo. We set up onsite tracking, custom 'Added to Cart' snippets, and ensure your newsletter pop-ups fire at the exact right moment."
    }
];

export default async function ShopifyDevelopmentPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/shopify-development/#service",
        "name": "Shopify Store Development",
        "serviceType": "Shopify website development",
        "description": "Custom Shopify development, theme customization, and ecommerce optimization.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Ecommerce Brands" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "500",
            "url": "https://mailstora.com/shopify-development/"
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Shopify Store Development & Customization</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Fast, conversion-optimized Shopify stores tailored to your brand. From minor theme tweaks to complete ground-up builds.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Start Your Shopify Project</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Beyond the Basic Theme</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            Premium Shopify themes are great starting points, but they rarely fit your exact vision out of the box. We specialize in Liquid coding, allowing us to build custom sections, unique product page layouts, and tailored checkout experiences that set your brand apart.
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem', marginTop: '3rem' }}>
                            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #95bf47' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>Custom Theme Development</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>Building completely unique storefronts from scratch or heavily modifying premium themes to match your Figma designs.</p>
                            </div>
                            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #95bf47' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>Speed Optimization</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>Auditing bloated code, compressing images, and lazy-loading assets to ensure lightning-fast load times on mobile devices.</p>
                            </div>
                            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #95bf47' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>App Integration & Audits</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>Installing and configuring essential apps (reviews, subscriptions, upsells) and removing leftover code from deleted apps.</p>
                            </div>
                            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #95bf47' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>Klaviyo Deep Integration</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>We ensure your Shopify store talks perfectly to your email marketing, capturing the right events for triggered flows.</p>
                            </div>
                        </div>

                        <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '12px', textAlign: 'center', marginTop: '3rem', color: '#fff' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Need ongoing development support?</h2>
                            <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                                We offer monthly retainers for growing brands that need continuous optimization, A/B testing, and new feature rollouts.
                            </p>
                            <Link href="/schedule" className="btn btn-outline-light" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>Discuss Retainer Options</Link>
                        </div>
                    </div>
                </div>
            </section>
            
            <FAQ data={shopifyFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
