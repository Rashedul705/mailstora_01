import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Social Media Management for Ecommerce Brands | MailStora",
    description: "Consistent posting, branded content and monthly reporting across Instagram, Pinterest, TikTok, Facebook and X — aligned with your email campaigns.",
    alternates: {
        canonical: "https://mailstora.com/social-media-management/"
    }
};

const customFaqs = [
    {
        q: "Which platforms do you recommend for an ecommerce brand?",
        a: "It depends on your product and audience — Instagram and Pinterest tend to work well for visual products, TikTok for reach with younger audiences. I can recommend a starting mix based on what you sell."
    },
    {
        q: "Do you create the visual content, or just manage posting?",
        a: "I handle captions, hashtag research, and posting; for visual assets, I can work from what you provide or coordinate with a designer if new creative is needed."
    },
    {
        q: "Can this run alongside my email marketing with you?",
        a: "Yes — that's actually where this works best, since I can align both instead of managing them separately."
    },
    {
        q: "How often will you post?",
        a: "That depends on the package and platform — we'll agree on a cadence that fits your goals and budget."
    },
    {
        q: "Do you handle paid ads too?",
        a: "I can support Meta ads and tracking setup as part of a broader digital marketing engagement — let's discuss your goals."
    }
];

export default function SocialMediaManagementPage() {
    return (
        <>
            <Navbar />
            
            {/* Hero */}
            <section className="sp-hero" style={{ paddingTop: '140px', paddingBottom: '80px', background: '#0f172a', color: '#fff' }}>
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2', fontWeight: 800 }}>
                            Social Media That Actually Talks to Your Email Marketing
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
                            I manage social presence the same way I manage email — consistent, on-brand, and tracked. If you're already working with me on email, your social content and your campaigns stay aligned instead of running as two separate efforts.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 600 }}>Let's Talk About Your Social Presence →</Link>
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: '#64748b', fontSize: '0.95rem' }}>
                            <span>✓ Instagram</span>
                            <span>✓ Pinterest</span>
                            <span>✓ TikTok</span>
                            <span>✓ Facebook</span>
                            <span>✓ X (Twitter)</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>What's Included</h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', fontSize: '1.15rem', lineHeight: 1.7 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Consistent posting</strong> on the platforms that matter for your brand</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Branded content</strong> that matches your visual identity</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Caption writing</strong> and hashtag research</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Engagement</strong> and follower growth work</div>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Monthly reporting</strong> so you can see what's actually working</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Platforms I Work In */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700, textAlign: 'center' }}>Platforms I Work In</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Instagram</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Feed, Stories, and Reels.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Pinterest</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Pin creation and account growth (this is one of my strongest areas — I actively grow personal and brand Pinterest profiles).</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>TikTok</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Short-form content.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Facebook</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Page management and posting.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>X (Twitter)</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Captions and ongoing engagement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Calendar & Reporting */}
            <section className="section" style={{ background: '#0f172a', padding: '80px 0', color: '#fff' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Content Calendar Aligned With Your Email Campaigns</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.7 }}>
                                    If you're running an email promotion, launch, or seasonal campaign, I make sure your social content lines up with it instead of contradicting it — same offer, same messaging, same timing across channels.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Reporting</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.7 }}>
                                    Every month, you get a straightforward look at what was posted and how it performed, so we can double down on what's working and drop what isn't.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#0f172a', fontWeight: 700 }}>Packages</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
                            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', borderLeft: '4px solid #0ea5e9' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Single platform</h4>
                                <p style={{ color: '#475569', margin: 0 }}>Focused management on the one channel that matters most to you.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', borderLeft: '4px solid #0ea5e9' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Multi-platform</h4>
                                <p style={{ color: '#475569', margin: 0 }}>Coordinated management across several channels with one consistent calendar.</p>
                            </div>
                        </div>
                        <Link href="/pricing" style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '1.15rem' }}>See pricing →</Link>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <FAQ data={customFaqs} />

            {/* Final CTA */}
            <section className="section" style={{ background: '#fff', padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Want your social content working with your email marketing, not separately from it?</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Tell me which platforms matter most to you.
                        </p>
                        <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.15rem', fontWeight: 600 }}>Let's Talk About Your Social Presence →</Link>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </>
    );
}
