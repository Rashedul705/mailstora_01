import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactComponent from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";

export const metadata: Metadata = {
    title: "Schedule a Consultation | MailStora",
    description: "Book a 15-minute intro call to discuss your agency's white-label needs, Shopify development project, or Klaviyo retainer.",
    alternates: {
        canonical: "https://mailstora.com/schedule"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Schedule a Call', url: '/schedule' }
];

export default async function SchedulePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://mailstora.com/schedule/#webpage",
        "url": "https://mailstora.com/schedule",
        "name": "Schedule a Call",
        "description": "Book a consultation call with MailStora.",
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Schedule a Consultation</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
                            Looking for a white-label partner or a custom monthly retainer? Let's discuss your needs.
                        </p>
                    </div>
                </div>
            </section>

            <ContactComponent />

            <Footer />
        </>
    );
}
