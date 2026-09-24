import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Trust from "../components/Trust";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Client Reviews & Testimonials | MailStora",
    description: "Read reviews from our 200+ clients. 100% Job Success Score and Top Rated Plus on Upwork for HTML email development.",
    alternates: {
        canonical: "https://mailstora.com/reviews"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Reviews', url: '/reviews' }
];

export default async function ReviewsPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://mailstora.com/reviews/#webpage",
        "url": "https://mailstora.com/reviews",
        "name": "Client Reviews",
        "description": "Reviews and testimonials for MailStora.",
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>What Our Clients Say</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            We let our code and our clients do the talking. Read verified reviews from our Upwork and direct agency partners.
                        </p>
                    </div>
                </div>
            </section>

            <Trust />

            <section className="section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem' }}>Want to see our actual work?</h2>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '10px' }}>Visit our portfolio to see before-and-after conversions of Figma designs to HTML.</p>
                        <Link href="/portfolio" className="btn btn-primary" style={{ marginTop: '1.5rem', padding: '15px 30px' }}>View Portfolio</Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
