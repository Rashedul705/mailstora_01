import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "White-Label HTML Email Development for Agencies | MailStora",
    description: "Your behind-the-scenes email developer. Hand-coded templates delivered under your brand, NDA-friendly, 24–48h turnaround, volume pricing.",
    alternates: {
        canonical: "https://mailstora.com/white-label-email-development/"
    }
};

const customFaqs = [
    {
        q: "Will my client ever know you're involved?",
        a: "No — nothing in the file or delivery process references me or MailStora."
    },
    {
        q: "Do you sign NDAs?",
        a: "Yes, that's a normal part of white-label work and I'm glad to sign one before we start."
    },
    {
        q: "What if we have our own coding standards or a style guide?",
        a: "Send it over and I'll build to it — the goal is for the output to look like it came from your team."
    },
    {
        q: "How much notice do you need for volume work?",
        a: "The more predictable the flow of work, the easier it is for me to guarantee turnaround — let's talk about your typical monthly volume."
    },
    {
        q: "Can you also build Klaviyo flows white-label, not just templates?",
        a: "Yes — flows, campaigns, and templates can all be handled this way. Check out the Klaviyo flow setup page for more info."
    },
    {
        q: "What if a client wants revisions after you've delivered?",
        a: "Just send the feedback back to me the same way you would the original brief — revisions are part of the process."
    }
];

export default function WhiteLabelEmailDevelopmentPage() {
    return (
        <>
            <Navbar />
            
            {/* Hero */}
            <section className="sp-hero" style={{ paddingTop: '140px', paddingBottom: '80px', background: '#0f172a', color: '#fff' }}>
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2', fontWeight: 800 }}>
                            I'll Be Your Behind-the-Scenes Email Developer
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
                            If your agency needs HTML email development without hiring in-house or explaining a new vendor to your client, I build under your brand — no MailStora name, no watermark, nothing pointing back to me. Your client just gets great emails, on time.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 600 }}>Let's Talk About Your Workload →</Link>
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: '#64748b', fontSize: '0.95rem' }}>
                            <span>✓ NDA-friendly</span>
                            <span>✓ 24–48h turnaround</span>
                            <span>✓ Volume pricing available</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* How White-Label Works With Me */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>How White-Label Works With Me</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.7 }}>
                            You send me the brief and design file, I build the template, and it comes back to you exactly as if it came from your own team. I don't reach out to your client, I don't put my name anywhere in the file, and I'm happy to sign an NDA before we start if that's your standard process.
                        </p>
                    </div>
                </div>
            </section>

            {/* What You Send Me */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>What You Send Me</h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569', fontSize: '1.15rem', lineHeight: 1.7 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>The design file</strong> (Figma, PSD, Sketch, or whatever you're working from)</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>The ESP it needs to be ready for</strong> (Klaviyo, Mailchimp, HubSpot, or others)</div>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: '#0ea5e9', marginRight: '12px', marginTop: '4px' }}>✓</span>
                                <div><strong>Any brand-specific coding requirements</strong> your client has</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Features (Turnaround, Communication, Pricing, QA) */}
            <section className="section" style={{ background: '#0f172a', padding: '80px 0', color: '#fff' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Turnaround & Capacity</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.7 }}>
                                    Standard turnaround is 24–48 hours per template. If you're sending me a steady volume of work, tell me your typical monthly load and I'll let you know what capacity looks like on my end.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Communication</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.7 }}>
                                    I'm happy to work through whatever channel fits your team — Slack, email, or your project management tool of choice — and I keep reasonable overlap with US/UK/EU business hours for quick back-and-forth when something's urgent.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Volume & Retainer Pricing</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                                    The more consistent the volume, the better the per-template rate. If you're sending me templates regularly, let's talk about a retainer instead of pricing project by project.
                                </p>
                                <Link href="/pricing" style={{ color: '#38bdf8', fontWeight: 600, fontSize: '1.15rem' }}>See starting rates →</Link>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Quality Assurance</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.7 }}>
                                    Every template I build for you gets the same testing pass I run on my own client work — checked across 30+ email clients including Outlook, with a test report if your process requires one to hand off to your client.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Cross Links */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Need more than just templates?</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            I also offer full automation setup behind the scenes for agencies.
                        </p>
                        <Link href="/klaviyo-flow-setup" style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '1.15rem' }}>See Klaviyo Flow Setup →</Link>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <FAQ data={customFaqs} />

            {/* Final CTA */}
            <section className="section" style={{ background: '#fff', padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Need a reliable developer working quietly behind your brand?</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Tell me about your typical workload and I'll put together pricing.
                        </p>
                        <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.15rem', fontWeight: 600 }}>Let's Talk About Your Workload →</Link>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </>
    );
}
