import { pageMeta } from "@/lib/pageMeta";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import PageDecor from "../components/PageDecor";
import FounderBar from "../components/FounderBar";
import MidCTA from "../components/MidCTA";
import HomeContact from "../components/HomeContact";
import { SERVICE_GROUPS } from "../components/navData";
import { siteConfig } from "../../utils/siteConfig";
import "../components/HomeSections.css";
import "./about.css";
import HomeLink from "../components/HomeLink";

const { stats, upwork, founder } = siteConfig;
const URL = "https://mailstora.com/about/";

const baseMetadata = (): Metadata => pageMeta("/about/");

export async function generateMetadata(): Promise<Metadata> {
    return withSeo(baseMetadata());
}

const REASONS = () => [
    { title: "Specialists, not generalists", text: "We only do email. Every template is built by someone who knows every Outlook and Gmail quirk." },
    { title: "Founder-led quality", text: "Every project is led and signed off by our founder, with one senior point of contact from brief to delivery." },
    { title: "Tested in 50+ inboxes", text: "Every email is checked in Gmail, Outlook, Apple Mail and mobile apps before delivery." },
    { title: "Proven track record", text: `${upwork.jobSuccess} Job Success, ${upwork.rating}/5 across ${upwork.reviews} Upwork reviews and ${stats.templatesBuilt} templates.` },
];

// How a project moves from brief to delivery
const STEPS = [
    { title: "Brief and quote", text: "You send a design, brief or example. We confirm scope, platform, price and delivery date within 24 hours." },
    { title: "Build", text: "The email is hand-coded in table-based HTML with inline styles, set up for your platform's editor and merge tags." },
    { title: "Test", text: "Every email is checked in Gmail, Outlook (classic and new), Apple Mail, Yahoo and mobile apps, in light and dark mode." },
    { title: "Review", text: "You review a live preview. Revision rounds are included, and changes are made quickly." },
    { title: "Deliver and support", text: "Files are delivered or uploaded to your account. Rendering issues found within 30 days are fixed free." },
];

// The checks every email passes before delivery
const CHECKLIST = [
    "Table-based layout that holds in every Outlook version",
    "Bulletproof buttons and VML backgrounds for Outlook",
    "Responsive layout for phones and tablets",
    "Dark mode colours and logos checked",
    "Alt text, readable font sizes and colour contrast",
    "File size kept under Gmail's 102 KB clipping limit",
    "Every link, merge tag and tracking parameter tested",
    "Editable blocks set up for your email platform",
];

const PLATFORMS = [
    { title: "Email platforms", items: ["Klaviyo", "Mailchimp", "HubSpot", "Salesforce Marketing Cloud", "Brevo", "ActiveCampaign", "Campaign Monitor", "Omnisend"] },
    { title: "Design files", items: ["Figma", "Adobe Photoshop (PSD)", "Adobe XD", "Illustrator", "Sketch"] },
    { title: "Email clients tested", items: ["Gmail", "Outlook 2016 / 2019 / 365", "New Outlook", "Apple Mail", "iOS Mail", "Yahoo Mail", "Samsung Email"] },
    { title: "Ecommerce", items: ["Shopify", "WooCommerce", "Shopify notifications"] },
];

const CLIENTS = [
    { title: "Ecommerce brands", text: "Campaign templates, Klaviyo flows and transactional emails that match your store and sell." },
    { title: "Marketing agencies", text: "White-label email development under your brand, with NDA on request.", href: "/white-label-email-development/" },
    { title: "SaaS companies", text: "Onboarding, product update and transactional emails that stay on-brand." },
    { title: "Teams and businesses", text: "HTML email signatures rolled out across Gmail, Outlook and Microsoft 365.", href: "/html-email-signature-design/" },
];

const VALUES = [
    { title: "Quality over volume", text: "We take on work we can test properly. Nothing ships without passing the checklist." },
    { title: "Clear, honest pricing", text: "One-time project prices agreed up front. No subscriptions or surprise fees." },
    { title: "Fast communication", text: "Replies within hours, not days, and clear updates at every step." },
    { title: "Your files, your brand", text: "You own the final code. Client work stays confidential." },
];

const ABOUT_FAQS = () => [
    { q: "What is MailStora?", a: `MailStora is a founder-led HTML email development agency based in ${upwork.location}. It builds hand-coded HTML email templates, Klaviyo automation flows and HTML email signatures for ecommerce brands, SaaS companies and marketing agencies worldwide.` },
    { q: "Who founded MailStora?", a: `${founder.name} founded MailStora after ${stats.yearsExperience} years of HTML email development, ${stats.upworkHours} hours of client work on Upwork and a ${upwork.jobSuccess} Job Success Score.` },
    { q: "Where is MailStora based?", a: `MailStora is based in ${upwork.location} and works remotely with clients in the United States, United Kingdom, Europe, Australia and worldwide.` },
    { q: "Does MailStora only do email?", a: "Email is the core of the business: HTML templates, email signatures, Klaviyo flows and campaigns. MailStora also offers Shopify development and social media management for existing email clients." },
    { q: "How do I start working with MailStora?", a: "Request a free quote with your design or brief, or book a free consultation. You get a clear price and timeline within 24 hours." },
];

// First two links of each menu group: the core services
const SERVICES = [
    ...SERVICE_GROUPS.map((g) => ({ title: g.title, links: g.links.slice(0, 3) })),
    {
        title: "Growth Marketing",
        links: [
            { label: "SEO, AEO & GEO", href: "/seo-aeo-geo-services/" },
            { label: "Performance Marketing", href: "/performance-marketing/" },
            { label: "Shopify Development", href: "/shopify-development/" },
        ],
    },
];

const check = (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function AboutPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        url: URL,
        mainEntity: {
            "@type": ["Organization", "ProfessionalService"],
            "@id": "https://mailstora.com/#mailstora",
            name: "MailStora",
            url: "https://mailstora.com/",
            founder: { "@type": "Person", "@id": "https://mailstora.com/#founder", name: founder.name, jobTitle: "Founder & Lead Email Developer", sameAs: Object.values(founder.socials) },
        },
    };
    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: ABOUT_FAQS().map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    };
    const FACTS = [
        ["Name", "MailStora"],
        ["Type", "HTML email development agency"],
        ["Founder", founder.name],
        ["Based in", upwork.location],
        ["Serves", "Clients worldwide (US, UK, EU, Australia)"],
        ["Experience", `${stats.yearsExperience} years in email development`],
        ["Work delivered", `${stats.templatesBuilt} templates for ${stats.clientsServed} clients`],
        ["Upwork", `${upwork.badge}, ${upwork.jobSuccess} Job Success, ${upwork.rating}/5 from ${upwork.reviews} reviews`],
        ["Specialties", "HTML email templates, Klaviyo flows, email signatures, Outlook fixes"],
        ["Typical delivery", `${stats.turnaround} for a single template`],
    ];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <Navbar />
            <main className="main">
                <PageDecor />
                <PageHero
                    eyebrow="About MailStora"
                    title={<>About MailStora: Email Developers Who <span>Only Do Email</span></>}
                    lead="MailStora is a founder-led HTML email development agency that builds HTML emails, Klaviyo automation and email signatures that work in every inbox."
                    crumbs={[{ label: "Home", url: "/" }, { label: "About", url: "/about/" }]}
                />

                {/* ── Who we are ── */}
                <section className="ab-section" aria-labelledby="ab-who">
                    <div className="container ab-who">
                        <div className="ab-who-media">
                            <Image src="/images/media/cropped/service-html-email-templates.webp" alt="HTML email templates built by MailStora" width={517} height={517} sizes="(max-width: 1024px) 90vw, 460px" />
                            <div className="ab-who-badge">
                                <strong>{stats.yearsExperience}</strong>
                                <span>years in email</span>
                            </div>
                        </div>
                        <div>
                            <p className="home-eyebrow">Who We Are</p>
                            <h2 id="ab-who" className="hs-title hs-title--left">A Specialist Email Agency With a <span>Narrow Focus</span></h2>
                            <p className="ab-body">
                                MailStora started with one skill: making emails that look right in every inbox. Today we help
                                ecommerce brands, SaaS companies and marketing agencies ship HTML emails that are fast to edit
                                and never break, and we support the rest of their growth with SEO, AEO and GEO, performance
                                marketing on Meta, TikTok, Google and ChatGPT, Shopify development and social media.
                            </p>
                            <p className="ab-body">
                                Email remains our specialism. The growth services exist because they feed it: search and ads
                                bring the visitors, and our email flows turn them into customers. Every project is led and
                                quality-checked by our founder, so you always have one senior point of contact.
                            </p>
                            <ul className="ab-stats">
                                <li><strong>{stats.templatesBuilt}</strong><span>Templates delivered</span></li>
                                <li><strong>{stats.clientsServed}</strong><span>Clients worldwide</span></li>
                                <li><strong>{upwork.jobSuccess}</strong><span>Job Success</span></li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ── Our story ── */}
                <section className="ab-section ab-alt" aria-labelledby="ab-story">
                    <div className="container ab-story">
                        <div>
                            <p className="home-eyebrow">Our Story</p>
                            <h2 id="ab-story" className="hs-title hs-title--left">From One Email Developer to a <span>Specialist Agency</span></h2>
                            <p className="ab-body">
                                {founder.name} started building HTML emails more than {stats.yearsExperience.replace("+", "")} years ago, at a time
                                when getting one layout to work in Outlook, Gmail and Apple Mail meant hours of trial and error. That
                                problem never went away: email clients still render code differently, and most drag-and-drop builders
                                break the moment a brand needs something custom.
                            </p>
                            <p className="ab-body">
                                Over {stats.upworkHours} hours of client work on Upwork, {upwork.totalJobs} completed jobs and a{" "}
                                {upwork.jobSuccess} Job Success Score, one pattern was clear. Brands and agencies did not need another
                                general web developer. They needed a team that only does email and gets it right the first time.
                            </p>
                            <p className="ab-body">
                                MailStora was built for that. Today it delivers hand-coded templates, Klaviyo automation and email
                                signatures with a documented build and testing process, while {founder.name} still leads and
                                quality-checks every project.
                            </p>
                        </div>
                        <aside className="ab-facts" aria-label="MailStora at a glance">
                            <h3>MailStora at a Glance</h3>
                            <dl>
                                {FACTS.map(([k, v]) => (
                                    <div key={k}>
                                        <dt>{k}</dt>
                                        <dd>{v}</dd>
                                    </div>
                                ))}
                            </dl>
                        </aside>
                    </div>
                </section>

                {/* ── How we work ── */}
                <section className="ab-section" aria-labelledby="ab-how">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">How We Work</p>
                            <h2 id="ab-how" className="hs-title">A Clear Process From <span>Brief to Inbox</span></h2>
                            <p className="hs-subtitle">Every project follows the same five steps, so you always know what happens next.</p>
                        </header>
                        <ol className="ab-steps">
                            {STEPS.map((s, i) => (
                                <li key={s.title}>
                                    <span className="ab-num">{String(i + 1).padStart(2, "0")}</span>
                                    <h3>{s.title}</h3>
                                    <p>{s.text}</p>
                                </li>
                            ))}
                        </ol>

                        <div className="ab-checklist">
                            <h3>Our Quality Checklist</h3>
                            <p>Every email passes these checks before it reaches you.</p>
                            <ul>
                                {CHECKLIST.map((c) => (
                                    <li key={c}>{check}<span>{c}</span></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ── Why MailStora ── */}
                <section className="ab-section ab-alt" aria-labelledby="ab-why">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">Why MailStora</p>
                            <h2 id="ab-why" className="hs-title">Why Brands Choose <span>MailStora</span></h2>
                        </header>
                        <ul className="ab-grid ab-grid--4">
                            {REASONS().map((r, i) => (
                                <li key={r.title} className={`ab-card ab-card--${i % 2 ? "green" : "orange"}`}>
                                    <span className="ab-num">{String(i + 1).padStart(2, "0")}</span>
                                    <h3>{r.title}</h3>
                                    <p>{r.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ── What we do ── */}
                <section className="ab-section" aria-labelledby="ab-what">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">What We Do</p>
                            <h2 id="ab-what" className="hs-title">Services We <span>Provide</span></h2>
                        </header>
                        <ul className="ab-grid ab-grid--3">
                            {SERVICES.map((g) => (
                                <li key={g.title} className="ab-service">
                                    <h3>{g.title}</h3>
                                    <ul>
                                        {g.links.map((l) => (
                                            <li key={l.href}>
                                                {check}
                                                <Link href={l.href}>{l.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        <p className="ab-center">
                            <Link href="/services/" className="home-btn-primary">View All Services</Link>
                        </p>
                    </div>
                </section>

                {/* ── Platforms and tools ── */}
                <section className="ab-section ab-alt" aria-labelledby="ab-tools">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">Platforms &amp; Tools</p>
                            <h2 id="ab-tools" className="hs-title">Platforms We <span>Work With</span></h2>
                        </header>
                        <ul className="ab-grid ab-grid--4">
                            {PLATFORMS.map((p) => (
                                <li key={p.title} className="ab-service">
                                    <h3>{p.title}</h3>
                                    <ul>
                                        {p.items.map((x) => <li key={x}>{check}<span>{x}</span></li>)}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ── Who we work with ── */}
                <section className="ab-section" aria-labelledby="ab-clients">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">Who We Work With</p>
                            <h2 id="ab-clients" className="hs-title">Built for Brands, Agencies <span>and Teams</span></h2>
                        </header>
                        <ul className="ab-grid ab-grid--4">
                            {CLIENTS.map((c, i) => (
                                <li key={c.title} className={`ab-card ab-card--${i % 2 ? "green" : "orange"}`}>
                                    <h3>{c.href ? <Link href={c.href}>{c.title}</Link> : c.title}</h3>
                                    <p>{c.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ── Mission and vision ── */}
                <section className="ab-section ab-alt" aria-label="Mission and vision">
                    <div className="container ab-mv">
                        <article className="ab-mv-card">
                            <p className="ab-mv-label">Our Mission</p>
                            <h2>Every email should look exactly as designed, in every inbox.</h2>
                            <p>We hand-code and test every email so brands never lose a customer to a broken layout.</p>
                        </article>
                        <article className="ab-mv-card ab-mv-card--light">
                            <p className="ab-mv-label">Our Vision</p>
                            <h2>To be the email team growing brands and agencies trust first.</h2>
                            <p>A reliable partner for design, code and automation, so our clients can focus on growth.</p>
                        </article>
                    </div>
                </section>

                {/* ── Values ── */}
                <section className="ab-section" aria-labelledby="ab-values">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">Our Values</p>
                            <h2 id="ab-values" className="hs-title">What We <span>Stand For</span></h2>
                        </header>
                        <ul className="ab-grid ab-grid--4">
                            {VALUES.map((v, i) => (
                                <li key={v.title} className="ab-card">
                                    <span className="ab-num">{String(i + 1).padStart(2, "0")}</span>
                                    <h3>{v.title}</h3>
                                    <p>{v.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <FounderBar />

                {/* ── About FAQ ── */}
                <section className="ab-section ab-alt" aria-labelledby="ab-faq">
                    <div className="container ab-faq">
                        <header className="hs-header">
                            <p className="home-eyebrow">About MailStora</p>
                            <h2 id="ab-faq" className="hs-title">Questions About <span>MailStora</span></h2>
                        </header>
                        {ABOUT_FAQS().map((f) => (
                            <details key={f.q}>
                                <summary>{f.q}</summary>
                                <p>{f.a}</p>
                            </details>
                        ))}
                        <p className="ab-center"><Link href="/faq/">See all FAQs</Link></p>
                    </div>
                </section>
                <HomeLink />
                <MidCTA eyebrow="Work with MailStora" title="Let's Build Emails That Work Everywhere" text="Share your project and get a free quote within 24 hours." cta="Get a Free Quote" />
                <HomeContact />
            </main>
            <Footer />
        </>
    );
}
