import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Responsive Email Template Design Service | MailStora",
    description: "From strategy and wireframes to Figma design and HTML code. Get a complete, responsive email template design package ready for your ESP.",
    alternates: {
        canonical: "https://mailstora.com/responsive-email-template-design"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'HTML Email Template Development', url: '/html-email-template-development' },
    { label: 'Responsive Email Template Design', url: '/responsive-email-template-design' }
];

const designFaqs = [
    {
        q: "What if I don't have a design at all?",
        a: "That's exactly what this service is for! You just provide your brand guidelines (logo, colors, website link), and we will handle the wireframing, UI design, and HTML coding."
    },
    {
        q: "Do I get to review the design before you code it?",
        a: "Yes. We will send you a Figma mockup of the email. You can request revisions until you are 100% happy with the visual design. Only after your approval do we begin coding the HTML."
    },
    {
        q: "Will the design support dark mode?",
        a: "Yes, every design we create is conceptualized with both Light and Dark modes in mind, ensuring your logos and text are clearly visible no matter the user's OS settings."
    },
    {
        q: "What is included in the final delivery?",
        a: "You will receive the original Figma design file, the raw HTML code, all optimized image assets, and we will even import it directly into your ESP (Klaviyo, Mailchimp, etc.)."
    }
];

export default async function ResponsiveEmailDesignPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/responsive-email-template-design/#service",
        "name": "Responsive Email Template Design",
        "serviceType": "Email template design and development",
        "description": "End-to-end email template creation including Figma design and HTML coding.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Startups and Agencies" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "120",
            "url": "https://mailstora.com/responsive-email-template-design/"
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Responsive Email Template Design, From Brief to Inbox</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            No design? No problem. We provide an end-to-end service combining stunning UI design in Figma with bulletproof HTML coding for your ESP.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Get a Design & Code Quote</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Design + Code in One Package</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            Many web designers create beautiful email layouts in Figma that are literally impossible to code for older email clients like Outlook. By hiring an agency that does both the design <em>and</em> the development, you guarantee that the vision approved in the mockup is exactly what hits the inbox.
                        </p>
                        
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', marginTop: '3rem' }}>Our End-to-End Process</h2>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            <li style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem' }}>
                                <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}><span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', background: '#ff6b00', color: '#fff', borderRadius: '50%', marginRight: '15px', fontSize: '1rem' }}>1</span> The Brief & Brand Assets</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>You provide us with your logo, brand colors, fonts, and an idea of what the email should achieve (e.g., selling a product, sharing news).</p>
                            </li>
                            <li style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem' }}>
                                <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}><span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', background: '#ff6b00', color: '#fff', borderRadius: '50%', marginRight: '15px', fontSize: '1rem' }}>2</span> Figma UI Mockup</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>Our UI designers create a pixel-perfect mockup of the email. We send this to you for review, and we offer unlimited revisions at this stage.</p>
                            </li>
                            <li style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem' }}>
                                <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}><span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', background: '#ff6b00', color: '#fff', borderRadius: '50%', marginRight: '15px', fontSize: '1rem' }}>3</span> HTML Coding & Testing</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>Once approved, our developers translate the design into responsive HTML, testing it across 30+ email clients in Litmus.</p>
                            </li>
                            <li style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem' }}>
                                <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}><span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', background: '#ff6b00', color: '#fff', borderRadius: '50%', marginRight: '15px', fontSize: '1rem' }}>4</span> ESP Delivery</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>We import the final, editable template directly into your Mailchimp, Klaviyo, or HubSpot account.</p>
                            </li>
                        </ul>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '3rem' }}>
                            <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                                <h3>Mobile-First Design</h3>
                                <p style={{ color: '#64748b' }}>Over 60% of emails are opened on mobile devices. We design for the small screen first, ensuring large tap targets and legible typography.</p>
                            </div>
                            <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                                <h3>Dark Mode Optimized</h3>
                                <p style={{ color: '#64748b' }}>We outline logos with subtle strokes and use transparent PNGs to ensure your email doesn't look broken when inverted by iOS or Android dark modes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <FAQ data={designFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
