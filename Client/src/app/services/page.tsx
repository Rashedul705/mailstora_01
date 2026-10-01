import { pageMeta } from "@/lib/pageMeta";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import LogoStrip from "../components/LogoStrip";
import HomeProcess from "../components/HomeProcess";
import MidCTA from "../components/MidCTA";
import HomeReviews from "../components/HomeReviews";
import HomeFAQ from "../components/HomeFAQ";
import HomeContact from "../components/HomeContact";
import PageDecor from "../components/PageDecor";
import FounderBar from "../components/FounderBar";
import { siteConfig } from "../../utils/siteConfig";
import "../components/HomeSections.css";
import "./services.css";
import HomeLink from "../components/HomeLink";

const { stats, upwork } = siteConfig;
const IMG = "/images/media/cropped/";
const URL = "https://mailstora.com/services/";

const baseMetadata = (): Metadata => pageMeta("/services/");

export async function generateMetadata(): Promise<Metadata> {
    return withSeo(baseMetadata());
}

type Spoke = { name: string; href: string; text: string };
type Cluster = {
    id: string;
    eyebrow: string;
    title: string;
    text: string;
    hub: { name: string; href: string; price: string; image: string; alt: string; points: string[] };
    spokes: Spoke[];
};

const CLUSTERS: Cluster[] = [
    {
        id: "email-development",
        eyebrow: "Email Development",
        title: "HTML Email Template Development",
        text: "Hand-coded, responsive HTML emails that render correctly in Gmail, Outlook, Apple Mail and every mobile app.",
        hub: {
            name: "Custom HTML Email Templates",
            href: "/html-email-template-development/",
            price: "From $40",
            image: IMG + "service-html-email-templates.webp",
            alt: "Custom HTML email template on laptop and phone",
            points: ["Table-based, hand-coded HTML", "Tested in 50+ email clients", "Editable blocks for your ESP"],
        },
        spokes: [
            { name: "Figma & PSD to HTML Email", href: "/figma-to-html-email/", text: "Figma, Photoshop, XD and Illustrator designs coded into pixel-perfect HTML email." },
            { name: "Newsletter Email Templates", href: "/newsletter-email-templates/", text: "Reusable, modular newsletter templates your team can fill in every week." },
            { name: "Transactional Email Templates", href: "/transactional-email-templates/", text: "Order, shipping, password and account emails that are clear and on-brand." },
            { name: "Email Testing & Outlook Fixes", href: "/outlook-email-rendering-fix/", text: "Broken emails tested in 50+ clients and repaired for Outlook and dark mode." },
        ],
    },
    {
        id: "klaviyo-esp",
        eyebrow: "Klaviyo & ESP",
        title: "Klaviyo and Email Platform Services",
        text: "Automation flows, campaigns and platform-ready templates for Klaviyo, Mailchimp and HubSpot.",
        hub: {
            name: "Klaviyo Flow Setup",
            href: "/klaviyo-flow-setup/",
            price: "Custom quote",
            image: IMG + "service-klaviyo-automation-flows.webp",
            alt: "Klaviyo automation flow diagram",
            points: ["Welcome, cart and post-purchase flows", "Smart triggers and dynamic products", "Branded, hand-coded flow emails"],
        },
        spokes: [
            { name: "Klaviyo & Mailchimp Campaigns", href: "/klaviyo-campaign-management/", text: "Campaigns planned, designed, segmented, tested and scheduled for you." },
            { name: "Klaviyo Email Templates", href: "/klaviyo-email-templates/", text: "Custom templates built with Klaviyo's editable blocks and dynamic content." },
            { name: "Mailchimp Email Templates", href: "/mailchimp-email-templates/", text: "Coded Mailchimp templates with editable regions and merge tags." },
            { name: "HubSpot Email Templates", href: "/hubspot-email-templates/", text: "Drag-and-drop HubSpot templates with custom, reusable modules." },
        ],
    },
    {
        id: "email-signatures",
        eyebrow: "Email Signatures",
        title: "HTML Email Signature Design",
        text: "Clickable, on-brand signatures for individuals and whole teams, built for every email client.",
        hub: {
            name: "HTML Email Signatures",
            href: "/html-email-signature-design/",
            price: "From $25",
            image: IMG + "service-html-email-signatures.webp",
            alt: "HTML email signature with photo and social icons",
            points: ["Clickable links and social icons", "Retina-sharp logos and photos", "Company-wide rollout support"],
        },
        spokes: [
            { name: "Gmail Email Signatures", href: "/gmail-email-signature/", text: "HTML signatures for Gmail and Google Workspace, with install guide." },
            { name: "Outlook Email Signatures", href: "/outlook-email-signature/", text: "Signatures for new and classic Outlook, Microsoft 365 and Outlook mobile." },
        ],
    },
];

const MORE: Spoke[] = [
    { name: "White-Label Email Development", href: "/white-label-email-development/", text: "HTML email production for agencies, delivered under your brand." },
    { name: "Shopify Store Development", href: "/shopify-development/", text: "Theme customisation, speed work and Klaviyo integration for Shopify stores." },
    { name: "Social Media Management", href: "/social-media-management/", text: "Branded posts, captions and scheduling aligned with your email campaigns." },
    { name: "SEO, AEO and GEO", href: "/seo-aeo-geo-services/", text: "Technical and on-page SEO plus answer engine and AI search optimisation." },
    { name: "Performance Marketing", href: "/performance-marketing/", text: "Meta, TikTok, Google and ChatGPT ads with tracking and email follow-up." },
];

const FAQS = () => [
    { q: "What services does MailStora offer?", a: "MailStora offers custom HTML email template development, Figma and PSD to HTML email conversion, email testing and Outlook fixes, Klaviyo flow setup, Klaviyo and Mailchimp campaign management, Klaviyo, Mailchimp and HubSpot templates, HTML email signatures, and white-label email development for agencies." },
    { q: "How much do MailStora services cost?", a: `HTML email signatures start at $25 and custom HTML email templates start at $40. Klaviyo flows, campaigns, Shopify and social media work are quoted per project after a free consultation.` },
    { q: "How fast can you deliver?", a: `Most email templates and signatures are delivered in ${stats.turnaround}. Klaviyo flow setups and multi-email projects usually take 3 to 5 days.` },
    { q: "Which service do I need?", a: "If you have a design, choose Figma to HTML. If you need a design and code, choose HTML Email Templates. If you want automated emails in Klaviyo, choose Klaviyo Flow Setup. If you are not sure, book a free consultation." },
    { q: "Do you work with agencies?", a: "Yes. MailStora builds email templates, signatures and Klaviyo setups for marketing agencies, including under white label with no MailStora branding." },
    { q: "What is the difference between an HTML email template and Klaviyo flow setup?", a: "An HTML email template is the design and code of a single reusable email. Klaviyo flow setup builds the automation around several emails, including triggers, delays, filters and dynamic product content." },
    { q: "Which email platforms do your templates work with?", a: "MailStora templates work with Klaviyo, Mailchimp, HubSpot, Brevo, ActiveCampaign, Campaign Monitor, Omnisend and most platforms that accept custom HTML, and are tested in Gmail, Outlook, Apple Mail and Yahoo Mail." },
    { q: "Are all MailStora emails responsive and tested in Outlook?", a: "Yes. Every template, campaign and signature is hand-coded with table-based HTML, is fully responsive on mobile and is tested in 50+ email clients, including every current version of Outlook and dark mode." },
    { q: "Can I combine several services in one project?", a: "Yes. Many clients combine a template design, Figma to HTML conversion and Klaviyo flow setup in one project, with one quote, one timeline and one point of contact." },
    { q: "Who does the work?", a: `Every project is handled by ${siteConfig.founder.name}, MailStora's founder, a ${upwork.badge} Upwork freelancer with ${stats.yearsExperience} years of experience and a ${upwork.jobSuccess} Job Success Score.` },
];

// Icons floating in the hero: envelope, paper plane, code, @, check, star, inbox, bell
const FLOATS = [
    "M3 5h18v14H3zM3 7l9 6 9-6",
    "M22 2L11 13M22 2l-7 20-4-9-9-4z",
    "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",
    "M20 6L9 17l-5-5",
    "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z",
    "M22 12h-6l-2 3h-4l-2-3H2M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z",
    "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
];

const arrow = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);
const check = (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

async function getJSON(path: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"}${path}`, { cache: "no-store" });
        return res.ok ? await res.json() : null;
    } catch {
        return null;
    }
}

export default async function ServicesPage() {
    const [testimonials, clientLogos] = await Promise.all([getJSON("/api/testimonials"), getJSON("/api/trust-logos")]);

    const all = [...CLUSTERS.flatMap((c) => [{ name: c.hub.name, href: c.hub.href }, ...c.spokes]), ...MORE];
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "MailStora Services",
        url: URL,
        description: baseMetadata().description,
        mainEntity: {
            "@type": "ItemList",
            itemListElement: all.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: `https://mailstora.com${s.href}` })),
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />
            <main className="main">
                <PageDecor />

                {/* ── Hero ── */}
                <section className="sv-hero" aria-labelledby="sv-title">
                    {/* Background photo under a dark overlay (swap the file to change it) */}
                    <Image
                        src="/images/home/html-email-template-design-hero.webp"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="sv-hero-bg"
                    />
                    <span className="sv-hero-overlay" aria-hidden="true" />
                    <div className="sv-hero-float" aria-hidden="true">
                        {FLOATS.map((f, i) => (
                            <span key={i} className={`sv-float sv-float--${i + 1}`}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d={f} />
                                </svg>
                            </span>
                        ))}
                    </div>
                    <div className="container sv-hero-content">
                        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Services", url: "/services/" }]} />
                        <div className="sv-hero-inner">
                            <p className="sv-hero-eyebrow">MailStora Services</p>
                            <h1 id="sv-title">
                                Email Development Services <span>for Brands and Agencies</span>
                            </h1>
                            <p className="sv-hero-lead">
                                Custom HTML email templates, Klaviyo automation and HTML email signatures, hand-coded by a
                                founder-led specialist agency and tested in every inbox. Pick a service below or get a free quote in 24 hours.
                            </p>
                            <div className="sv-hero-actions">
                                <Link href="/quote/" className="home-btn-primary">Get a Free Quote {arrow}</Link>
                                <Link href="/schedule/" className="sv-btn-light">Book a Free Consultation</Link>
                            </div>
                            <ul className="sv-hero-stats">
                                <li><strong>{stats.templatesBuilt}</strong><span>Templates delivered</span></li>
                                <li><strong>{stats.yearsExperience}</strong><span>Years of experience</span></li>
                                <li><strong>{upwork.jobSuccess}</strong><span>Upwork Job Success</span></li>
                                <li><strong>{stats.turnaround}</strong><span>Typical delivery</span></li>
                            </ul>
                        </div>
                        <nav className="sv-jump" aria-label="Service categories">
                            {CLUSTERS.map((c) => (
                                <a key={c.id} href={`#${c.id}`}>{c.eyebrow}</a>
                            ))}
                            <a href="#more-services">More Services</a>
                        </nav>
                    </div>
                </section>

                <LogoStrip clients={Array.isArray(clientLogos) ? clientLogos : []} />

                {/* ── Clusters ── */}
                {CLUSTERS.map((c, ci) => (
                    <section key={c.id} id={c.id} className={`sv-cluster${ci % 2 ? " sv-cluster--alt" : ""}`} aria-labelledby={`${c.id}-title`}>
                        <div className="container">
                            <header className="sv-cluster-head">
                                <p className="home-eyebrow">{c.eyebrow}</p>
                                <h2 id={`${c.id}-title`} className="hs-title hs-title--left">{c.title}</h2>
                                <p className="hs-subtitle hs-subtitle--left">{c.text}</p>
                            </header>

                            <div className="sv-cluster-body">
                                <article className="sv-hub">
                                    <div className="sv-hub-media">
                                        <Image src={c.hub.image} alt={c.hub.alt} width={517} height={517} sizes="(max-width: 1024px) 90vw, 420px" />
                                        <span className="sv-hub-price">{c.hub.price}</span>
                                    </div>
                                    <div className="sv-hub-copy">
                                        <p className="sv-hub-tag">Main service</p>
                                        <h3>{c.hub.name}</h3>
                                        <ul>
                                            {c.hub.points.map((p) => (
                                                <li key={p}>{check}{p}</li>
                                            ))}
                                        </ul>
                                        <Link href={c.hub.href} className="home-btn-primary">View Service {arrow}</Link>
                                    </div>
                                </article>

                                <ul className="sv-spokes">
                                    {c.spokes.map((s) => (
                                        <li key={s.href}>
                                            <Link href={s.href} className="sv-spoke">
                                                <h3>{s.name}</h3>
                                                <p>{s.text}</p>
                                                <span className="sv-spoke-more">Learn more {arrow}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                ))}

                {/* ── More services ── */}
                <section id="more-services" className="sv-more" aria-labelledby="sv-more-title">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">More Services</p>
                            <h2 id="sv-more-title" className="hs-title">For Agencies and <span>Ecommerce Brands</span></h2>
                        </header>
                        <ul className="sv-more-grid">
                            {MORE.map((s) => (
                                <li key={s.href}>
                                    <Link href={s.href} className="sv-spoke">
                                        <h3>{s.name}</h3>
                                        <p>{s.text}</p>
                                        <span className="sv-spoke-more">Learn more {arrow}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <FounderBar />
                <HomeProcess />
                <HomeLink />
                <MidCTA
                    eyebrow="Not sure where to start?"
                    title="Tell Us What You Need and We Will Recommend the Right Service"
                    text="Share your design, platform or goal and get a free quote and plan within 24 hours."
                    cta="Get a Free Quote"
                />
                <HomeReviews reviews={Array.isArray(testimonials?.data) ? testimonials.data : []} />
                <HomeFAQ faqs={FAQS()} heading={<>MailStora Services <span>FAQs</span></>} intro="Answers about services, pricing, delivery and who does the work." />
                <HomeContact />
            </main>
            <Footer />
        </>
    );
}
