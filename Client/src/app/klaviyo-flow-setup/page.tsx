import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Klaviyo Flow Setup — Welcome, Cart & Browse Flows | MailStora",
    description: "Klaviyo flows built and designed for you: welcome series, abandoned cart, browse abandonment, post-purchase and win-back. Custom-coded emails included.",
    alternates: {
        canonical: "https://mailstora.com/klaviyo-flow-setup/"
    }
};

const customFaqs = [
    {
        q: "How many flows do I actually need to start?",
        a: "Most stores see the most impact starting with welcome, abandoned cart, and post-purchase — I can recommend a starting set based on your store."
    },
    {
        q: "Do you also build the email designs, or just the automation logic?",
        a: "Both. I design and hand-code the emails and build the flow logic in Klaviyo."
    },
    {
        q: "Can you work with my existing Klaviyo account?",
        a: "Yes — I'll work inside your existing account and match your current brand and template style."
    },
    {
        q: "Do I need Shopify for this?",
        a: "Most of my flow work is for Shopify stores, but the same setup works with other platforms Klaviyo integrates with."
    },
    {
        q: "How is this different from your Klaviyo template page?",
        a: "This page covers the strategy and automation setup. The template page covers standalone template design if you just need the emails, not the flow logic."
    },
    {
        q: "How long until a flow is live?",
        a: "Depends on how many flows and how much customization — I'll give you a timeline once I know what you need."
    }
];

export default function KlaviyoFlowSetupPage() {
    return (
        <>
            <Navbar />
            
            {/* Hero */}
            <section className="sp-hero" style={{ paddingTop: '140px', paddingBottom: '80px', background: '#0f172a', color: '#fff' }}>
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2', fontWeight: 800 }}>
                            Klaviyo Flows That Actually Recover Revenue
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
                            I build and design the automated flows that run in the background of your Klaviyo account — welcome series, abandoned cart, browse abandonment, win-back — so you make sales while you sleep. Strategy, design, and hand-coded emails, all from me.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 600 }}>Get My Flows Built →</Link>
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: '#64748b', fontSize: '0.95rem' }}>
                            <span>✓ Built for Shopify and other ecommerce platforms</span>
                            <span>✓ Custom-coded emails included</span>
                            <span>✓ Set up once, runs continuously</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Flows Matter */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Why Flows Matter</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.7 }}>
                            Campaigns are the emails you send when you decide to send them. Flows are the emails that go out automatically, triggered by what a customer does — and in most Klaviyo accounts I've worked in, flows quietly generate a disproportionate share of email revenue because they catch people at the exact moment they're most likely to buy.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Flows I Build */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Core Flows I Build</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Welcome series</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>The first few emails a new subscriber gets, setting expectations and nudging toward a first purchase.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Abandoned checkout</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Recovering the person who started checkout but didn't finish.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Abandoned cart</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Recovering the person who added to cart but never reached checkout.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Browse abandonment</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Following up when someone views a product but doesn't add it to cart.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Post-purchase</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Thank you, shipping updates, and cross-sell timed after the sale.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Win-back</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Re-engaging subscribers who've gone quiet.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Back in stock</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Alerting customers when a sold-out item is available again.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Sunset flow</h4>
                                <p style={{ color: '#64748b', margin: 0 }}>Cleanly retiring unengaged subscribers to protect your sender reputation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features (Segmentation, Dynamic Content, Design, Testing) */}
            <section className="section" style={{ background: '#0f172a', padding: '80px 0', color: '#fff' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Segmentation & Triggers</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.7 }}>
                                    I set up the logic behind each flow — profile properties, Shopify events (or your platform's equivalent), and conditional splits — so the right email reaches the right person at the right moment, not a one-size-fits-all sequence.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Dynamic Content</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.7 }}>
                                    Where it makes sense, I build in dynamic product feeds and recommendations (using Klaviyo's template logic) so a cart-recovery email shows the actual items someone left behind, not a generic banner.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Design + Code Included</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.7 }}>
                                    Every flow comes with fully designed, hand-coded emails — not a drag-and-drop placeholder. If you already have a template system in place, I'll match it. If you need templates built from scratch, <Link href="/klaviyo-email-templates" style={{ color: '#38bdf8', fontWeight: 600 }}>see my Klaviyo template page →</Link>
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Testing & Reporting</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.7 }}>
                                    Once a flow is live, I keep an eye on how it performs and can set up A/B tests on subject lines, send timing, or content — so we're not just launching flows, we're improving them.
                                </p>
                            </div>
                        </div>
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
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>You tell me which flows you need</strong> — or I recommend a starting set based on your store.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>2</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>I map the logic</strong> — triggers, timing, segmentation.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>3</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>I design and code the emails</strong> for each step.</p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>4</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>I build the flow in Klaviyo, test it, and turn it live.</strong></p>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>5</div>
                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem', margin: 0, paddingTop: '4px' }}><strong>You get a rundown of what was built and how to read the results.</strong></p>
                            </div>
                        </div>
                        <p style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 600, marginTop: '2rem' }}>
                            Typical timeline: [X business days] per flow, depending on complexity.
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
                            Starting at <strong>[$XXX]</strong> per flow, or <strong>[$X,XXX]</strong> for a full core flow package (welcome, abandoned cart, browse abandonment, post-purchase).
                        </p>
                        <Link href="/pricing" style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '1.15rem' }}>See full pricing →</Link>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Results</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Ready to see how automated flows have transformed revenue for other brands?
                        </p>
                        <Link href="/case-studies" style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '1.15rem' }}>See case studies →</Link>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <FAQ data={customFaqs} />

            {/* Final CTA */}
            <section className="section" style={{ background: '#fff', padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Ready to put your Klaviyo account on autopilot?</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Tell me about your store and which flows you're missing.
                        </p>
                        <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.15rem', fontWeight: 600 }}>Get My Flows Built →</Link>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </>
    );
}
