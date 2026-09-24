import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Custom HTML Email Signature Design | MailStora",
    description: "Professional, clickable HTML email signatures that work in Outlook, Gmail & Apple Mail. Single or company-wide rollout. Fast delivery.",
    alternates: {
        canonical: "https://mailstora.com/html-email-signature-design/"
    }
};

const customFaqs = [
    {
        q: "How much does a custom email signature cost?",
        a: "Single signatures start at [$XX]. Team rollouts are priced by headcount — check out the pricing page for details."
    },
    {
        q: "Will it work in Outlook?",
        a: "Yes — Outlook is one of the trickiest clients for signatures specifically (image handling and spacing issues), and it's part of my standard testing."
    },
    {
        q: "Can I add a photo or company logo?",
        a: "Yes, both are common and I'll size and optimize them properly so they load fast and stay sharp."
    },
    {
        q: "Do you handle company-wide rollout for a whole team?",
        a: "Yes — I can set up one design system and personalize it per employee, deployed through Microsoft 365/Exchange or Google Workspace."
    },
    {
        q: "Can I update it myself later?",
        a: "Yes, I'll give you clear instructions for updating text fields. For bigger design changes, just message me."
    },
    {
        q: "How long does it take?",
        a: "Most single signatures are delivered in 24–48 hours."
    },
    {
        q: "Do you host the images?",
        a: "Yes — I don't rely on attachments or personal drive links, which is one of the most common reasons signatures break."
    },
    {
        q: "What if my logo or branding needs some design work first?",
        a: "If you have a brand guide, I can adjust the artwork to fit the signature layout."
    }
];

async function getPageData() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    
    try {
        const [portfolioRes, testimonialsRes] = await Promise.all([
            fetch(`${API_BASE}/api/portfolio`, { cache: 'no-store' }).catch(() => null),
            fetch(`${API_BASE}/api/testimonials?status=published`, { cache: 'no-store' }).catch(() => null)
        ]);

        let portfolioData = portfolioRes && portfolioRes.ok ? await portfolioRes.json() : null;
        if (portfolioData && portfolioData.items) {
            // Filter only Email Signatures
            portfolioData.items = portfolioData.items.filter((item: any) => item.type === 'Email Signature');
        }

        return {
            portfolio: portfolioData,
            testimonials: testimonialsRes && testimonialsRes.ok ? await testimonialsRes.json() : null
        };
    } catch (e) {
        return { portfolio: null, testimonials: null };
    }
}

export default async function HtmlEmailSignatureDesignPage() {
    const data = await getPageData();

    return (
        <>
            <Navbar />
            
            {/* Hero */}
            <section className="sp-hero" style={{ paddingTop: '140px', paddingBottom: '80px', background: '#0f172a', color: '#fff' }}>
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2', fontWeight: 800 }}>
                            A Professional Email Signature, Coded to Actually Work
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
                            I design and hand-code HTML email signatures that look right and click right — in Outlook, Gmail, Apple Mail, and everywhere else your emails land. Built by me personally, not spat out of a signature generator.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 600 }}>Get My Signature Built →</Link>
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: '#64748b', fontSize: '0.95rem' }}>
                            <span>✓ Hand-coded, not template-generated</span>
                            <span>✓ Tested in Outlook, Gmail & Apple Mail</span>
                            <span>✓ Single or company-wide rollout</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You Get */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>What You Get</h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', fontSize: '1.15rem', lineHeight: 1.7 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>A signature designed to match your brand</strong></div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Hand-coded HTML</strong> — not a generic signature-generator export</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Self-hosted images</strong>, so nothing shows up as a broken red X</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Clickable social icons and links</strong></div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>An optional banner or CTA button</strong></div>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>A simple install guide</strong>, or I can walk you through setup myself</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Signature Styles I Build */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Signature Styles I Build</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Minimal</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Name, title, contact details, one clean divider line.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Corporate</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Logo, full contact block, social icons.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>With photo</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>A professional headshot alongside your details.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>With banner or CTA</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>A promotional banner or button linking to your site, an offer, or your calendar link.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Email Clients I Test In */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Email Clients I Test In</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Every signature is tested to display correctly in:
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                            {['Outlook (classic and new)', 'Gmail', 'Apple Mail', 'Outlook.com', 'Yahoo Mail'].map((client) => (
                                <span key={client} style={{ background: '#f1f5f9', color: '#334155', padding: '8px 16px', borderRadius: '30px', fontWeight: 500 }}>{client}</span>
                            ))}
                        </div>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
                            Using Outlook specifically? <Link href="/outlook-email-signature" style={{ color: '#0ea5e9', fontWeight: 600 }}>See the Outlook signature page →</Link>
                        </p>
                        <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7 }}>
                            Using Gmail or Google Workspace? <Link href="/gmail-email-signature" style={{ color: '#0ea5e9', fontWeight: 600 }}>See the Gmail signature page →</Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* Single Signature or Company-Wide Rollout */}
            <section className="section" style={{ background: '#0f172a', padding: '80px 0', color: '#fff' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 700, textAlign: 'center' }}>Single Signature or Company-Wide Rollout</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Single signature</h4>
                                <p style={{ color: '#cbd5e1', margin: 0 }}>One signature, designed and coded just for you.</p>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Company-wide deployment</h4>
                                <p style={{ color: '#cbd5e1', margin: 0, marginBottom: '1rem' }}>One design system, personalized per employee (name, title, phone), rolled out across your whole team through Microsoft 365/Exchange or Google Workspace.</p>
                                <Link href="/company-email-signature-deployment" style={{ color: '#38bdf8', fontWeight: 600 }}>See how company-wide rollout works →</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Standards I Build To */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Technical Standards I Build To</h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', fontSize: '1.15rem', lineHeight: 1.8 }}>
                            <li>✓ Hosted images, not linked to a personal drive or email attachment</li>
                            <li>✓ Retina-ready graphics so it looks sharp on any screen</li>
                            <li>✓ Dark mode considered, not ignored</li>
                            <li>✓ Mobile-safe width, so nothing breaks on a phone</li>
                            <li>✓ Small file size, so it doesn't slow down your emails</li>
                            <li>✓ Tested for broken links or missing assets before I send it to you</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Industries I've Built Signatures For */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Industries I've Built Signatures For</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                            {['Insurance', 'Real estate', 'Law firms', 'Marketing agencies', 'SaaS companies'].map((ind) => (
                                <span key={ind} style={{ background: '#fff', color: '#334155', padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: 500 }}>{ind}</span>
                            ))}
                        </div>
                        <Link href="/portfolio" style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '1.15rem' }}>See examples in my portfolio →</Link>
                    </div>
                </div>
            </section>

            {/* My Process */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#0f172a', fontWeight: 700, textAlign: 'center' }}>My Process</h2>
                        
                        <div style={{ position: 'relative', paddingLeft: '40px' }}>
                            <div style={{ position: 'absolute', left: '15px', top: '10px', bottom: '10px', width: '2px', background: '#e2e8f0' }}></div>
                            
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>1</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>You tell me what you want included</strong> — name, title, photo, banner, links.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>2</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>I design a draft matching your brand.</strong></p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>3</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>Once you approve it, I hand-code it</strong> and test it across the major clients.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>4</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>You get the final file plus install instructions</strong> — or I set it up for you directly.</p>
                            </div>
                        </div>
                        <p style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 600, marginTop: '2rem' }}>
                            Typical turnaround: 24–48 hours.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Pricing</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            Starting at <strong>[$XX]</strong> per signature. Team rollouts are priced per number of employees.
                        </p>
                        <Link href="/pricing" style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '1.15rem' }}>See full pricing →</Link>
                    </div>
                </div>
            </section>

            {/* Recent Work / Portfolio */}
            <Portfolio data={data.portfolio} />

            {/* What Clients Say / Testimonials */}
            <Testimonials data={data.testimonials} />

            {/* FAQs */}
            <FAQ data={customFaqs} />

            {/* Final CTA */}
            <section className="section" style={{ background: '#fff', padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Ready for a signature that actually works?</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Tell me what you want included and I'll send you a draft.
                        </p>
                        <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.15rem', fontWeight: 600 }}>Get My Signature Built →</Link>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </>
    );
}
