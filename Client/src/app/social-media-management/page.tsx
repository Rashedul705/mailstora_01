import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Breadcrumb from "../components/Breadcrumb";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Social Media Management & Strategy | MailStora",
    description: "Grow your online presence with done-for-you social media management. Content creation, scheduling, and community engagement for modern brands.",
    alternates: {
        canonical: "https://mailstora.com/social-media-management"
    }
};

const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Social Media Management', url: '/social-media-management' }
];

const socialFaqs = [
    {
        q: "Which platforms do you manage?",
        a: "We primarily focus on Instagram, Facebook, LinkedIn, and X (Twitter), tailoring the strategy to where your specific audience spends their time."
    },
    {
        q: "Do you create the content?",
        a: "Yes. We can design graphics, write compelling captions, and edit short-form video (Reels/Shorts) based on raw assets provided by your team."
    },
    {
        q: "Will you respond to comments and messages?",
        a: "Yes, community management is a core part of our service. We monitor your inboxes and comment sections to foster engagement and handle basic customer inquiries."
    },
    {
        q: "How do we review posts before they go live?",
        a: "We provide a content calendar (usually via an approval tool or spreadsheet) one to two weeks in advance. Nothing is published without your explicit approval."
    }
];

export default async function SocialMediaManagementPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://mailstora.com/social-media-management/#service",
        "name": "Social Media Management",
        "serviceType": "Social media marketing and management",
        "description": "Comprehensive social media management including content creation, scheduling, and community engagement.",
        "provider": { "@id": "https://mailstora.com/#organization" },
        "areaServed": "Worldwide",
        "audience": { "@type": "BusinessAudience", "audienceType": "Growing Brands" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "500",
            "url": "https://mailstora.com/social-media-management/"
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
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Social Media Management & Growth</h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                            Turn your social channels into active communities. We handle the strategy, content creation, scheduling, and daily engagement so you can focus on your business.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <Link href="/quote" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Get a Free Proposal</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Consistent Presence, Without the Stress</h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
                            A dormant social media page is a red flag to potential customers. But maintaining a high-quality, consistent posting schedule requires hours of work every week. We take over the day-to-day operations of your social channels, ensuring your brand stays top-of-mind.
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem', marginTop: '3rem' }}>
                            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px' }}>
                                <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Content Creation</h3>
                                <p style={{ color: '#475569' }}>Eye-catching graphics, on-brand copywriting, and strategic hashtags designed to educate, entertain, and convert your followers.</p>
                            </div>
                            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px' }}>
                                <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Publishing & Scheduling</h3>
                                <p style={{ color: '#475569' }}>We utilize data to post at the exact times your specific audience is most active online, maintaining a calendar you approve in advance.</p>
                            </div>
                            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px' }}>
                                <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Community Management</h3>
                                <p style={{ color: '#475569' }}>Actively responding to comments, answering DMs, and engaging with relevant accounts in your niche to foster organic growth.</p>
                            </div>
                            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px' }}>
                                <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Analytics & Reporting</h3>
                                <p style={{ color: '#475569' }}>Monthly reports detailing reach, engagement rates, and follower growth, allowing us to continuously refine our strategy.</p>
                            </div>
                        </div>

                        <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '12px', textAlign: 'center', marginTop: '3rem', color: '#fff' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Omnichannel Marketing</h2>
                            <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                                The best results come when social media and email marketing work together. We align your social content calendar with your Klaviyo campaigns for maximum impact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            <FAQ data={socialFaqs} />

            <Contact />
            <Footer />
        </>
    );
}
