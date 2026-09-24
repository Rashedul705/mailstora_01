import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "PSD to HTML Email Template Conversion | MailStora",
    description: "Convert PSD, Sketch, XD or AI email designs into responsive, hand-coded HTML. Tested in 30+ email clients. Fast turnaround, free quote.",
    alternates: {
        canonical: "https://mailstora.com/psd-to-html-email"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'HTML Email Template Development', url: '/html-email-template-development' },
    { label: 'PSD to HTML Email', url: '/psd-to-html-email' }
];

const psdFaqs = [
    {
        q: "What design file formats do you accept?",
        a: "We accept Adobe Photoshop (PSD), Adobe XD, Adobe Illustrator (AI), Sketch, Canva links, and even high-resolution PDF or JPEG files if source files aren't available."
    },
    {
        q: "How should I prepare my PSD file?",
        a: "Ideally, keep your layers organized, group sections logically, and ensure all custom fonts are rasterized or provided as TTF/OTF files. Please also include a list of destination URLs for links."
    },
    {
        q: "Will the HTML email be responsive on mobile?",
        a: "Yes, every template we code is mobile-first and fully responsive. We test across iOS Mail, Gmail app, and Samsung Email to ensure perfect stacking and readability on small screens."
    },
    {
        q: "Do you use automated conversion tools like slices?",
        a: "No. We hand-code everything from scratch using nested tables and inline CSS. Automated slicing tools create image-heavy, non-responsive emails that trigger spam filters and break in Outlook."
    },
    {
        q: "Can I edit the text after you code it?",
        a: "Yes! We can set up the HTML to be fully editable in platforms like Mailchimp (using mc:edit), Klaviyo, or HubSpot, so your marketing team can swap text and images without touching the code."
    }
];

export default async function PsdToHtmlEmailPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/psd-to-html-email/#service",
        "name": "PSD to HTML Email Template Conversion",
        "serviceType": "PSD to HTML email conversion",
        "description": "Convert your Photoshop PSD or Sketch design into responsive, hand-coded HTML.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Agencies and Legacy Design Teams" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "50",
            "url": "https://mailstora.com/psd-to-html-email/"
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>PSD to HTML Email Template Conversion</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Convert PSD, Sketch, XD, or Illustrator designs into rock-solid, hand-coded HTML emails. Tested in 30+ email clients and ready for your ESP.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Get a Free Quote</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Formats We Accept</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            While PSD is our namesake, we are equipped to handle any design format your team prefers:
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
                                <h3>Adobe Photoshop (PSD)</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Layered files for exact asset extraction.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
                                <h3>Sketch & Adobe XD</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Modern vector-based design files.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
                                <h3>Adobe Illustrator (AI)</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Vector layouts exported for email.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
                                <h3>Canva & PDF</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>We can recreate flat designs into code.</p>
                            </div>
                        </div>

                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our Conversion Process</h2>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            <li style={{ marginBottom: '1.5rem' }}>
                                <strong>1. Asset Extraction:</strong> We slice images, icons, and logos manually to optimize file size without losing quality.
                            </li>
                            <li style={{ marginBottom: '1.5rem' }}>
                                <strong>2. Table-Based Coding:</strong> We construct the layout using nested HTML tables (the only way to ensure Outlook compatibility).
                            </li>
                            <li style={{ marginBottom: '1.5rem' }}>
                                <strong>3. Inline CSS:</strong> All styles are inlined manually or via a preprocessor to prevent webmail clients from stripping them.
                            </li>
                            <li style={{ marginBottom: '1.5rem' }}>
                                <strong>4. ESP Integration:</strong> We add Mailchimp `mc:edit` tags, Klaviyo logic, or HubSpot modules so you can edit the content.
                            </li>
                            <li style={{ marginBottom: '1.5rem' }}>
                                <strong>5. QA Testing:</strong> We run the HTML through Litmus or Email on Acid and manually check devices.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            
            <FAQ data={psdFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
