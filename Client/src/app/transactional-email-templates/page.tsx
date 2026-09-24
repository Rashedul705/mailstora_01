import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Custom Transactional Email Templates | MailStora",
    description: "Hand-coded transactional email templates for SaaS and ecommerce. Receipts, password resets, and notifications built for Postmark, SendGrid, and more.",
    alternates: {
        canonical: "https://mailstora.com/transactional-email-templates"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'HTML Email Template Development', url: '/html-email-template-development' },
    { label: 'Transactional Email Templates', url: '/transactional-email-templates' }
];

const transactionalFaqs = [
    {
        q: "What types of transactional emails do you design?",
        a: "We design and code order confirmations, shipping notifications, password resets, account verifications, receipts, and dunning (payment failure) emails."
    },
    {
        q: "Do you support Handlebars or Liquid syntax?",
        a: "Yes. If you provide your platform's specific variable syntax (like {{first_name}} or {% if %}), we will code it directly into the HTML."
    },
    {
        q: "Which sending platforms are supported?",
        a: "Our raw HTML works on any platform, including SendGrid, Postmark, Amazon SES, Mailgun, Mandrill, and native Shopify notifications."
    },
    {
        q: "Can you maintain consistency with my marketing emails?",
        a: "Absolutely. We ensure your transactional emails use the exact same brand colors, logos, and fonts as your marketing templates to provide a unified customer experience."
    }
];

export default async function TransactionalEmailTemplatesPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/transactional-email-templates/#service",
        "name": "Custom Transactional Email Templates",
        "serviceType": "Transactional email template development",
        "description": "Custom coded transactional emails for SaaS and ecommerce notifications.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "SaaS and Ecommerce Companies" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "40",
            "url": "https://mailstora.com/transactional-email-templates/"
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Custom Transactional Email Templates</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Beautiful, responsive, and reliable notifications for SaaS and Ecommerce. Keep your brand consistent across receipts, resets, and alerts.
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
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Transactional vs Marketing Emails</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            Marketing emails are built to sell, but transactional emails are built to inform. Because transactional emails have the highest open rates (often 60-80%), they represent a massive opportunity to reinforce your brand. Don't settle for the ugly default text emails your payment processor sends.
                        </p>
                        
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', marginTop: '3rem' }}>The Template Set We Build</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
                                <h3>Ecommerce Flows</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>Order Confirmation</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>Shipping Notification</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>Out for Delivery</li>
                                    <li style={{ padding: '8px 0' }}>Refund / Return Approved</li>
                                </ul>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
                                <h3>SaaS & Accounts</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>Welcome / Email Verification</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>Password Reset</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>Subscription Renewal</li>
                                    <li style={{ padding: '8px 0' }}>Payment Failed (Dunning)</li>
                                </ul>
                            </div>
                        </div>

                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Dynamic Variables & Templating Languages</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            We understand that transactional emails need to inject dynamic data. Whether your backend uses Liquid, Handlebars, Mustache, or plain string interpolation, just provide us with the syntax and we will code it directly into the HTML tables.
                        </p>

                        <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '12px', color: '#fff', marginTop: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Sending Platforms Supported</h3>
                            <p style={{ color: '#94a3b8' }}>Our clean, lightweight HTML is easily imported into:</p>
                            <ul style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', listStyle: 'none', padding: 0, marginTop: '1rem', fontWeight: 'bold' }}>
                                <li>SendGrid</li>
                                <li>Postmark</li>
                                <li>Amazon SES</li>
                                <li>Mailgun</li>
                                <li>Shopify Native</li>
                                <li>Stripe Billing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            
            <FAQ data={transactionalFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
