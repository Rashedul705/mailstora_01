import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Company-Wide Email Signature Setup | MailStora",
    description: "Company-wide email signatures, designed and deployed. One unified design for your whole team across Google Workspace or Microsoft 365.",
    alternates: {
        canonical: "https://mailstora.com/company-email-signature-deployment"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'HTML Email Signature Design', url: '/html-email-signature-design' },
    { label: 'Company-Wide Email Signature Setup', url: '/company-email-signature-deployment' }
];

const companySigFaqs = [
    {
        q: "What platforms do you support for deployment?",
        a: "We primarily support Google Workspace (G Suite) and Microsoft 365 Exchange. We can also integrate with third-party signature management tools like Exclaimer or CodeTwo."
    },
    {
        q: "How do you handle individual employee data?",
        a: "We create a 'master' HTML template using variables (like {{FirstName}} or {{Phone}}). Depending on your setup, this is either populated by your IT admin panel or we can generate individual HTML files for a smaller team."
    },
    {
        q: "Do you need access to our Google Workspace / Exchange admin panel?",
        a: "Not necessarily. We can provide the coded template and a step-by-step guide for your IT team to deploy it via transport rules. If you prefer, we can handle the setup securely."
    },
    {
        q: "How much does team pricing cost?",
        a: "Pricing depends on the number of employees and the deployment method. We offer the base master template design, plus a flat fee per employee if we generate individual files, or a one-time deployment fee for Workspace/Exchange."
    }
];

export default async function CompanyEmailSignaturePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/company-email-signature-deployment/#service",
        "name": "Company-Wide Email Signature Setup",
        "serviceType": "Company-wide email signature deployment",
        "description": "Unified company email signature design and deployment across Google Workspace and Microsoft 365.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Corporations and IT Departments" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "150",
            "url": "https://mailstora.com/company-email-signature-deployment/"
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
                        <div className="section-pill" style={{ display: 'inline-block', marginBottom: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', padding: '6px 16px', borderRadius: '30px', fontWeight: 'bold' }}>FOR TEAMS</div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Company-Wide Email Signatures, Designed and Deployed</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Ensure brand consistency across your entire organization. One master design, dynamically applied to every employee in Google Workspace or Microsoft 365.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Get Team Pricing</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>One Design System for the Whole Team</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            When employees set up their own signatures, brand identity falls apart. You end up with broken logos, mismatched fonts, and outdated promotional banners. We solve this by designing a single, master HTML template that is pushed to everyone automatically.
                        </p>
                        
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', marginTop: '3rem' }}>How Deployment Works</h2>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            <li style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem' }}>
                                <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>Microsoft 365 / Exchange Transport Rules</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>We provide the master HTML file injected with Exchange variables (like `%%FirstName%%`). Your IT admin applies it as an organization-wide transport rule, appending the signature to every outgoing email server-side.</p>
                            </li>
                            <li style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem' }}>
                                <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>Google Workspace Admin</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>Similar to Exchange, we can set up the template in the Google Admin Console to append to all users in a specific Organizational Unit.</p>
                            </li>
                            <li style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem' }}>
                                <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>Signature Management Tools</h3>
                                <p style={{ color: '#64748b', margin: 0 }}>If you use Exclaimer, CodeTwo, or WiseStamp, we can design the UI and write the custom HTML/CSS required for their advanced editors.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            
            <FAQ data={companySigFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
