import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ICONS } from "./LogoStrip";
import { BRAND } from "./ServiceVisual";
import "./HomeServices.css";

type Accent = "orange" | "green";

const iconProps = {
    width: 34,
    height: 34,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

const SERVICES: { title: string; description: string; points: string[]; image: string; cta: string; secondary: string; href: string; accent: Accent; icon: ReactNode }[] = [
    {
        title: "HTML Email Templates",
        description: "Custom-coded templates for newsletters, promos and transactional emails that render in every inbox.",
        points: ["Hand-coded, table-based HTML", "Fully responsive on any device", "Dark mode friendly styling", "Tested in 50+ email clients", "Ready for any ESP or CRM"],
        image: "/images/media/cropped/service-html-email-templates.webp",
        cta: "Get a Template Quote",
        secondary: "View Templates",
        href: "/html-email-template-development/",
        accent: "orange",
        icon: (
            <svg {...iconProps}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 6 10-6" />
                <path d="M9 15.5l-1.5 1.5L9 18.5M15 15.5l1.5 1.5-1.5 1.5" />
            </svg>
        ),
    },
    {
        title: "HTML Email Signatures",
        description: "Clickable, on-brand signatures for individuals and teams that work in Gmail, Outlook and Apple Mail.",
        points: ["Clickable links and social icons", "Works in Gmail and Outlook", "Retina-ready logos and photos", "Company-wide rollout support", "Easy install guide included"],
        image: "/images/media/cropped/service-html-email-signatures.webp",
        cta: "Order a Signature",
        secondary: "See Signatures",
        href: "/html-email-signature-design/",
        accent: "green",
        icon: (
            <svg {...iconProps}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <circle cx="8" cy="10" r="2" />
                <path d="M5 16c.6-1.4 1.7-2 3-2s2.4.6 3 2M14 9h5M14 12h5M14 15h3" />
            </svg>
        ),
    },
    {
        title: "Klaviyo Automation Flows",
        description: "Welcome, abandoned cart and post-purchase flows built in Klaviyo with branded, editable templates.",
        points: ["Welcome and nurture series", "Abandoned cart and browse flows", "Post-purchase and win-back", "Smart triggers and filters", "Branded, editable templates"],
        image: "/images/media/cropped/service-klaviyo-automation-flows.webp",
        cta: "Set Up My Flows",
        secondary: "Explore Flows",
        href: "/klaviyo-flow-setup/",
        accent: "orange",
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 4h18l-4.5 7L21 18H3z" fill="#1a1a1a" />
            </svg>
        ),
    },
    {
        title: "Klaviyo & Mailchimp Campaigns",
        description: "Campaign emails designed, built and scheduled in Klaviyo or Mailchimp, with segments and A/B tests.",
        points: ["Campaign design and build", "Audience segments and lists", "A/B subject line testing", "Scheduling and send setup", "Clear performance reports"],
        image: "/images/media/cropped/service-klaviyo-mailchimp-campaigns.webp",
        cta: "Plan My Campaign",
        secondary: "See Campaigns",
        href: "/klaviyo-campaign-management/",
        accent: "green",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#241C15" aria-hidden="true">
                <path d={BRAND.mailchimp} />
            </svg>
        ),
    },
    {
        title: "Figma & PSD to HTML Email",
        description: "Your Figma, PSD or XD designs turned into responsive HTML emails with pixel-perfect accuracy.",
        points: ["Figma, PSD, XD and AI files", "Pixel-perfect design match", "Lightweight, fast-loading code", "Mobile layouts included", "Editable modules for your ESP"],
        image: "/images/media/cropped/service-figma-psd-to-html-email.webp",
        cta: "Convert My Design",
        secondary: "How It Works",
        href: "/figma-to-html-email/",
        accent: "orange",
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#F24E1E" aria-hidden="true">
                <path d={BRAND.figma} />
            </svg>
        ),
    },
    {
        title: "Email Testing & Outlook Fixes",
        description: "Emails tested across 50+ clients and devices, with Outlook, dark mode and layout issues fixed.",
        points: ["Testing in 50+ email clients", "Outlook rendering fixes", "Dark mode issue repairs", "Broken layout clean-ups", "Before and after reports"],
        image: "/images/media/cropped/service-email-testing-outlook-fixes.webp",
        cta: "Fix My Emails",
        secondary: "See Our Testing",
        href: "/outlook-email-rendering-fix/",
        accent: "green",
        icon: (
            <svg {...iconProps}>
                <path d="M4 4h16v12H4z" />
                <path d="M8 20h8M12 16v4" />
                <path d="M8.5 10l2.5 2.5 4.5-4.5" />
            </svg>
        ),
    },
];

const EXTRA_SERVICES: { title: string; description: string; points: string[]; href: string; cta: string; secondary: string; accent: Accent; icon: ReactNode }[] = [
    {
        title: "Shopify Store Development",
        description: "Custom Shopify stores and theme tweaks that load fast, look on-brand and connect cleanly to Klaviyo for email and SMS.",
        points: ["Custom theme setup and edits", "Speed and mobile optimisation", "Klaviyo and app integrations", "Product and collection pages"],
        href: "/shopify-development/",
        cta: "Build My Store",
        secondary: "See Shopify Work",
        accent: "green",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#95BF47" aria-hidden="true">
                <path d={ICONS.shopify} />
            </svg>
        ),
    },
    {
        title: "Social Media Management",
        description: "Planned, on-brand social content for ecommerce brands, with posts, captions and scheduling handled so your feed stays active.",
        points: ["Monthly content calendar", "Branded post and story designs", "Captions and hashtags", "Scheduling and reporting"],
        href: "/social-media-management/",
        cta: "Grow My Socials",
        secondary: "How It Works",
        accent: "orange",
        icon: (
            <svg {...iconProps}>
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
            </svg>
        ),
    },
    {
        title: "SEO, AEO and GEO",
        description: "Get found on Google and cited in AI answers, with technical SEO, on-page SEO, content and answer engine optimisation.",
        points: ["Technical and on-page SEO", "Answer engine optimisation (AEO)", "AI search visibility (GEO)", "Monthly plain-English reports"],
        href: "/seo-aeo-geo-services/",
        cta: "Get My Free SEO Audit",
        secondary: "How It Works",
        accent: "green",
        icon: (
            <svg {...iconProps}>
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-5-5M8 11h6M11 8v6" />
            </svg>
        ),
    },
    {
        title: "Performance Marketing",
        description: "Meta, TikTok, Google and ChatGPT ads with accurate tracking, creative testing and email follow-up that turns clicks into customers.",
        points: ["Meta and TikTok ads", "Google and ChatGPT ads", "Pixel and Conversions API tracking", "ROAS and CPA reporting"],
        href: "/performance-marketing/",
        cta: "Get My Free Ads Review",
        secondary: "How It Works",
        accent: "orange",
        icon: (
            <svg {...iconProps}>
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M15 7h6v6" />
            </svg>
        ),
    },
];

function Arrow({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

export default function HomeServices() {
    return (
        <section className="home-services" id="services" aria-labelledby="home-services-title">
            <div className="container">
                <header className="home-services-header">
                    <p className="home-services-eyebrow">Our Services</p>
                    <h2 id="home-services-title" className="home-services-title">
                        HTML Email Development <span>Services for Brands &amp; Agencies</span>
                    </h2>
                    <p className="home-services-subtitle">
                        From custom campaign emails to complex <strong>automation templates</strong>, we build emails that{" "}
                        <strong>look great</strong> and perform even better.
                    </p>
                </header>

                <ul className="home-services-grid">
                    {SERVICES.map((service, i) => (
                        <li key={service.title} style={{ "--i": i } as CSSProperties}>
                            <article className={`home-services-card home-services-card--${service.accent}`}>
                                <span className="home-services-body">
                                    <span className="home-services-icon">{service.icon}</span>
                                    <h3 className="home-services-card-title">{service.title}</h3>
                                    <p className="home-services-card-text">{service.description}</p>
                                    <ul className="home-services-points">
                                        {service.points.slice(0, 5).map((point) => (
                                            <li key={point}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                                                    <circle cx="12" cy="12" r="11" fill="currentColor" />
                                                    <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                    <span className="home-services-actions">
                                        <Link href={`/quote/?service=${encodeURIComponent(service.title)}`} className="home-services-btn home-services-btn--primary">
                                            {service.cta}
                                            <Arrow size={16} />
                                        </Link>
                                        <Link href={service.href} className="home-services-btn home-services-btn--ghost">
                                            {service.secondary}
                                        </Link>
                                    </span>
                                </span>
                                <span className="home-services-media">
                                    <Image
                                        src={service.image}
                                        alt={`${service.title} by MailStora`}
                                        fill
                                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 260px, 340px"
                                        className="home-services-img"
                                    />
                                </span>
                            </article>
                        </li>
                    ))}
                </ul>

                <div className="home-services-extra">
                    <h3 className="home-services-extra-title">Additional Services</h3>
                    <ul className="home-services-extra-grid">
                        {EXTRA_SERVICES.map((service) => (
                            <li key={service.title}>
                                <article className={`home-services-card home-services-card--compact home-services-card--${service.accent}`}>
                                    <span className="home-services-body">
                                        <span className="home-services-icon">{service.icon}</span>
                                        <h4 className="home-services-card-title">{service.title}</h4>
                                        <p className="home-services-card-text">{service.description}</p>
                                        <ul className="home-services-points">
                                            {service.points.map((point) => (
                                                <li key={point}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                                                    <circle cx="12" cy="12" r="11" fill="currentColor" />
                                                    <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                        <span className="home-services-actions">
                                            <Link href={`/quote/?service=${encodeURIComponent(service.title)}`} className="home-services-btn home-services-btn--primary">
                                                {service.cta}
                                                <Arrow size={16} />
                                            </Link>
                                            <Link href={service.href} className="home-services-btn home-services-btn--ghost">
                                                {service.secondary}
                                            </Link>
                                        </span>
                                    </span>
                                </article>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
