import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactComponent from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";

export const metadata: Metadata = {
    title: "Get a Free Quote for HTML Email Development | MailStora",
    description: "Upload your Figma or PSD file for a free, no-obligation quote on custom HTML email development or signature design.",
    alternates: {
        canonical: "https://mailstora.com/quote"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Get a Quote', url: '/quote' }
];

export default async function QuotePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": "https://mailstora.com/quote/#webpage",
        "url": "https://mailstora.com/quote",
        "name": "Get a Quote",
        "description": "Request a quote for email development services.",
        "isPartOf": { "@id": "https://mailstora.com/#website" }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            
            <section className="sp-hero" style={{ paddingTop: '140px', paddingBottom: '40px', background: '#0f172a', color: '#fff' }}>
                <div className="container">
                    <Breadcrumb items={breadcrumbItems} />
                    <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto', marginTop: '2rem' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Get a Free Quote</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
                            Ready to turn your design into code? Fill out the form below and we'll get back to you within 24 hours.
                        </p>
                    </div>
                </div>
            </section>

            <ContactComponent />

            <Footer />
        </>
    );
}
