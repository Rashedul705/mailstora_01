import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "White-Label HTML Email Development for Agencies | MailStora",
    description: "Your behind-the-scenes email developer. Hand-coded templates delivered under your brand, NDA-friendly, 24–48h turnaround, volume pricing.",
    alternates: {
        canonical: "https://mailstora.com/white-label-email-development"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'White-Label Email Development', url: '/white-label-email-development' }
];

const whiteLabelFaqs = [
    {
        q: "Will my clients know I am outsourcing to MailStora?",
        a: "Absolutely not. We operate entirely under your brand. We are happy to sign NDAs and never showcase white-label work in our public portfolio without your permission."
    },
    {
        q: "How do we communicate during projects?",
        a: "We can communicate via your preferred method. We often join agency Slack workspaces or Asana/Trello boards using an agency email address to seamlessly blend in with your team."
    },
    {
        q: "Do you offer volume discounts for agencies?",
        a: "Yes. If your agency requires a steady volume of templates (e.g., 5-10+ per month), we offer tiered retainer pricing that significantly increases your margins."
    },
    {
        q: "What do you need from us to get started?",
        a: "Just send us the client's design file (Figma, PSD, XD) and any specific integration requirements (e.g., 'must be editable in HubSpot'). We handle the rest."
    }
];

export default async function WhiteLabelDevelopmentPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/white-label-email-development/#service",
        "name": "White-Label HTML Email Development for Agencies",
        "serviceType": "White label email development",
        "description": "Outsourced, NDA-friendly HTML email template development for marketing agencies.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Marketing Agencies" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "50",
            "url": "https://mailstora.com/white-label-email-development/"
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
                        <div className="section-pill" style={{ display: 'inline-block', marginBottom: '1.5rem', background: 'rgba(255, 255, 255, 0.1)', color: '#fff', padding: '6px 16px', borderRadius: '30px', fontWeight: 'bold' }}>FOR AGENCIES</div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>White-Label HTML Email Development</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Your reliable, behind-the-scenes email developer. We turn your agency's designs into bulletproof HTML templates under strict NDA, allowing you to scale without overhead.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Inquire About White-Label</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Scale Your Agency's Offerings</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            Coding emails for Outlook and various ESPs is tedious and requires highly specialized knowledge that most general web developers hate doing. By partnering with MailStora, your agency can say "Yes" to complex email marketing retainers while we handle the heavy lifting in the background.
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem', marginTop: '3rem' }}>
                            <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center' }}><i className="fas fa-user-secret" style={{ color: '#0f172a', marginRight: '10px' }}></i> 100% Invisible & NDA Ready</h3>
                                <p style={{ color: '#64748b', marginTop: '10px' }}>No MailStora branding anywhere in the code. We sign your NDAs and never contact your clients directly.</p>
                            </div>
                            <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center' }}><i className="fas fa-bolt" style={{ color: '#0f172a', marginRight: '10px' }}></i> Fast Turnaround Capacity</h3>
                                <p style={{ color: '#64748b', marginTop: '10px' }}>With standard 24-48 hour delivery and rush options available, you'll never miss a client deadline.</p>
                            </div>
                            <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center' }}><i className="fas fa-tags" style={{ color: '#0f172a', marginRight: '10px' }}></i> Profitable Agency Pricing</h3>
                                <p style={{ color: '#64748b', marginTop: '10px' }}>Our volume and retainer discounts allow you to mark up our services and generate high margins effortlessly.</p>
                            </div>
                            <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center' }}><i className="fas fa-check-double" style={{ color: '#0f172a', marginRight: '10px' }}></i> QA Test Reports</h3>
                                <p style={{ color: '#64748b', marginTop: '10px' }}>We provide Litmus rendering screenshots with every delivery, giving you the proof you need for your client.</p>
                            </div>
                        </div>

                        <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '12px', textAlign: 'center', marginTop: '3rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#0f172a' }}>Ready to partner with an email expert?</h2>
                            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                                Let's discuss your agency's monthly volume and establish a seamless workflow.
                            </p>
                            <Link href="/schedule" className="btn btn-outline" style={{ borderColor: '#0f172a', color: '#0f172a' }}>Book an Intro Call</Link>
                        </div>
                    </div>
                </div>
            </section>
            
            <FAQ data={whiteLabelFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
