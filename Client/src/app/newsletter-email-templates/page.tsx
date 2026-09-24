import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Custom Newsletter Email Templates — Coded & Editable | MailStora",
    description: "Modular, reusable newsletter templates coded in HTML. Perfect for publishers and content teams. Tested in Outlook and Gmail.",
    alternates: {
        canonical: "https://mailstora.com/newsletter-email-templates"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'HTML Email Template Development', url: '/html-email-template-development' },
    { label: 'Newsletter Email Templates', url: '/newsletter-email-templates' }
];

const newsletterFaqs = [
    {
        q: "What is a modular newsletter system?",
        a: "Instead of hardcoding a single layout, we build a 'master template' containing various sections (hero, 2-column article, quote block). Your team can drag, drop, delete, or duplicate these modules for every new issue."
    },
    {
        q: "Do you help with image optimization for deliverability?",
        a: "Yes. Newsletters can get heavy, triggering Gmail's clipping feature or spam filters. We structure the code to be lightweight (under 102KB) and ensure images scale down cleanly without bloating the file."
    },
    {
        q: "Will the text be legible on mobile devices?",
        a: "Absolutely. We use responsive CSS to bump up font sizes on mobile screens (typically to 16px minimum) so your content is readable without pinching and zooming."
    },
    {
        q: "Can I use this template in Mailchimp or Klaviyo?",
        a: "Yes, we inject the specific template language of your ESP (like mc:edit for Mailchimp) so the modules are fully editable in their native builders."
    }
];

export default async function NewsletterEmailTemplatesPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/newsletter-email-templates/#service",
        "name": "Custom Newsletter Email Templates",
        "serviceType": "Newsletter email template development",
        "description": "Modular, reusable HTML newsletter templates for content teams.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Publishers and Content Teams" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "60",
            "url": "https://mailstora.com/newsletter-email-templates/"
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Custom Newsletter Email Templates</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Give your content the beautiful framing it deserves. Get a modular, highly-readable newsletter template coded specifically for your ESP.
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
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why You Need a Modular System</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            If you publish a weekly or daily newsletter, you can't afford to call a developer every time the layout changes. We build "Master Templates"—a single file containing a library of pre-styled content blocks. When you create a new campaign, you simply drag in the blocks you need, delete the ones you don't, and fill in the text.
                        </p>
                        
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', marginTop: '3rem' }}>The Module Library We Build</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderTop: '4px solid #ff6b00' }}>
                                <h3>Headers & Preheaders</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Logo alignment, web view links, and hidden preview text.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderTop: '4px solid #ff6b00' }}>
                                <h3>Featured Articles</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Large hero image, H1 title, excerpt, and "Read More" button.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderTop: '4px solid #ff6b00' }}>
                                <h3>2-Column Grids</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Side-by-side news snippets that stack perfectly on mobile.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderTop: '4px solid #ff6b00' }}>
                                <h3>Quote Blocks</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Stylized text blocks to highlight key takeaways or testimonials.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderTop: '4px solid #ff6b00' }}>
                                <h3>Ad / Sponsor Slots</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Clear, distinct sections for monetizing your newsletter.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderTop: '4px solid #ff6b00' }}>
                                <h3>Social & Footer</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Social icons, required company address, and unsubscribe links.</p>
                            </div>
                        </div>

                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Deliverability & Gmail Clipping</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            If an email's HTML file size exceeds 102KB, Gmail will "clip" it, hiding your content and—critically—cutting off your unsubscribe link and tracking pixel. We ensure our HTML is incredibly lean, avoiding bloated CSS libraries so your newsletter avoids the promotions tab and the clipping block.
                        </p>
                    </div>
                </div>
            </section>
            
            <FAQ data={newsletterFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
