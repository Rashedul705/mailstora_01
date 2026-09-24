import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Custom Mailchimp Email Templates — Coded & Editable | MailStora",
    description: "Hand-coded Mailchimp email templates with editable sections, tested in Outlook, Gmail & Apple Mail. Imported and ready to send. Free quote.",
    alternates: {
        canonical: "https://mailstora.com/mailchimp-email-templates"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'HTML Email Template Development', url: '/html-email-template-development' },
    { label: 'Mailchimp Email Templates', url: '/mailchimp-email-templates' }
];

const mailchimpFaqs = [
    {
        q: "Can I edit the template in the Mailchimp builder?",
        a: "Yes. We use Mailchimp's specific template language (mc:edit) so you can easily edit text and images directly in the campaign builder."
    },
    {
        q: "Do you upload the template to my Mailchimp account?",
        a: "Yes, we handle the import process and ensure all merge tags (like the required unsubscribe footer) are correctly configured."
    },
    {
        q: "Will it work with the New Mailchimp Builder?",
        a: "Custom HTML templates are currently best supported in Mailchimp's Classic Builder, which still allows for full code control while providing visual editing."
    },
    {
        q: "Can you create repeatable blocks?",
        a: "Yes, we use mc:repeatable tags so you can duplicate sections (like product rows or news articles) as many times as you need for a specific campaign."
    }
];

export default async function MailchimpEmailTemplatesPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/mailchimp-email-templates/#service",
        "name": "Custom Mailchimp Email Templates",
        "serviceType": "Mailchimp email template development",
        "isRelatedTo": {
            "@type": "SoftwareApplication",
            "name": "Mailchimp"
        },
        "description": "Hand-coded Mailchimp email templates using mc:edit attributes for easy editing.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Marketing Teams" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "50",
            "url": "https://mailstora.com/mailchimp-email-templates/"
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Custom Mailchimp Email Templates</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Hand-coded HTML templates built specifically for Mailchimp. Enjoy pixel-perfect design while retaining full editability for your marketing team.
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
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why Custom-Coded for Mailchimp?</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            Mailchimp's native templates are restrictive. If you want a design that perfectly matches your brand guidelines—including specific typography, complex grid layouts, and custom mobile stacking—you need custom HTML. We code the template from scratch and inject Mailchimp's proprietary tags.
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem', marginTop: '2rem' }}>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #FFE01B' }}>
                                <h3>mc:edit Regions</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Easily update text and images in the campaign builder.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #FFE01B' }}>
                                <h3>mc:repeatable Blocks</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Duplicate rows or sections dynamically for newsletters.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #FFE01B' }}>
                                <h3>Merge Tags Integration</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Personalization (first names) and required unsubscribe links included.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #FFE01B' }}>
                                <h3>Content Studio Support</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Swap out placeholder images directly from your Mailchimp library.</p>
                            </div>
                        </div>

                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Import & Handoff Process</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            We test the raw HTML in Litmus, then import the file directly into your Mailchimp Templates dashboard. We'll run a final test campaign to ensure the editable regions function properly in the Classic Builder.
                        </p>
                    </div>
                </div>
            </section>
            
            <FAQ data={mailchimpFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
