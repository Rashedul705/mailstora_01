import { pageMeta } from "@/lib/pageMeta";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import PageDecor from "../components/PageDecor";
import MidCTA from "../components/MidCTA";
import HomeContact from "../components/HomeContact";
import { siteConfig } from "../../utils/siteConfig";
import "../components/HomeSections.css";
import "./faq.css";
import HomeLink from "../components/HomeLink";

const { stats, upwork, founder } = siteConfig;
const URL = "https://mailstora.com/faq/";

const baseMetadata = (): Metadata => pageMeta("/faq/");

export async function generateMetadata(): Promise<Metadata> {
    return withSeo(baseMetadata());
}

type QA = { q: string; a: string; link?: { href: string; label: string } };
type Group = { id: string; title: string; items: QA[] };

const GROUPS = (): Group[] => [
    {
        id: "about",
        title: "About MailStora",
        items: [
            { q: "What is MailStora?", a: `MailStora is a founder-led HTML email development agency led by ${founder.name}. It builds hand-coded HTML email templates, HTML email signatures, Klaviyo automation flows and email campaigns for ecommerce brands and marketing agencies worldwide.` },
            { q: "Who is the founder of MailStora?", a: `${founder.name} founded MailStora. The founder is ${upwork.badge} on Upwork with ${stats.yearsExperience} years of HTML email experience, ${stats.upworkHours} Upwork hours, ${upwork.totalJobs} completed jobs and a ${upwork.jobSuccess} Job Success Score.`, link: { href: "/about/", label: "About the founder" } },
            { q: "Is MailStora an agency or a freelancer?", a: `MailStora is a founder-led email development agency. ${founder.name} started it after ${stats.yearsExperience} years of freelance email development and still leads and quality-checks every project, so clients get an agency process with senior expertise on every email.` },
            { q: "Where is MailStora based?", a: "MailStora is based in Bangladesh and works remotely with clients in the United States, United Kingdom, Europe, Australia and worldwide." },
            { q: "What industries do you work with?", a: "MailStora works with ecommerce and fashion brands, SaaS companies, real estate, travel, healthcare, education, nonprofits, events and marketing agencies." },
            { q: "How many email templates has MailStora built?", a: `MailStora has delivered ${stats.templatesBuilt} email templates for ${stats.clientsServed} clients worldwide.` },
            { q: "Can I see examples of your work?", a: "Yes. The portfolio shows HTML email templates, newsletters, transactional emails and signatures across many industries.", link: { href: "/portfolio/", label: "View the portfolio" } },
        ],
    },
    {
        id: "templates",
        title: "HTML Email Templates",
        items: [
            { q: "What is a custom HTML email template?", a: "A custom HTML email template is a reusable email layout written by hand in HTML and inline CSS for your brand, instead of taken from a drag-and-drop builder. It controls how your emails look in every inbox.", link: { href: "/html-email-template-development/", label: "HTML email template development" } },
            { q: "Why hand-code emails instead of using a builder?", a: "Hand-coded emails are lighter, render more reliably in Outlook and Gmail, avoid bloated code that triggers Gmail clipping, and can match any design exactly." },
            { q: "Why do email templates use tables?", a: "Many email clients, especially desktop Outlook, do not support modern CSS layout. Table-based HTML is the most reliable way to build layouts that render the same everywhere." },
            { q: "Are your email templates responsive?", a: "Yes. Every template is fully responsive, with columns that stack, images that scale and buttons that stay easy to tap on phones and tablets." },
            { q: "Do your templates support dark mode?", a: "Yes. Every template is checked in dark mode in Apple Mail, Gmail and Outlook, and logos, colours and text are adjusted so the email stays readable." },
            { q: "Can I edit the template myself after delivery?", a: "Yes. Templates are delivered with editable sections set up for your email platform, so your team can change text and images without touching code." },
            { q: "What design files do you accept?", a: "Figma, Photoshop (PSD), Adobe XD, Illustrator, Sketch, Canva and PDF files. If you only have a brand guide, the layout can be designed for you.", link: { href: "/figma-to-html-email/", label: "Figma and PSD to HTML email" } },
            { q: "Can you design the email as well as code it?", a: "Yes. MailStora can design the layout from your brand guide and then code it, or code a design your team has already created." },
            { q: "Do you build newsletter templates?", a: "Yes. Modular newsletter templates with reusable article, product, event and sponsor blocks are one of MailStora's core services.", link: { href: "/newsletter-email-templates/", label: "Newsletter email templates" } },
            { q: "Do you build transactional email templates?", a: "Yes. MailStora builds order confirmations, shipping updates, receipts, password resets and account emails for Shopify, SendGrid, Postmark and other platforms.", link: { href: "/transactional-email-templates/", label: "Transactional email templates" } },
            { q: "Are your templates accessible?", a: "Yes. Templates use live text, readable font sizes, colour contrast checks, alt text and proper roles, which also helps deliverability." },
        ],
    },
    {
        id: "outlook",
        title: "Outlook, Testing & Deliverability",
        items: [
            { q: "Why do emails break in Outlook?", a: "Desktop Outlook for Windows renders email with Microsoft Word's engine, which ignores many CSS features. Background images, padding, rounded buttons and some fonts break unless the email includes Outlook-specific code.", link: { href: "/outlook-email-rendering-fix/", label: "Email testing and Outlook fixes" } },
            { q: "Which email clients do you test in?", a: "Every email is tested in 50+ clients and devices, including Gmail, Outlook 2016, 2019, 365, the new Outlook, Outlook.com, Apple Mail, iOS Mail, Yahoo Mail and Samsung Email." },
            { q: "Can you fix an email that is already broken?", a: "Yes. MailStora tests existing emails, finds rendering bugs and fixes them with Outlook-safe techniques without changing your design." },
            { q: "What is VML in HTML email?", a: "VML (Vector Markup Language) is an older Microsoft format that desktop Outlook understands. It is used to show background images and rounded buttons in Outlook." },
            { q: "Why does Gmail clip my emails?", a: "Gmail clips emails with more than about 102KB of HTML and hides the rest behind a View entire message link. MailStora keeps code lean so emails display in full." },
            { q: "Do your emails help deliverability?", a: "Clean, lightweight code, a healthy image-to-text ratio, alt text and working links all support deliverability. Sending reputation and list quality also matter and depend on your platform setup." },
            { q: "Do you provide proof of testing?", a: "Yes. Testing and repair projects include before and after screenshots across email clients." },
        ],
    },
    {
        id: "klaviyo-esp",
        title: "Klaviyo, Mailchimp & HubSpot",
        items: [
            { q: "What is a Klaviyo flow?", a: "A Klaviyo flow is an automated series of emails or SMS triggered by customer behaviour, such as subscribing, abandoning a cart, browsing a product or placing an order.", link: { href: "/klaviyo-flow-setup/", label: "Klaviyo flow setup" } },
            { q: "Which Klaviyo flows should my store have?", a: "Most ecommerce stores need a welcome series, abandoned cart, browse abandonment and post-purchase flow first, followed by win-back and sunset flows." },
            { q: "Do you build Klaviyo email templates?", a: "Yes. Custom Klaviyo templates are built with Klaviyo's editable blocks, product feeds and template tags so your team can reuse them for campaigns and flows.", link: { href: "/klaviyo-email-templates/", label: "Klaviyo email templates" } },
            { q: "Do you manage Klaviyo and Mailchimp campaigns?", a: "Yes. MailStora plans, designs, builds, segments, tests and schedules campaigns in Klaviyo or Mailchimp, then reports on results.", link: { href: "/klaviyo-campaign-management/", label: "Campaign management" } },
            { q: "Can custom templates be edited in Mailchimp?", a: "Yes. Mailchimp templates are coded with mc:edit, mc:repeatable and mc:hideable regions so every section can be edited in Mailchimp's editor.", link: { href: "/mailchimp-email-templates/", label: "Mailchimp email templates" } },
            { q: "Do you build HubSpot email modules?", a: "Yes. MailStora builds HubSpot drag-and-drop templates with reusable HubL modules that marketers can use without breaking the brand.", link: { href: "/hubspot-email-templates/", label: "HubSpot email templates" } },
            { q: "Which email platforms do you support?", a: "Klaviyo, Mailchimp, HubSpot, Brevo, ActiveCampaign, Campaign Monitor, Constant Contact, Zoho Campaigns, Omnisend, MailerLite, Salesforce Marketing Cloud and most platforms that accept custom HTML." },
            { q: "Do I need to give you access to my email platform?", a: "For uploads, flows and campaigns, yes. You add MailStora as a user and keep full ownership of your account, data and templates." },
            { q: "Do you connect Klaviyo to Shopify?", a: "Yes. MailStora connects Klaviyo to Shopify or WooCommerce so flows can use cart, order and product data.", link: { href: "/shopify-development/", label: "Shopify development" } },
        ],
    },
    {
        id: "signatures",
        title: "HTML Email Signatures",
        items: [
            { q: "What is an HTML email signature?", a: "An HTML email signature is a branded block at the end of every email that includes your logo, photo, clickable contact links and social icons, built in HTML so it stays consistent across email clients.", link: { href: "/html-email-signature-design/", label: "HTML email signature design" } },
            { q: "Will my signature work in Gmail?", a: "Yes. Signatures are coded with Gmail-safe inline styles and hosted images, with a step-by-step Gmail install guide.", link: { href: "/gmail-email-signature/", label: "Gmail email signatures" } },
            { q: "Will my signature work in Outlook?", a: "Yes. Signatures use table-based HTML with fixed image sizes and are tested in classic Outlook, the new Outlook, Outlook on the web and mobile.", link: { href: "/outlook-email-signature/", label: "Outlook email signatures" } },
            { q: "Can you create signatures for my whole team?", a: "Yes. MailStora creates one master design with individual versions for every team member and supports rollout in Google Workspace and Microsoft 365." },
            { q: "Can my signature include a promotional banner?", a: "Yes. A clickable banner can be added and swapped for new campaigns, offers or events." },
            { q: "How much does an email signature cost?", a: "A simple HTML email signature starts at $25 and a signature with a banner is $65. Team packages are quoted per project." },
        ],
    },
    {
        id: "pricing",
        title: "Pricing & Payment",
        items: [
            { q: "How much does a custom HTML email template cost?", a: "A single custom HTML email template starts at $40. The Standard Package with 3 templates and 1 HTML signature is $149. Larger projects are quoted individually.", link: { href: "/pricing/", label: "See full pricing" } },
            { q: "Are there any subscriptions or hidden fees?", a: "No. Most services are one-time project fees with a clear quote before work starts. Monthly packages are optional for ongoing campaigns or social media." },
            { q: "How do I get a quote?", a: "Send your design, brief or website through the quote form and receive a clear price and timeline, usually within 24 hours.", link: { href: "/quote/", label: "Get a free quote" } },
            { q: "How do I pay?", a: "Projects can be paid directly or through Upwork, which protects both sides with milestone payments." },
            { q: "Do you offer discounts for multiple templates?", a: "Yes. Packages and multi-template projects cost less per template than single orders." },
            { q: "Do you offer monthly retainers?", a: "Yes. Agencies and brands with regular email work can book a monthly retainer with a set number of emails." },
        ],
    },
    {
        id: "process",
        title: "Process & Delivery",
        items: [
            { q: "How long does delivery take?", a: `Most HTML email templates and signatures are delivered in ${stats.turnaround}. Klaviyo flow setups and multi-email projects usually take 3 to 5 days.` },
            { q: "How does a project work?", a: "You share your requirements, the email is designed and coded, you review it and request changes, then you receive final, ESP-ready files." },
            { q: "How many revisions are included?", a: "Revision rounds are included in every package, and the Standard Package includes 3 rounds." },
            { q: "What files do I receive?", a: "You receive the HTML file with inline CSS, hosted image links, and the template uploaded to your email platform if requested." },
            { q: "Do you offer rush delivery?", a: "Yes, when the schedule allows. Mention your deadline in the quote request and it will be confirmed before work starts." },
            { q: "How do we communicate during the project?", a: "By email, WhatsApp, Upwork messages or your team's tools such as Slack, with replies usually within 2 to 4 hours." },
            { q: "Can I book a call before starting?", a: "Yes. You can book a free consultation to discuss your design, platform and goals.", link: { href: "/schedule/", label: "Book a consultation" } },
        ],
    },
    {
        id: "agencies",
        title: "Agencies & White Label",
        items: [
            { q: "Do you work with marketing agencies?", a: "Yes. MailStora is the email development partner for many agencies, handling templates, conversions, ESP builds and QA.", link: { href: "/white-label-email-development/", label: "White-label email development" } },
            { q: "Can you work under white label?", a: "Yes. Work is delivered with no MailStora branding in code, files or emails, and an NDA is available." },
            { q: "Can you work inside our clients' accounts?", a: "Yes. With user access, templates and flows are built directly in each client's Klaviyo, Mailchimp, HubSpot or other platform." },
        ],
    },
];

const TOTAL = GROUPS().reduce((n, g) => n + g.items.length, 0);

export default function FAQPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        url: URL,
        mainEntity: GROUPS().flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />
            <main className="main">
                <PageDecor />

                <section className="fq-hero" aria-labelledby="fq-title">
                    <div className="container">
                        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "FAQ", url: "/faq/" }]} />
                        <div className="fq-hero-inner">
                            <p className="fq-eyebrow">Help Center</p>
                            <h1 id="fq-title">
                                MailStora <span>Frequently Asked Questions</span>
                            </h1>
                            <p>
                                {TOTAL} answers about HTML email templates, Outlook compatibility, Klaviyo, Mailchimp and HubSpot,
                                email signatures, pricing and how projects work.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="fq-body" aria-label="Questions by topic">
                    <div className="container fq-layout">
                        <nav className="fq-nav" aria-label="FAQ topics">
                            <p>Topics</p>
                            <ul>
                                {GROUPS().map((g) => (
                                    <li key={g.id}>
                                        <a href={`#${g.id}`}>
                                            {g.title}
                                            <span>{g.items.length}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="fq-help">
                                <strong>Still have a question?</strong>
                                <span>Get a reply from the founder within a few hours.</span>
                                <a href={`https://wa.me/${founder.whatsapp}`} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
                            </div>
                        </nav>

                        <div className="fq-groups">
                            {GROUPS().map((g) => (
                                <section key={g.id} id={g.id} className="fq-group" aria-labelledby={`${g.id}-t`}>
                                    <h2 id={`${g.id}-t`}>{g.title}</h2>
                                    <div className="hs-faq-list">
                                        {g.items.map((f) => (
                                            <details key={f.q} className="hs-faq-item">
                                                <summary>
                                                    <h3>{f.q}</h3>
                                                    <span className="hs-faq-icon" aria-hidden="true" />
                                                </summary>
                                                <p>
                                                    {f.a}
                                                    {f.link && (
                                                        <>
                                                            {" "}
                                                            <Link href={f.link.href} className="fq-link">{f.link.label} →</Link>
                                                        </>
                                                    )}
                                                </p>
                                            </details>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </section>

                <HomeLink />

                <MidCTA
                    eyebrow="Didn't find your answer?"
                    title="Ask Us Directly and Get a Reply Within Hours"
                    text="Send your question or project details and get a free quote within 24 hours."
                    cta="Get a Free Quote"
                />
                <HomeContact />
            </main>
            <Footer />
        </>
    );
}
