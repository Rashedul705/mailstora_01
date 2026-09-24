import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Link from 'next/link';
import { siteConfig } from '../../utils/siteConfig';

export const metadata: Metadata = {
    title: "HTML Email Template Development Services | Freelance Expert",
    description: "Get custom-coded, responsive HTML email templates from a dedicated freelance developer. Expertly tested across 30+ email clients including Outlook. 24-48h delivery.",
    alternates: {
        canonical: "https://mailstora.com/html-email-template-development/"
    }
};

async function getPillarData() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    
    try {
        const [pricingRes, faqRes] = await Promise.all([
            fetch(`${API_BASE}/api/pricing`, { cache: 'no-store' }).catch(() => null),
            fetch(`${API_BASE}/api/faq`, { cache: 'no-store' }).catch(() => null)
        ]);

        return {
            pricing: pricingRes && pricingRes.ok ? await pricingRes.json() : [],
            faq: faqRes && faqRes.ok ? await faqRes.json() : []
        };
    } catch (e) {
        return { pricing: [], faq: [] };
    }
}

export default async function HtmlEmailTemplateDevelopmentPage() {
    const data = await getPillarData();

    return (
        <>
            <Navbar />
            
            <section className="sp-hero" style={{ paddingTop: '140px', paddingBottom: '80px', background: '#0f172a', color: '#fff' }}>
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div className="section-pill" style={{ display: 'inline-block', marginBottom: '1.5rem', background: 'rgba(255, 107, 0, 0.1)', color: '#ff6b00', padding: '6px 16px', borderRadius: '30px', fontWeight: 'bold' }}>EXPERT SERVICE</div>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2', fontWeight: 800 }}>
                            Hand-Coded HTML Email Templates That Never Break in Outlook
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
                            I build pixel-perfect, mobile-responsive HTML emails from your Figma or PSD files. Stop relying on buggy drag-and-drop builders or unreliable freelancers. I write every line of code myself, ensuring your emails look flawless across 30+ email clients—guaranteed.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', fontWeight: 600 }}>Get a Free Quote</Link>
                            <Link href="/portfolio" className="btn btn-outline-light" style={{ padding: '16px 32px', fontSize: '1.1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600 }}>View My Portfolio</Link>
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: '#64748b', fontSize: '0.95rem' }}>
                            <span>✓ {siteConfig.stats.templatesBuilt} Templates Delivered</span>
                            <span>✓ 100% Hand-Coded</span>
                            <span>✓ 24-48 Hour Turnaround</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Agency & Fiverr Problem */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>The Problem with Agencies & Cheap Freelancers</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            If you've tried outsourcing your email development before, you've probably run into the same frustrating issues. You hire an agency, and they pass your project down to a junior developer who uses a bloated drag-and-drop tool to spit out terrible code. 
                        </p>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            Or, you hire a cheap freelancer on Fiverr, only to be met with constant ghosting, missed deadlines, and templates that completely shatter the moment they land in a Windows Outlook inbox. It shouldn't be this hard to get an email coded correctly.
                        </p>
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '2rem', borderRadius: '12px', marginTop: '2rem' }}>
                            <h3 style={{ color: '#991b1b', fontSize: '1.3rem', marginBottom: '1rem' }}>The Hidden Costs of Bad Email Code:</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#7f1d1d' }}>
                                <li style={{ marginBottom: '0.75rem' }}>❌ <strong>High spam rates</strong> due to bloated, non-compliant HTML.</li>
                                <li style={{ marginBottom: '0.75rem' }}>❌ <strong>Broken layouts</strong> in Outlook and older desktop clients.</li>
                                <li style={{ marginBottom: '0.75rem' }}>❌ <strong>Unreadable text</strong> because dark mode CSS wasn't implemented.</li>
                                <li>❌ <strong>Lost revenue</strong> when call-to-action buttons don't click on mobile devices.</li>
                            </ul>
                        </div>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginTop: '2rem', lineHeight: 1.7, fontWeight: 600 }}>
                            I operate differently. When you hire me, you get direct access to an expert with {siteConfig.stats.yearsExperience} years of dedicated email development experience. No middlemen, no account managers, and absolutely no automated code generators.
                        </p>
                    </div>
                </div>
            </section>

            {/* Email Dev vs Web Dev */}
            <section className="section" style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: 700 }}>Why Your Web Developer Can't Code Emails</h2>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            A common mistake companies make is handing an email design to their web developer. Web development and email development are fundamentally different disciplines. 
                        </p>
                        <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            Modern web developers use Flexbox, CSS Grid, and semantic HTML5 tags like <code>&lt;section&gt;</code> and <code>&lt;div&gt;</code>. If you use those in an email, it will break immediately. Email development requires coding like it's 1999—using heavily nested <code>&lt;table&gt;</code> structures, inline CSS, and highly specific conditional comments just to make a button look like a button.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>Web Development</h4>
                                <ul style={{ color: '#64748b', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                                    <li>Uses Flexbox & CSS Grid</li>
                                    <li>External stylesheets</li>
                                    <li>Standardized browsers (Chrome, Safari)</li>
                                    <li>Modern HTML5 elements</li>
                                </ul>
                            </div>
                            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '2px solid #0ea5e9' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✉️</div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700, color: '#0ea5e9' }}>Email Development</h4>
                                <ul style={{ color: '#64748b', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                                    <li>Uses 100% nested HTML Tables</li>
                                    <li>Strictly inline CSS</li>
                                    <li>Fragmented rendering engines (Word, WebKit)</li>
                                    <li>Requires VML for backgrounds</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Outlook Problem */}
            <section className="section" style={{ background: '#0f172a', padding: '80px 0', color: '#fff' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '1rem', letterSpacing: '1px' }}>THE OUTLOOK CHALLENGE</div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Conquering Windows Outlook Rendering</h2>
                        <p style={{ fontSize: '1.15rem', color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            Did you know that desktop versions of Windows Outlook (2007, 2010, 2013, 2016, 2019, and 365) don't use a web browser to render emails? They use Microsoft Word. 
                        </p>
                        <p style={{ fontSize: '1.15rem', color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            This is why emails that look beautiful in Gmail suddenly have huge gaps, unstyled text, and missing background images when viewed in Outlook. Microsoft Word strips out margins, padding on paragraphs, max-width constraints, and background images.
                        </p>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#fff' }}>How I Fix Outlook Rendering:</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1' }}>
                                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ color: '#38bdf8', marginRight: '12px', marginTop: '4px' }}>🛡️</span>
                                    <div><strong>Ghost Tables:</strong> I use conditional MSO (Microsoft Office) comments to wrap content in fixed-width ghost tables that only Outlook can see, forcing it to respect the layout width.</div>
                                </li>
                                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ color: '#38bdf8', marginRight: '12px', marginTop: '4px' }}>🛡️</span>
                                    <div><strong>VML Backgrounds:</strong> Because Outlook ignores standard CSS background images, I code Vector Markup Language (VML) fallbacks so your hero images and patterns load perfectly.</div>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ color: '#38bdf8', marginRight: '12px', marginTop: '4px' }}>🛡️</span>
                                    <div><strong>Bulletproof Buttons:</strong> Standard HTML buttons collapse in Outlook. I use VML-based "bulletproof" buttons that retain their padding, borders, and colors regardless of the email client.</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#0f172a', fontWeight: 700, textAlign: 'center' }}>My Development Process</h2>
                        
                        <div style={{ position: 'relative', paddingLeft: '40px' }}>
                            {/* Line */}
                            <div style={{ position: 'absolute', left: '15px', top: '10px', bottom: '10px', width: '2px', background: '#e2e8f0' }}></div>
                            
                            <div style={{ position: 'relative', marginBottom: '3rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>1</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#0f172a' }}>Figma/PSD to Blueprint</h3>
                                <p style={{ color: '#475569', lineHeight: 1.6 }}>You send over your design files (Figma, Adobe XD, PSD, or even an image). I slice the assets, optimize all images for fast loading, and map out the table structure needed to achieve the layout.</p>
                            </div>

                            <div style={{ position: 'relative', marginBottom: '3rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>2</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#0f172a' }}>Hand-Coding & Logic Setup</h3>
                                <p style={{ color: '#475569', lineHeight: 1.6 }}>I write the HTML from scratch. If you're using Klaviyo, Mailchimp, or Shopify, I inject the specific dynamic tags (like <code>&#123;&#123; first_name &#125;&#125;</code> or abandoned cart product loops) directly into the code so it's ready to use immediately.</p>
                            </div>

                            <div style={{ position: 'relative', marginBottom: '3rem' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>3</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#0f172a' }}>Litmus & Real-Device Testing</h3>
                                <p style={{ color: '#475569', lineHeight: 1.6 }}>Before I deliver anything, the template is passed through Litmus or Email on Acid to test rendering across 40+ different devices, clients, and dark mode environments. I fix any anomalies manually.</p>
                            </div>

                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-40px', width: '32px', height: '32px', background: '#0ea5e9', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 2 }}>4</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#0f172a' }}>Delivery & Integration</h3>
                                <p style={{ color: '#475569', lineHeight: 1.6 }}>You receive clean, documented HTML files. If requested, I will log into your ESP directly and install the templates for you, ensuring they work seamlessly with your campaign builders.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Pricing data={data.pricing} />
            
            <FAQ data={data.faq} />

            <Contact />
            <Footer />
        </>
    );
}
