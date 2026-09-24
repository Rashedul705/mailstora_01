import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Trust from "../components/Trust";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: "About MailStora — Expert HTML Email Developer",
    description: "Learn about MailStora. With over 13 years of experience, 16k+ Upwork hours, and a 100% Job Success Score, we are your trusted email development partner.",
    alternates: {
        canonical: "https://mailstora.com/about"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about' }
];

export default async function AboutPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "https://mailstora.com/about/#webpage",
        "url": "https://mailstora.com/about",
        "name": "About MailStora",
        "description": "Information about MailStora's founder and experience.",
        "isPartOf": { "@id": "https://mailstora.com/#website" },
        "mainEntity": {
            "@type": "Person",
            "@id": "https://mailstora.com/about/#person",
            "name": "Rashedul Islam",
            "jobTitle": "Expert HTML Email Developer",
            "worksFor": { "@id": "https://mailstora.com/#organization" }
        }
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Hi, I'm Rashedul.</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            I founded MailStora after seeing how many beautiful designs were ruined by bad HTML coding. For over a decade, I've dedicated myself to mastering the dark art of email rendering.
                        </p>
                    </div>
                </div>
            </section>

            <Trust />

            <section className="section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>13+ Years of Specialization</h2>
                            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                                MailStora isn't a massive, faceless agency that outsources your work to juniors. It is a specialized, founder-led consultancy. When you hire MailStora, you are getting code written and vetted by an expert with over 16,000 logged hours on Upwork alone.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                                I built my reputation by fixing the Outlook rendering bugs that other web developers couldn't figure out. Today, MailStora partners with leading ecommerce brands and marketing agencies around the world, delivering over 400 pixel-perfect templates.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem' }}>
                                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}><span style={{ color: '#14a800', marginRight: '10px', fontSize: '1.2rem' }}>★</span> <strong>Top Rated Plus on Upwork</strong></li>
                                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}><span style={{ color: '#14a800', marginRight: '10px', fontSize: '1.2rem' }}>★</span> <strong>100% Job Success Score</strong></li>
                                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}><span style={{ color: '#14a800', marginRight: '10px', fontSize: '1.2rem' }}>★</span> <strong>200+ Happy Clients Worldwide</strong></li>
                            </ul>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <h3 style={{ marginBottom: '1rem' }}>The MailStora Promise</h3>
                                <p style={{ color: '#475569', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                                    "I believe that if you approve a design in Figma, it should look exactly like that in the inbox—whether the user is on an iPhone 14 or Outlook 2016. No compromises, no excuses."
                                </p>
                                <Link href="/quote" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>Work With Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
