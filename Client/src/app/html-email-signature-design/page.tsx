import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Custom HTML Email Signature Design & Coding | Freelance Expert",
    description: "Professional, clickable HTML email signatures that work in Outlook, Gmail & Apple Mail. Single or company-wide rollout without the paperclip attachment icon.",
    alternates: {
        canonical: "https://mailstora.com/html-email-signature-design/"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'HTML Email Signature Design', url: '/html-email-signature-design/' }
];

const signatureFaqs = [
    {
        q: "Will the images show up as attachments?",
        a: "No. I host all images (headshots, logos, social icons) on a secure, fast CDN. This prevents the dreaded 'paperclip' attachment icon from appearing on every email you send."
    },
    {
        q: "Do your signatures work in Dark Mode?",
        a: "Yes. I optimize all assets—such as using transparent PNGs with subtle white strokes for dark logos—to ensure they remain completely legible and premium when your recipient's OS is in Dark Mode."
    },
    {
        q: "Can I edit the signature later?",
        a: "Yes, I provide the raw HTML file. You can edit the text (like a phone number or job title) using any basic text editor before pasting it into your email client."
    },
    {
        q: "How do I install the signature?",
        a: "I provide step-by-step installation guides tailored for Outlook, Gmail, Apple Mail, and Office 365. For most clients, it is as simple as opening the HTML file in a browser, copying the rendered design, and pasting it into your settings."
    },
    {
        q: "Do you offer company-wide signature management?",
        a: "Yes! If you have a team, I can design a master template and either generate individual HTML files for each employee, or help you deploy it centrally via Google Workspace or Microsoft 365 Exchange rules."
    }
];

export default async function HtmlEmailSignaturePillarPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/html-email-signature-design/#service",
        "name": "HTML Email Signature Design",
        "serviceType": "HTML email signature design",
        "description": "Custom HTML email signature design and coding for individuals and teams.",
        "provider": { "@id": "https://mailstora.com/#rashedul" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Professionals and Corporations" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "url": "https://mailstora.com/html-email-signature-design/"
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
                    <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto', marginTop: '2rem' }}>
                        <div className="section-pill" style={{ display: 'inline-block', marginBottom: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', padding: '6px 16px', borderRadius: '30px', fontWeight: 'bold' }}>PILLAR SERVICE</div>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2', fontWeight: 800 }}>
                            Premium HTML Email Signatures Without the "Paperclip" Issue
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
                            A broken, amateur email signature destroys your brand credibility with every message you send. I design and hand-code professional, fully clickable signatures that render flawlessly across Outlook, Gmail, and Apple Mail—whether for you or your entire company.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 600 }}>Get Your Signature</Link>
                            <Link href="/portfolio" className="btn btn-outline-light" style={{ padding: '16px 32px', fontSize: '1.1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600 }}>View Examples</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Paperclip Issue & Broken Signatures */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Stop Sending the "Paperclip"</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            Have you ever noticed that some email signatures cause a "paperclip" attachment icon to appear on every email sent? This happens when your logo or headshot is physically embedded into the email as a Base64 string or an attached file, rather than being properly hosted.
                        </p>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            This isn't just an aesthetic annoyance—it frustrates your recipients when they are trying to search their inbox for an actual file attachment you sent them, only to find hundreds of emails flagged with a paperclip because of your logo.
                        </p>
                        <div style={{ background: '#f8fafc', borderLeft: '4px solid #0ea5e9', padding: '1.5rem', margin: '2rem 0' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#0f172a' }}>My Solution: Dedicated Image Hosting</h3>
                            <p style={{ color: '#475569', margin: 0, lineHeight: 1.6 }}>
                                I host all of your signature assets (logos, banners, social icons, headshots) on a high-speed CDN. Your signature loads instantly, looks crisp, and never triggers the false attachment icon.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dark Mode Challenges */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Surviving the Dark Mode Shift</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            Dark mode is now the default for millions of users across iOS, Android, macOS, and Windows. When an email client switches to dark mode, it aggressively inverts background colors and text colors to reduce eye strain. 
                        </p>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            If your signature isn't coded for this, disaster strikes. Black text disappears into dark backgrounds. Logos with white backgrounds look like ugly, jagged squares. Dark logos completely vanish.
                        </p>
                        <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#0f172a' }}>How I Engineer for Dark Mode:</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', fontSize: '1.1rem' }}>
                            <li style={{ marginBottom: '1rem', display: 'flex' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '10px' }}>✓</span> 
                                <span><strong>Asset Optimization:</strong> I apply subtle, imperceptible white strokes or glows to dark logos so they pop on dark backgrounds while remaining invisible on light ones.</span>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '10px' }}>✓</span> 
                                <span><strong>CSS Media Queries:</strong> I implement <code>@media (prefers-color-scheme: dark)</code> to explicitly control text colors and prevent Apple Mail or Outlook from ruining your brand colors.</span>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '10px' }}>✓</span> 
                                <span><strong>Transparent PNGs:</strong> All graphic elements are carefully exported to prevent ugly white bounding boxes when the background inverts.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Manual vs Central Deployment */}
            <section className="section" style={{ background: '#0f172a', padding: '80px 0', color: '#fff' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ color: '#818cf8', fontWeight: 700, marginBottom: '1rem', letterSpacing: '1px' }}>SCALABILITY</div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Single Employee vs. Company-Wide Rollouts</h2>
                        <p style={{ fontSize: '1.15rem', color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            When you have 3 employees, emailing them a file to copy-paste into their settings is easy. When you have 50 employees, it's a nightmare. Someone will mess up the formatting, someone will use an old logo, and someone will link to their personal Twitter instead of the company one.
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#fff' }}>Manual Installation (1-10 Users)</h3>
                                <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1rem' }}>
                                    I provide individualized HTML files for each team member. They simply open the file in Chrome, hit CTRL+A (Select All), CTRL+C (Copy), and paste it directly into the signature box in Gmail or Outlook.
                                </p>
                                <p style={{ color: '#818cf8', fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>Fast, simple, no IT required.</p>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#fff' }}>Central Deployment (10+ Users)</h3>
                                <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1rem' }}>
                                    I build a master HTML template containing Active Directory variables (like <code>%%FirstName%%</code>). We then deploy this template at the server level via Microsoft 365 Exchange rules or Google Workspace.
                                </p>
                                <p style={{ color: '#818cf8', fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>100% brand consistency. No user action required.</p>
                            </div>
                        </div>
                        
                        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                            <Link href="/company-email-signature-deployment/" className="btn btn-primary" style={{ padding: '12px 24px' }}>Learn more about Company Rollouts</Link>
                        </div>
                    </div>
                </div>
            </section>
            
            <FAQ data={signatureFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
