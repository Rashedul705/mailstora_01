import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Custom Klaviyo Email Templates — Hand-Coded | MailStora",
    description: "Hand-coded Klaviyo email templates with editable sections, tested in Outlook, Gmail & Apple Mail. Imported and ready to send. Free quote.",
    alternates: {
        canonical: "https://mailstora.com/klaviyo-email-templates"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'HTML Email Template Development', url: '/html-email-template-development' },
    { label: 'Klaviyo Email Templates', url: '/klaviyo-email-templates' }
];

const klaviyoFaqs = [
    {
        q: "Can I edit the template in Klaviyo's drag-and-drop builder?",
        a: "Yes. We code the HTML with Klaviyo-specific attributes so that sections become editable, repeatable blocks in the new Klaviyo editor."
    },
    {
        q: "Do you upload the template into my Klaviyo account?",
        a: "Yes, we handle the import process for you. We'll add the template to your library and ensure all dynamic tags (like first name or unsubscribe links) are working correctly."
    },
    {
        q: "Will the template work in Outlook?",
        a: "Absolutely. Even though it's custom HTML imported into Klaviyo, we use VML and ghost tables to ensure it renders flawlessly across all versions of Outlook."
    },
    {
        q: "Can you include dynamic product feeds from Shopify?",
        a: "Yes, if you're using Klaviyo for flows (like Abandoned Cart), we can code the dynamic product blocks to pull in the exact items the customer left behind."
    },
    {
        q: "Do you also set up the flows?",
        a: "This service is just for design and coding. However, we do offer full Klaviyo Flow Setup services if you need the automation logic built as well."
    }
];

export default async function KlaviyoEmailTemplatesPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/klaviyo-email-templates/#service",
        "name": "Custom Klaviyo Email Templates",
        "serviceType": "Klaviyo email template development",
        "isRelatedTo": {
            "@type": "SoftwareApplication",
            "name": "Klaviyo"
        },
        "description": "Hand-coded Klaviyo email templates with editable regions.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Ecommerce Brands" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "60",
            "url": "https://mailstora.com/klaviyo-email-templates/"
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
                        <div className="section-pill" style={{ display: 'inline-block', marginBottom: '1.5rem', background: 'rgba(255, 107, 0, 0.1)', color: '#ff6b00', padding: '6px 16px', borderRadius: '30px', fontWeight: 'bold' }}>KLAVIYO EXPERTS</div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Custom Klaviyo Email Templates</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Break free from generic templates. Get custom-coded, high-converting Klaviyo templates that your team can easily edit using the drag-and-drop builder.
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
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why Custom-Coded for Klaviyo?</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            While Klaviyo's native drag-and-drop builder is great, it has severe limitations when you want a truly custom brand experience. Complex overlapping elements, specific mobile stacking orders, and custom fonts are difficult or impossible to achieve out-of-the-box. We hand-code the HTML to your exact design specs, then inject Klaviyo's template tags so the final result is fully editable.
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem', marginTop: '2rem' }}>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ff6b00' }}>
                                <h3>Editable Regions</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Swap out images and text without touching code.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ff6b00' }}>
                                <h3>Dynamic Product Feeds</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Seamless integration with Shopify catalog data.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ff6b00' }}>
                                <h3>Universal Content</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Update headers and footers across all templates instantly.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ff6b00' }}>
                                <h3>Drag-and-Drop Compatible</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Add new native Klaviyo blocks alongside custom code.</p>
                            </div>
                        </div>

                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Template Types for Klaviyo</h2>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ff6b00', marginRight: '10px' }}>✓</span> <strong>Automated Flows:</strong> Welcome series, abandoned cart, browse abandonment.</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ff6b00', marginRight: '10px' }}>✓</span> <strong>Campaigns:</strong> Modular newsletters, promotional blasts, and product launches.</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ff6b00', marginRight: '10px' }}>✓</span> <strong>Transactional:</strong> Order confirmations, shipping updates (via Shopify integration).</li>
                        </ul>

                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Import & Handoff Process</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            You don't need to worry about the technical details. We will upload the coded HTML directly into your Klaviyo account, configure the default styling settings, and send you a test email to verify everything works perfectly.
                        </p>
                    </div>
                </div>
            </section>
            
            <FAQ data={klaviyoFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
