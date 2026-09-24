import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactComponent from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";

export const metadata: Metadata = {
    title: "Contact MailStora — HTML Email Experts",
    description: "Have a question about our email development services, or need a custom white-label retainer? Contact MailStora today.",
    alternates: {
        canonical: "https://mailstora.com/contact"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Contact Us', url: '/contact' }
];

export default async function ContactPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": "https://mailstora.com/contact/#webpage",
        "url": "https://mailstora.com/contact",
        "name": "Contact MailStora",
        "description": "Contact MailStora for inquiries.",
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Contact Us</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
                            Have a question or need to discuss a custom retainer? Reach out below.
                        </p>
                    </div>
                </div>
            </section>

            <ContactComponent />

            <Footer />
        </>
    );
}
