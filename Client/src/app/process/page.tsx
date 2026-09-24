import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Our Process — How We Code HTML Emails | MailStora",
    description: "Learn about our strict 5-step process for converting designs into HTML emails. From asset extraction to Litmus QA testing and ESP integration.",
    alternates: {
        canonical: "https://mailstora.com/process"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Our Process', url: '/process' }
];

export default async function ProcessPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://mailstora.com/process/#webpage",
        "url": "https://mailstora.com/process",
        "name": "Our Process",
        "description": "How MailStora develops and tests HTML emails.",
        "isPartOf": { "@id": "https://mailstora.com/#website" }
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>How We Build Bulletproof Emails</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            We don't use automated converters or basic drag-and-drop tools. We follow a strict, manual 5-step development process.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ position: 'relative', paddingLeft: '40px' }}>
                            
                            {/* Step 1 */}
                            <div style={{ marginBottom: '4rem', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-40px', top: '0', width: '30px', height: '30px', background: '#ff6b00', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Asset Extraction & Prep</h2>
                                <p style={{ fontSize: '1.1rem', color: '#475569' }}>
                                    We start by reviewing your Figma, PSD, or XD file. We identify custom fonts, extract exact hex colors, and manually slice images. All raster images are exported at <strong>2x resolution</strong> to ensure they remain crisp on high-DPI (Retina) displays like iPhones. We optimize these images using TinyPNG algorithms to keep the file size low.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div style={{ marginBottom: '4rem', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-40px', top: '0', width: '30px', height: '30px', background: '#ff6b00', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Table-Based HTML Coding</h2>
                                <p style={{ fontSize: '1.1rem', color: '#475569' }}>
                                    This is where the magic happens. We build the structure entirely out of nested HTML <code>&lt;table&gt;</code> elements. We don't use CSS Grid or Flexbox, because they fail in Outlook. Every padding, margin, and alignment is calculated meticulously using table cells.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div style={{ marginBottom: '4rem', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-40px', top: '0', width: '30px', height: '30px', background: '#ff6b00', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Outlook Ghost Tables & VML</h2>
                                <p style={{ fontSize: '1.1rem', color: '#475569' }}>
                                    To satisfy the Microsoft Word rendering engine used by desktop Outlook, we inject MSO conditional comments (<code>&lt;!--[if mso]&gt;</code>). This allows us to feed Outlook specific "Ghost Tables" for layout, and Microsoft Vector Markup Language (VML) for background images, while modern clients ignore them.
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div style={{ marginBottom: '4rem', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-40px', top: '0', width: '30px', height: '30px', background: '#ff6b00', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>4</div>
                                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>ESP Integration</h2>
                                <p style={{ fontSize: '1.1rem', color: '#475569' }}>
                                    Once the raw HTML is solid, we inject your specific platform's template language. This means adding <code>mc:edit</code> tags for Mailchimp, HubSpot's HubL logic, or Klaviyo's specific blocks so your marketing team can edit the template without breaking the code.
                                </p>
                            </div>

                            {/* Step 5 */}
                            <div style={{ marginBottom: '4rem', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-40px', top: '0', width: '30px', height: '30px', background: '#ff6b00', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>5</div>
                                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Litmus QA Testing</h2>
                                <p style={{ fontSize: '1.1rem', color: '#475569' }}>
                                    Before delivering, we run the code through Litmus. This generates physical screenshots of the email on over 30 different devices and clients, including iOS Mail, Gmail (Web and App), and Outlook 2016-2021 on Windows. We also run a Dark Mode inversion check.
                                </p>
                            </div>

                        </div>

                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>Start Your Project</Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
