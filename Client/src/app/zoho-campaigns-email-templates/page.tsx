import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Custom Zoho Campaigns Email Templates | MailStora",
    description: "Hand-coded Zoho Campaigns email templates with editable sections, tested in Outlook, Gmail & Apple Mail. Imported and ready to send. Free quote.",
    alternates: {
        canonical: "https://mailstora.com/zoho-campaigns-email-templates"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'HTML Email Template Development', url: '/html-email-template-development' },
    { label: 'Zoho Campaigns Email Templates', url: '/zoho-campaigns-email-templates' }
];

const zohoFaqs = [
    {
        q: "Can I edit the custom HTML template in Zoho Campaigns?",
        a: "Yes. By importing the HTML using Zoho's specific attributes, you can edit text and images directly in the campaign editor."
    },
    {
        q: "Do you include Zoho merge tags?",
        a: "Yes, we integrate required tags (like $[LI:UNSUBSCRIBE]$) and any CRM personalization tokens you need."
    },
    {
        q: "How do you upload it to Zoho?",
        a: "We can import it as a saved template in your Zoho Campaigns library so your team can reuse it for future broadcasts."
    },
    {
        q: "Will this fix my Outlook rendering issues?",
        a: "Absolutely. Our underlying HTML is built with Microsoft VML and conditional comments, solving the rendering bugs often found in default drag-and-drop templates."
    }
];

export default async function ZohoEmailTemplatesPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/zoho-campaigns-email-templates/#service",
        "name": "Custom Zoho Campaigns Email Templates",
        "serviceType": "Zoho Campaigns email template development",
        "isRelatedTo": {
            "@type": "SoftwareApplication",
            "name": "Zoho Campaigns"
        },
        "description": "Hand-coded Zoho Campaigns email templates optimized for deliverability and Outlook rendering.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Sales and Marketing Teams" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "50",
            "url": "https://mailstora.com/zoho-campaigns-email-templates/"
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Custom Zoho Campaigns Email Templates</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Professional, custom-coded email templates imported directly into Zoho Campaigns. Edit easily and send with confidence knowing it renders perfectly everywhere.
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
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why Custom-Coded for Zoho Campaigns?</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            While Zoho offers a robust CRM and marketing suite, its default email builder can sometimes generate bloated code that breaks in older email clients like Outlook. By building your template from scratch, we ensure lightweight HTML and flawless cross-client compatibility, while retaining editability.
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem', marginTop: '2rem' }}>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #149C68' }}>
                                <h3>HTML Editor Import</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Files formatted perfectly for Zoho's custom HTML import tool.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #149C68' }}>
                                <h3>Zoho Merge Tags</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Integrated CRM data and required footer compliance tags.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #149C68' }}>
                                <h3>Template Gallery Save</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Saved directly to your library for your team to duplicate and use.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #149C68' }}>
                                <h3>Outlook Optimized</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Ghost tables and VML to bypass the Word rendering engine bugs.</p>
                            </div>
                        </div>

                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Import & Handoff Process</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            We test the template through Litmus across 30+ clients. Once approved, we will upload the template into your Zoho Campaigns account, ensuring all variables and editable sections are recognized by the platform.
                        </p>
                    </div>
                </div>
            </section>
            
            <FAQ data={zohoFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
