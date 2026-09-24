import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Custom Outlook Email Signatures — New & Classic | MailStora",
    description: "Hand-coded HTML email signatures that render perfectly in Outlook 2016-2021, New Outlook, and Office 365. Free quote.",
    alternates: {
        canonical: "https://mailstora.com/outlook-email-signature"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'HTML Email Signature Design', url: '/html-email-signature-design' },
    { label: 'Outlook Email Signatures', url: '/outlook-email-signature' }
];

const outlookSigFaqs = [
    {
        q: "Why do images in my Outlook signature look huge?",
        a: "Outlook ignores standard CSS max-width declarations and instead relies on physical width/height attributes on the HTML image tag. If you paste a high-resolution logo into Outlook without coding it properly, it will expand to its full size."
    },
    {
        q: "Why are my signature elements stacking vertically instead of side-by-side?",
        a: "Outlook doesn't support modern layout tools like CSS Flexbox or Grid. To create a side-by-side layout (e.g., a headshot on the left, details on the right), we must code a structural HTML table."
    },
    {
        q: "Does this work for both the Desktop app and Outlook on the web?",
        a: "Yes. Our signatures are tested in classic desktop Outlook (2016, 2019, 2021), the 'New Outlook' app for Windows, and Outlook.com / Office 365 web versions."
    }
];

export default async function OutlookEmailSignaturePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/outlook-email-signature/#service",
        "name": "Custom Outlook Email Signatures",
        "serviceType": "Outlook HTML email signature",
        "description": "HTML email signatures specifically coded to bypass Outlook's rendering issues.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Professionals and Corporations" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "30",
            "url": "https://mailstora.com/outlook-email-signature/"
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Custom HTML Email Signatures for Outlook</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Tired of your signature breaking in Outlook? We design and hand-code signatures that render perfectly in classic desktop Outlook, New Outlook, and Office 365.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Get Your Outlook Signature</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Classic Outlook vs New Outlook</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            Microsoft is currently running two entirely different email clients under the name "Outlook." Classic Desktop Outlook (2016-2021) uses Microsoft Word to render HTML, which destroys standard web code. The "New Outlook" (and Office 365) uses a modern web engine. Your signature must be coded to satisfy <em>both</em> engines simultaneously. 
                        </p>
                        
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', marginTop: '3rem' }}>How We Build Outlook-Safe Signatures</h2>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            <li style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem', borderLeft: '4px solid #0078d4' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>Table-Based Layouts</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>We use nested `&lt;table&gt;` elements instead of divs or flexbox to guarantee side-by-side layouts (like logos next to text) don't collapse.</p>
                            </li>
                            <li style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem', borderLeft: '4px solid #0078d4' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>Hardcoded Image Dimensions</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>Outlook ignores CSS `width` and `height`. We apply physical attributes to every image tag so your logo never scales up and takes over the screen.</p>
                            </li>
                            <li style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem', borderLeft: '4px solid #0078d4' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>Safe Fallback Fonts</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>If Outlook doesn't recognize your brand font, it often defaults to Times New Roman. We code strict fallback stacks (Arial, Helvetica, sans-serif) to ensure it stays professional.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            
            <FAQ data={outlookSigFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
