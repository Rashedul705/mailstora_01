import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Klaviyo Campaign Management Service | MailStora",
    description: "Done-for-you Klaviyo and ESP campaigns: design, coding, segmentation, subject lines, QA and scheduling. Monthly packages available.",
    alternates: {
        canonical: "https://mailstora.com/klaviyo-campaign-management/"
    }
};

const customFaqs = [
    {
        q: "Do you write the copy too, or just the design and code?",
        a: "I can work from your copy, or help shape subject lines and structure — but if you need full copywriting, let me know upfront so we can scope that in."
    },
    {
        q: "How many campaigns are included in a monthly package?",
        a: "That depends on the package you choose — check out the pricing page for the breakdown."
    },
    {
        q: "Can you manage campaigns across more than one platform?",
        a: "Yes, if you're running email across more than one ESP I can manage all of it."
    },
    {
        q: "What if I only need help with one big campaign, like a holiday sale?",
        a: "That's fine — one-off campaigns are available, no monthly commitment needed."
    },
    {
        q: "Do you handle the segmentation strategy, or do I need to tell you who to send to?",
        a: "I can build and refine segments based on your goals, or work within segments you already have set up."
    },
    {
        q: "How far in advance do you need the campaign brief?",
        a: "The more lead time the better for design and testing, but I can also turn around quick sends when something's time-sensitive."
    }
];

export default function KlaviyoCampaignManagementPage() {
    return (
        <>
            <Navbar />
            
            {/* Hero */}
            <section className="sp-hero" style={{ paddingTop: '140px', paddingBottom: '80px', background: '#0f172a', color: '#fff' }}>
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2', fontWeight: 800 }}>
                            Your Email Campaigns, Designed, Coded and Sent — Without You Lifting a Finger
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
                            I handle the whole campaign process for you: design, hand-coded HTML, segmentation, subject lines, QA, and scheduling. One person managing your sends from start to finish, not a rotating account team.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 600 }}>Let Me Handle Your Campaigns →</Link>
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: '#64748b', fontSize: '0.95rem' }}>
                            <span>✓ Hand-coded campaigns</span>
                            <span>✓ Full QA before every send</span>
                            <span>✓ Monthly or one-off packages</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included Per Campaign */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>What's Included Per Campaign</h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', fontSize: '1.15rem', lineHeight: 1.7 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Design matched to your brand</strong> (or your existing template system)</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Hand-coded HTML</strong>, not a drag-and-drop export</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Copy support</strong> if you need it, or I'll work from your draft</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Segmentation</strong>, so the right message reaches the right list</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Subject line and preview text suggestions</strong></div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Full QA pass</strong> — links, rendering, personalization tags — before anything sends</div>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Scheduling</strong> at the time that works best for your audience</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Campaign Types I Manage */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Campaign Types I Manage</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            {['Promotional campaigns (sales, offers, new product pushes)', 'Product launches', 'Regular newsletters', 'Seasonal campaigns, including BFCM and holiday sends'].map((type, idx) => (
                                <span key={idx} style={{ background: '#fff', color: '#334155', padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: 500 }}>{type}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Platforms I Work In */}
            <section className="section" style={{ background: '#0f172a', padding: '80px 0', color: '#fff' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Platforms I Work In</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                            {['Klaviyo', 'Mailchimp', 'HubSpot'].map((platform) => (
                                <span key={platform} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '8px', fontWeight: 500 }}>{platform}</span>
                            ))}
                            <span style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '8px', fontWeight: 500 }}>and other major ESPs</span>
                        </div>
                        <Link href="/html-email-template-development" style={{ color: '#38bdf8', fontWeight: 600, fontSize: '1.15rem' }}>See my full ESP list →</Link>
                    </div>
                </div>
            </section>

            {/* My QA Checklist Before Every Send */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#0f172a', fontWeight: 700, textAlign: 'center' }}>My QA Checklist Before Every Send</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {['Links tested and working', 'Personalization tags rendering correctly', 'Rendering checked in Outlook, Gmail, and Apple Mail', 'Mobile view checked', 'Subject line and preview text confirmed', 'Unsubscribe and compliance footer in place'].map((item, idx) => (
                                <div key={idx} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #0ea5e9' }}>
                                    <p style={{ margin: 0, color: '#334155', fontWeight: 500, fontSize: '1.1rem' }}>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Reporting & Packages */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Reporting</h2>
                            <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.7 }}>
                                After each send, I'll share how it performed — opens, clicks, revenue where applicable — so we can adjust the next one based on what actually worked.
                            </p>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#0f172a', fontWeight: 700 }}>Monthly Packages vs. One-Off Campaigns</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>One-off</h4>
                                    <p style={{ color: '#64748b', margin: 0 }}>Need a single campaign built and sent? I can do that.</p>
                                </div>
                                <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Monthly package</h4>
                                    <p style={{ color: '#64748b', margin: 0 }}>A set number of campaigns per month, planned and sent on a schedule, so your email calendar runs without you managing it.</p>
                                </div>
                            </div>
                            <Link href="/pricing" style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '1.15rem' }}>See pricing for both →</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <FAQ data={customFaqs} />

            {/* Final CTA */}
            <section className="section" style={{ background: '#fff', padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Want your campaigns handled end to end?</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Tell me what you're sending and how often, and I'll put together a plan.
                        </p>
                        <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.15rem', fontWeight: 600 }}>Let Me Handle Your Campaigns →</Link>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </>
    );
}
