import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import Link from 'next/link';
import { siteConfig } from '../../utils/siteConfig';

export const metadata: Metadata = {
    title: "Custom HTML Email Template Development | MailStora",
    description: "Hand-coded HTML email templates from Figma or PSD, tested in 30+ email clients including Outlook. Klaviyo, Mailchimp and HubSpot ready. 24–48h delivery.",
    alternates: {
        canonical: "https://mailstora.com/html-email-template-development/"
    }
};

const customFaqs = [
    {
        q: "How much does a custom HTML email template cost?",
        a: "It depends on complexity, but most single templates start at [$XXX]. Check out the pricing page for more details."
    },
    {
        q: "How long does it take?",
        a: "Most templates are delivered in 24–48 hours. Rush delivery is available if you need it sooner."
    },
    {
        q: "Will it work in Outlook?",
        a: "Yes — Outlook is one of the trickiest clients to get right, and it's part of my standard testing pass on every template."
    },
    {
        q: "Can I edit it myself after you deliver it?",
        a: "Yes. I set up editable regions specific to your ESP (Klaviyo, Mailchimp, HubSpot, etc.) so you can update text and images without touching code."
    },
    {
        q: "What file formats do you accept for design?",
        a: "Figma, PSD, Sketch, Adobe XD, Canva, or PDF. If you don't have a finished design yet but have a brand guide, I can design the layout to match it and code it as one package."
    },
    {
        q: "Do you support dark mode?",
        a: "Yes, every template is tested in both light and dark mode before delivery."
    },
    {
        q: "How many revisions are included?",
        a: "One round of revisions is included with every template. Additional rounds can be added if needed."
    },
    {
        q: "Do you work with agencies under white-label?",
        a: "Yes — I can build under your agency's name with no MailStora branding."
    }
];

async function getPageData() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    
    try {
        const [portfolioRes, testimonialsRes] = await Promise.all([
            fetch(`${API_BASE}/api/portfolio`, { cache: 'no-store' }).catch(() => null),
            fetch(`${API_BASE}/api/testimonials?status=published`, { cache: 'no-store' }).catch(() => null)
        ]);

        return {
            portfolio: portfolioRes && portfolioRes.ok ? await portfolioRes.json() : null,
            testimonials: testimonialsRes && testimonialsRes.ok ? await testimonialsRes.json() : null
        };
    } catch (e) {
        return { portfolio: null, testimonials: null };
    }
}

export default async function HtmlEmailTemplateDevelopmentPage() {
    const data = await getPageData();

    return (
        <>
            <Navbar />
            
            {/* Hero */}
            <section className="sp-hero" style={{ paddingTop: '140px', paddingBottom: '80px', background: '#0f172a', color: '#fff' }}>
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2', fontWeight: 800 }}>
                            Custom HTML Email Templates, Coded and Tested by Me — Not a Team
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
                            I'm Rashedul Islam, a freelance HTML email developer with 13+ years of experience and 15,000+ hours on Upwork. I personally hand-code every template you get — no project manager, no outsourced coder, no agency markup.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 600 }}>Send Me Your Design → Get a Quote</Link>
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: '#64748b', fontSize: '0.95rem' }}>
                            <span>✓ 400+ templates built</span>
                            <span>✓ 15,000+ Upwork hours</span>
                            <span>✓ 13+ years of experience</span>
                            <span>✓ 24–48h delivery</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You Get */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>What You Get</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                            When you work with me, here's exactly what lands in your inbox:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', fontSize: '1.15rem', lineHeight: 1.7 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>A hand-coded HTML file</strong>, not a page builder export</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Inlined CSS</strong>, so it renders correctly across every major email client</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Editable regions</strong> set up for your ESP (Klaviyo, Mailchimp, HubSpot, Zoho, or whichever you use)</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Screenshots from my testing pass</strong>, so you can see how it looks before you send</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>A round of revisions included</strong>, so we can fine-tune anything that's off</div>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Direct communication</strong> with me the whole way through — no ticket queue</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Problems I Fix */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Problems I Fix</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                            I've built enough templates to know exactly where things usually go wrong. These are the issues I catch before they reach your subscribers:
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Outlook breaking your layout</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Outlook uses Word's rendering engine, not a browser engine, so spacing, buttons, and background images often break. I build with VML and MSO conditional comments specifically to handle this.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Dark mode inverting your colors</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Logos disappearing, text going unreadable. I test and code for prefers-color-scheme so your email looks right either way.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Gmail clipping your email</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Gmail cuts off any message over 102KB. I keep templates lean so your full email shows, not a "view entire message" link.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Mobile stacking gone wrong</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Columns and images that don't reflow properly on a phone screen. I build fluid and hybrid layouts so mobile always looks intentional.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Design Files I Accept */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Design Files I Accept</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Send me your design in whatever format you have:
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                            {['Figma', 'Photoshop (PSD)', 'Sketch', 'Adobe XD', 'Canva', 'PDF'].map((tool) => (
                                <span key={tool} style={{ background: '#f1f5f9', color: '#334155', padding: '8px 16px', borderRadius: '30px', fontWeight: 500 }}>{tool}</span>
                            ))}
                        </div>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
                            If you have a Figma file, share view access and I'll take it from there — <Link href="/figma-to-html-email" style={{ color: '#0ea5e9', fontWeight: 600 }}>see how that process works →</Link>
                        </p>
                        <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7 }}>
                            If you're working from PSD, Sketch, XD, or Canva, <Link href="/psd-to-html-email" style={{ color: '#0ea5e9', fontWeight: 600 }}>here's what I need from you →</Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* ESPs I Build For */}
            <section className="section" style={{ background: '#0f172a', padding: '80px 0', color: '#fff' }}>
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>ESPs I Build For</h2>
                        <p style={{ fontSize: '1.15rem', color: '#cbd5e1', marginBottom: '2rem', lineHeight: 1.7 }}>
                            I code templates ready to import into:
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                            {['Klaviyo', 'Mailchimp', 'HubSpot', 'Zoho Campaigns', 'MailerLite', 'Brevo', 'ActiveCampaign', 'Campaign Monitor', 'Salesforce Marketing Cloud'].map((esp) => (
                                <span key={esp} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '8px', fontWeight: 500 }}>{esp}</span>
                            ))}
                        </div>
                        <p style={{ fontSize: '1.15rem', color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            Working in one of these specifically? I've got a dedicated page for it:
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <Link href="/klaviyo-email-templates" style={{ color: '#38bdf8', fontWeight: 600 }}>Klaviyo Email Templates →</Link>
                            <Link href="/mailchimp-email-templates" style={{ color: '#38bdf8', fontWeight: 600 }}>Mailchimp Email Templates →</Link>
                            <Link href="/hubspot-email-templates" style={{ color: '#38bdf8', fontWeight: 600 }}>HubSpot Email Templates →</Link>
                            <Link href="/zoho-campaigns-email-templates" style={{ color: '#38bdf8', fontWeight: 600 }}>Zoho Campaigns Email Templates →</Link>
                            <Link href="/mailerlite-email-templates" style={{ color: '#38bdf8', fontWeight: 600 }}>MailerLite Email Templates →</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Email Clients I Test In */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700, textAlign: 'center' }}>Email Clients I Test In</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7, textAlign: 'center' }}>
                            Before anything ships, I test it across:
                        </p>
                        
                        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                        <th style={{ padding: '16px', fontWeight: 600, color: '#334155' }}>Client</th>
                                        <th style={{ padding: '16px', fontWeight: 600, color: '#334155' }}>Versions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '16px', color: '#0f172a', fontWeight: 500 }}>Outlook</td>
                                        <td style={{ padding: '16px', color: '#475569' }}>2016, 2019, 2021, 365, new Outlook, Outlook.com</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '16px', color: '#0f172a', fontWeight: 500 }}>Gmail</td>
                                        <td style={{ padding: '16px', color: '#475569' }}>Web, iOS app, Android app</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '16px', color: '#0f172a', fontWeight: 500 }}>Apple Mail</td>
                                        <td style={{ padding: '16px', color: '#475569' }}>macOS, iOS Mail</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '16px', color: '#0f172a', fontWeight: 500 }}>Yahoo Mail</td>
                                        <td style={{ padding: '16px', color: '#475569' }}>Web</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '16px', color: '#0f172a', fontWeight: 500 }}>Samsung Email</td>
                                        <td style={{ padding: '16px', color: '#475569' }}>Android</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 600, textAlign: 'center' }}>
                            30+ email clients tested on every build — I don't guess, I check.
                        </p>
                    </div>
                </div>
            </section>

            {/* Template Types I Build */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#0f172a', fontWeight: 700 }}>Template Types I Build</h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: '#475569', fontSize: '1.15rem', lineHeight: 2, display: 'inline-block', textAlign: 'left' }}>
                            <li>• Newsletters → <Link href="/newsletter-email-templates" style={{ color: '#0ea5e9', fontWeight: 600 }}>see the newsletter page →</Link></li>
                            <li>• Transactional emails (order confirmations, shipping updates, password resets) → <Link href="/transactional-email-templates" style={{ color: '#0ea5e9', fontWeight: 600 }}>see the transactional page →</Link></li>
                            <li>• Promotional and product launch emails</li>
                            <li>• Welcome series and abandoned cart emails</li>
                            <li>• Event invitations and seasonal campaigns</li>
                        </ul>
                        <p style={{ fontSize: '1.15rem', color: '#475569' }}>
                            Not sure which fits your project? Tell me what you're sending and I'll recommend the right structure.
                        </p>
                    </div>
                </div>
            </section>

            {/* My Process */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#0f172a', fontWeight: 700, textAlign: 'center' }}>My Process</h2>
                        
                        <div style={{ position: 'relative', paddingLeft: '40px' }}>
                            {/* Line */}
                            <div style={{ position: 'absolute', left: '15px', top: '10px', bottom: '10px', width: '2px', background: '#e2e8f0' }}></div>
                            
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>1</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>You send me your brief and design file.</strong> Figma, PSD, or a rough idea — whatever you've got.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>2</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>I quote you a price and timeline.</strong> Usually within a few hours.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>3</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>I code it.</strong> Table-based layout, inline CSS, tested against dark mode and mobile from the start.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>4</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>I test it across 30+ email clients</strong> and send you screenshots.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>5</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>I hand it off ESP-ready,</strong> with editable regions set up for your platform.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>6</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>You get a round of revisions</strong> if anything needs adjusting.</p>
                            </div>
                        </div>
                        <p style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 600, marginTop: '2rem' }}>
                            Typical turnaround: 24–48 hours. Need it faster? Ask me about rush delivery.
                        </p>
                    </div>
                </div>
            </section>

            {/* Technical Standards I Build To */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Technical Standards I Build To</h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', fontSize: '1.15rem', lineHeight: 1.8 }}>
                            <li>✓ Table-based layout with inline CSS (not a page-builder export)</li>
                            <li>✓ VML and MSO conditional comments for Outlook</li>
                            <li>✓ Fluid and hybrid layouts for mobile</li>
                            <li>✓ Web-safe fonts with proper fallbacks</li>
                            <li>✓ Retina-ready images</li>
                            <li>✓ Dark mode support (prefers-color-scheme)</li>
                            <li>✓ Descriptive alt text and accessibility basics</li>
                            <li>✓ Preheader text set up correctly</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Pricing</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            Starting at <strong>[$XXX]</strong> per custom template. The exact price depends on complexity — a simple newsletter costs less than a template with dynamic product blocks or multiple modules.
                        </p>
                        <Link href="/pricing" style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '1.15rem' }}>See full pricing →</Link>
                    </div>
                </div>
            </section>

            {/* Recent Work / Portfolio */}
            <Portfolio data={data.portfolio} />

            {/* Why Work With Me Instead of an Agency */}
            <section className="section" style={{ background: '#0f172a', padding: '80px 0', color: '#fff' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Why Work With Me Instead of an Agency</h2>
                        <p style={{ fontSize: '1.15rem', color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            When you hire an agency, your project usually passes through an account manager to a developer you never talk to. When you hire me, you're talking to the person who's actually going to write the code — from the first message to the final file. No handoffs, no markup for a project manager's time, no waiting on someone else's queue.
                        </p>
                        <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: 1.7 }}>
                            I've built 400+ templates this way over 13 years, and I'd rather you judge the work than the pitch.
                        </p>
                    </div>
                </div>
            </section>

            {/* What Clients Say / Testimonials */}
            <Testimonials data={data.testimonials} />

            {/* FAQs */}
            <FAQ data={customFaqs} />

            {/* Final CTA */}
            <section className="section" style={{ background: '#fff', padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Ready to get your template built?</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Send me your design file and a few details about the project — I'll get back to you with a quote, usually within a few hours.
                        </p>
                        <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.15rem', fontWeight: 600 }}>Get a Free Quote →</Link>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </>
    );
}
