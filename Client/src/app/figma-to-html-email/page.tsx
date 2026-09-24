import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: "Figma to HTML Email Conversion — Hand-Coded | MailStora",
    description: "Send your Figma email design and get pixel-perfect, responsive HTML tested in Outlook, Gmail & Apple Mail. ESP-ready in 24–48h.",
    alternates: {
        canonical: "https://mailstora.com/figma-to-html-email"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'HTML Email Template Development', url: '/html-email-template-development' },
    { label: 'Figma to HTML Email', url: '/figma-to-html-email' }
];

const figmaFaqs = [
    {
        q: "How should I share my Figma file with you?",
        a: "Simply generate a 'View' link in Figma and paste it into our quote form. Please ensure the link is set to 'Anyone with the link can view' so we can inspect the CSS properties and export assets."
    },
    {
        q: "Will my email look exactly like the Figma design?",
        a: "Yes! We strive for pixel-perfect conversions. However, due to email client limitations (like Outlook), some elements like complex shadows or overlapping elements might be adapted slightly for universal compatibility. We will always communicate this beforehand."
    },
    {
        q: "Do you support Figma Auto Layout?",
        a: "Yes, we are highly experienced with Figma and Auto Layout. It actually helps us understand your intended padding and responsiveness better when coding the HTML tables."
    },
    {
        q: "Can you make the Figma design editable in Klaviyo or Mailchimp?",
        a: "Absolutely. We can convert your static Figma design into a fully modular template where you can drag, drop, and edit text/images directly within your ESP's builder."
    },
    {
        q: "What about custom fonts used in Figma?",
        a: "We will use your custom web fonts for clients that support them (like Apple Mail and iOS Mail). For clients that don't (like Outlook and Gmail), we setup proper web-safe fallback fonts (Arial, Helvetica, etc.) defined in your brand guidelines."
    },
    {
        q: "How fast can you convert my design?",
        a: "Our standard turnaround is 24-48 hours per template. If you have an urgent campaign, we also offer rush delivery options."
    }
];

export default async function FigmaToHtmlEmailPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/figma-to-html-email/#service",
        "name": "Figma to HTML Email Conversion",
        "serviceType": "Figma to HTML email conversion",
        "description": "Convert your Figma email design into responsive, hand-coded HTML tested in 30+ email clients.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Designers and Marketing Teams" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "50",
            "url": "https://mailstora.com/figma-to-html-email/"
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Figma to HTML Email Conversion</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Send us your Figma link. Get back pixel-perfect, responsive HTML that renders flawlessly in Outlook, Gmail, and Apple Mail. ESP-ready in 24–48 hours.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Upload your Figma link</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>How to Share Your Figma File</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            Sharing your design is simple. Just click "Share" in Figma, ensure the setting is <strong>"Anyone with the link can view"</strong>, and paste the URL into our quote form. If you use Auto Layout, leave it on—it helps us understand your intended spacing!
                        </p>

                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', marginTop: '3rem' }}>What We Preserve</h2>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ff6b00', marginRight: '10px' }}>✓</span> <strong>Typography & Spacing:</strong> We extract exact margins, paddings, and font properties from your Figma inspector.</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ff6b00', marginRight: '10px' }}>✓</span> <strong>Retina Assets:</strong> We export all images at 2x resolution to ensure they look crisp on high-DPI displays like iPhones and MacBooks.</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ff6b00', marginRight: '10px' }}>✓</span> <strong>Brand Colors:</strong> Exact hex codes are mapped to inline CSS, with specific dark mode overrides if you provide a dark mode frame.</li>
                        </ul>

                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', marginTop: '3rem' }}>What Changes in Email (And Why)</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            Unlike web development, HTML emails have strict rendering limitations imposed by email clients like Windows Outlook. 
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ff6b00', marginRight: '10px' }}>⚠️</span> <strong>Web Fonts:</strong> Only supported by ~50% of clients. We implement your custom font with bulletproof fallbacks (e.g., Arial, sans-serif) for Outlook and Gmail.</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ff6b00', marginRight: '10px' }}>⚠️</span> <strong>Background Images:</strong> We use VML (Vector Markup Language) to force background images to work in Outlook, but complex overlapping elements might be flattened.</li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#ff6b00', marginRight: '10px' }}>⚠️</span> <strong>Max Width:</strong> We restrict the email body to 600px - 640px to ensure it fits perfectly in preview panes across all clients.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem' }}>ESPs Supported</h2>
                        <p style={{ color: '#64748b' }}>We can integrate your Figma design into any major platform.</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <Link href="/klaviyo-email-templates" className="btn btn-outline">Klaviyo</Link>
                        <Link href="/mailchimp-email-templates" className="btn btn-outline">Mailchimp</Link>
                        <Link href="/hubspot-email-templates" className="btn btn-outline">HubSpot</Link>
                        <Link href="/zoho-campaigns-email-templates" className="btn btn-outline">Zoho Campaigns</Link>
                    </div>
                </div>
            </section>
            
            <FAQ data={figmaFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
