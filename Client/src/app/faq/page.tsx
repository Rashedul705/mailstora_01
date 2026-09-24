import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQComponent from "../components/FAQ";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Frequently Asked Questions | MailStora",
    description: "Answers to common questions about our HTML email coding process, pricing, turnaround times, and ESP integrations.",
    alternates: {
        canonical: "https://mailstora.com/faq"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'FAQ', url: '/faq' }
];

const generalFaqs = [
    {
        q: "What is your standard turnaround time?",
        a: "Our standard turnaround time is 24 to 48 hours for a standard email template. Complex flows or multiple templates will take longer, but we will always give you a firm deadline upfront."
    },
    {
        q: "Do you offer rush delivery?",
        a: "Yes. If you have an urgent campaign, select the Rush option on our quote form. Depending on capacity, we can often deliver within 12 hours for an additional fee."
    },
    {
        q: "What design files do you accept?",
        a: "We accept Figma, PSD, Adobe XD, Sketch, Illustrator, and even high-res PDFs. Figma is our preferred format."
    },
    {
        q: "How do you handle revisions?",
        a: "If the HTML does not match the approved design, or if there is a rendering issue in a supported client, we fix it for free. If you decide to change the design after the HTML is coded, minor changes are free, but major structural changes will be billed."
    },
    {
        q: "Do you test your emails?",
        a: "Yes, every single email is tested using Litmus across 30+ email clients and devices, including various versions of Outlook, Gmail, Apple Mail, and Yahoo."
    },
    {
        q: "Do you offer white-label services for agencies?",
        a: "Yes, we work with many marketing agencies under strict NDAs, operating as their invisible in-house email development team."
    }
];

export default async function FAQPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://mailstora.com/faq/#webpage",
        "url": "https://mailstora.com/faq",
        "name": "Frequently Asked Questions",
        "isPartOf": { "@id": "https://mailstora.com/#website" },
        "mainEntity": generalFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Frequently Asked Questions</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
                            Everything you need to know about our services, process, and pricing.
                        </p>
                    </div>
                </div>
            </section>

            <FAQComponent data={generalFaqs} />

            <section className="section" style={{ background: '#f8fafc', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Still have questions?</h2>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>We're happy to discuss your specific project needs.</p>
                    <Link href="/contact" className="btn btn-primary">Contact Us</Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
