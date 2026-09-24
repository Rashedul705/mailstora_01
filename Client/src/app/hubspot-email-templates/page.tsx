import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "HubSpot Email Template Development | MailStora",
    description: "Hand-coded HubSpot email templates with editable sections, tested in Outlook, Gmail & Apple Mail. Imported and ready to send. Free quote.",
    alternates: {
        canonical: "https://mailstora.com/hubspot-email-templates"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'HTML Email Template Development', url: '/html-email-template-development' },
    { label: 'HubSpot Email Templates', url: '/hubspot-email-templates' }
];

const hubspotFaqs = [
    {
        q: "Can I use the drag-and-drop editor with your custom template?",
        a: "Yes! We build the HTML into HubSpot Custom Modules and wrap areas in drag-and-drop flexible column tags so your team can add native HubSpot blocks."
    },
    {
        q: "Do you build this in the HubSpot Design Manager?",
        a: "Yes, we upload and configure the coded files directly inside the HubSpot Design Manager, ensuring all HubL logic is parsed correctly."
    },
    {
        q: "Can you include HubSpot Personalization Tokens?",
        a: "Absolutely. We can embed first name tokens, company name, or any custom properties you've set up in your CRM."
    },
    {
        q: "Will the email look the same in Outlook?",
        a: "Yes. Our templates use VML and ghost tables before being wrapped in HubL, guaranteeing pixel-perfect rendering across all versions of Outlook."
    }
];

export default async function HubspotEmailTemplatesPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/hubspot-email-templates/#service",
        "name": "HubSpot Email Template Development",
        "serviceType": "HubSpot email template development",
        "isRelatedTo": {
            "@type": "SoftwareApplication",
            "name": "HubSpot"
        },
        "description": "Hand-coded HubSpot email templates using HubL for easy editing and personalization.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "B2B Marketing Teams" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "60",
            "url": "https://mailstora.com/hubspot-email-templates/"
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>HubSpot Email Template Development</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Beautiful, custom-coded HubSpot templates designed to convert. Fully editable using HubL and the native Design Manager.
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
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why Custom-Coded for HubSpot?</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            B2B marketing requires precision. Default templates often fail to match strict corporate brand guidelines. We hand-code robust HTML tables and wrap them in HubSpot's proprietary language (HubL) so your sales and marketing teams can edit content without breaking the layout.
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem', marginTop: '2rem' }}>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ff7a59' }}>
                                <h3>Coded Email Modules</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Reusable, custom-styled sections saved directly in the Design Manager.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ff7a59' }}>
                                <h3>Drag-and-Drop Areas</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Flexible column layouts allowing your team to add new native blocks.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ff7a59' }}>
                                <h3>Personalization Tokens</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Seamlessly pull CRM data into the template design.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ff7a59' }}>
                                <h3>Smart Content Ready</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Layouts built to support HubSpot's dynamic, list-based content variations.</p>
                            </div>
                        </div>

                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Import & Handoff Process</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            We can either provide the raw HTML with HubL tags for your team to implement, or we can handle the full setup within your HubSpot portal's Design Manager to guarantee everything functions as intended.
                        </p>
                    </div>
                </div>
            </section>
            
            <FAQ data={hubspotFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
