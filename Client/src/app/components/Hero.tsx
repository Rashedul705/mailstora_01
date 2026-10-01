import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../../utils/siteConfig";
import "./Hero.css";

const HERO = () => ({
    eyebrow: `Founder-led · ${siteConfig.upwork.badge} on Upwork`,
    titleLead: "HTML Email Development Agency for Emails That Work in ",
    titleAccent: "Every Inbox",
    subtitle: `MailStora hand-codes responsive HTML email templates, Klaviyo flows and email signatures for ecommerce brands and marketing agencies, and helps them grow with SEO, AEO and GEO, performance marketing and Shopify development. Led by ${siteConfig.founder.name}, with ${siteConfig.stats.yearsExperience} years in email development and ${siteConfig.stats.templatesBuilt} templates delivered.`,
    primaryCta: { text: "Get a Quote", href: "/quote/" },
    secondaryCta: { text: "View Our Work", href: "/portfolio/" },
    features: [
        `${siteConfig.upwork.rating}/5 from ${siteConfig.upwork.reviews} Upwork reviews`,
        `${siteConfig.upwork.jobSuccess} Job Success`,
        "Tested in 50+ email clients",
        `${siteConfig.stats.turnaround} delivery`,
    ],
    image: {
        src: "/images/home/html-email-template-design-hero.webp",
        alt: "Responsive HTML email template shown on a laptop and phone, with Gmail, Outlook, Mailchimp, Klaviyo, Shopify, HubSpot and Zoho icons",
    },
});

// `data` (admin hero content) is accepted for API compatibility; copy is fixed here for SEO consistency.
export default function Hero({ data: _data }: { data?: unknown }) {
    const HERO_ = HERO();
    return (
        <section className="home-hero" aria-labelledby="home-hero-title">
            <div className="home-hero-media">
                <Image
                    src={HERO_.image.src}
                    alt={HERO_.image.alt}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1319px) 100vw, 1983px"
                    className="home-hero-img"
                />
            </div>

            <div className="container home-hero-inner">
                <div className="home-hero-content">
                    <p className="home-hero-eyebrow">{HERO_.eyebrow}</p>

                    <h1 id="home-hero-title" className="home-hero-title">
                        {HERO_.titleLead}
                        <span className="home-hero-accent">{HERO_.titleAccent}</span>
                    </h1>

                    <p className="home-hero-subtitle">{HERO_.subtitle}</p>

                    <div className="home-hero-actions">
                        <Link href={HERO_.primaryCta.href} className="home-hero-btn home-hero-btn--primary">
                            {HERO_.primaryCta.text}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </Link>
                        <Link href={HERO_.secondaryCta.href} className="home-hero-btn home-hero-btn--ghost">
                            {HERO_.secondaryCta.text}
                        </Link>
                    </div>

                    <ul className="home-hero-features">
                        {HERO_.features.map((feature) => (
                            <li key={feature}>
                                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                    <circle cx="12" cy="12" r="11" fill="currentColor" />
                                    <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
