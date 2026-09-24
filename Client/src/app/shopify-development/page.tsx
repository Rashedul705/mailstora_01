import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Portfolio from "../components/Portfolio";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Shopify Store Development & Theme Customization | MailStora",
    description: "Shopify theme customization, speed optimization and conversion-focused product pages — connected to your Klaviyo email setup.",
    alternates: {
        canonical: "https://mailstora.com/shopify-development/"
    }
};

const customFaqs = [
    {
        q: "Do you build stores from scratch, or only customize existing ones?",
        a: "Both — tell me where you're starting from and I'll scope the right approach."
    },
    {
        q: "Can you fix a slow store without a full redesign?",
        a: "Often, yes. Speed issues are usually fixable without touching the whole design."
    },
    {
        q: "Will this affect my existing Klaviyo flows?",
        a: "If anything, it should help — a clean store setup means more reliable data feeding into your flows."
    },
    {
        q: "Do you handle custom Liquid code, or just theme settings?",
        a: "I work with custom Liquid sections when the theme's built-in options aren't enough."
    },
    {
        q: "Can you connect my store to other apps I use?",
        a: "Yes — app setup and configuration is part of what I offer."
    }
];

async function getPageData() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    
    try {
        const portfolioRes = await fetch(`${API_BASE}/api/portfolio`, { cache: 'no-store' }).catch(() => null);
        let portfolioData = portfolioRes && portfolioRes.ok ? await portfolioRes.json() : null;
        if (portfolioData && portfolioData.items) {
            // Filter only Shopify if possible
            portfolioData.items = portfolioData.items.filter((item: any) => item.type === 'Shopify');
        }

        return { portfolio: portfolioData };
    } catch (e) {
        return { portfolio: null };
    }
}

export default async function ShopifyDevelopmentPage() {
    const data = await getPageData();

    return (
        <>
            <Navbar />
            
            {/* Hero */}
            <section className="sp-hero" style={{ paddingTop: '140px', paddingBottom: '80px', background: '#0f172a', color: '#fff' }}>
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2', fontWeight: 800 }}>
                            A Shopify Store That's Built to Work With Your Emails, Not Separately From Them
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
                            I build and customize Shopify stores with an eye on how your store and your email marketing connect — because a great-looking store still leaves money on the table if it's not feeding clean data into flows like abandoned cart and back-in-stock.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 600 }}>Tell Me About Your Store →</Link>
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: '#64748b', fontSize: '0.95rem' }}>
                            <span>✓ Theme customization</span>
                            <span>✓ Speed optimization</span>
                            <span>✓ Klaviyo-integrated setup</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* What I Build */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>What I Build</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', borderLeft: '4px solid #0ea5e9' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700, color: '#0f172a' }}>Theme customization</h4>
                                <p style={{ color: '#475569', margin: 0, fontSize: '1.1rem' }}>Adjusting an existing theme to match your brand and layout needs.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', borderLeft: '4px solid #0ea5e9' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700, color: '#0f172a' }}>Speed optimization</h4>
                                <p style={{ color: '#475569', margin: 0, fontSize: '1.1rem' }}>Cleaning up what's slowing your store down.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', borderLeft: '4px solid #0ea5e9' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700, color: '#0f172a' }}>Product page layout</h4>
                                <p style={{ color: '#475569', margin: 0, fontSize: '1.1rem' }}>Structuring product pages to actually convert.</p>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', borderLeft: '4px solid #0ea5e9' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700, color: '#0f172a' }}>App setup</h4>
                                <p style={{ color: '#475569', margin: 0, fontSize: '1.1rem' }}>Connecting and configuring the apps your store depends on.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Where Email Fits In */}
            <section className="section" style={{ background: '#0f172a', padding: '80px 0', color: '#fff' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Where Email Fits In</h2>
                        <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '2rem' }}>
                            This is where my background actually helps: I make sure your Shopify events (cart, checkout, purchase, back-in-stock) are set up cleanly so your Klaviyo flows trigger correctly. A lot of "broken" flows aren't a Klaviyo problem — they're a store-setup problem.
                        </p>
                        <Link href="/klaviyo-flow-setup" style={{ color: '#38bdf8', fontWeight: 600, fontSize: '1.15rem' }}>See my Klaviyo flow work →</Link>
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
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>You tell me what needs work</strong> — a full build, a redesign, or specific fixes.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>2</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>I review your current setup</strong> and flag anything affecting speed or email integration.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>3</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>I build or customize,</strong> testing as I go.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>4</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>You review and I make adjustments</strong> before we call it done.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Recent Work */}
            <Portfolio data={data.portfolio} />
            <section style={{ textAlign: 'center', paddingBottom: '80px', background: '#f8fafc', marginTop: '-80px', position: 'relative', zIndex: 10 }}>
                <Link href="/portfolio" style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '1.15rem' }}>See the full portfolio →</Link>
            </section>

            {/* FAQs */}
            <FAQ data={customFaqs} />

            {/* Final CTA */}
            <section className="section" style={{ background: '#fff', padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Want a store that actually supports your email marketing?</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Tell me what you're working with and what's not working.
                        </p>
                        <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.15rem', fontWeight: 600 }}>Tell Me About Your Store →</Link>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </>
    );
}
