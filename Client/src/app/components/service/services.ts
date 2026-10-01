// Content for every service page, keyed by URL slug.
// Each page names the entity (the service), its attributes (facts) and values, and links back into the
// homepage service network through `related`. Figures come from siteConfig so they stay consistent.
import { siteConfig } from "../../../utils/siteConfig";
import { RICH, EXTRA_FAQS } from "./richContent";
import { SPOKES } from "./spokes";
import { GROWTH } from "./growth";
import type { ServiceCard } from "./growthCards";

const { stats, upwork, founder } = siteConfig;
const IMG = "/images/media/cropped/";

export type Fact = { label: string; value: string };
type Item = { title: string; text: string };
export type RichContent = {
    // Keyword-focused eyebrow + H2 for every section on the page
    labels: {
        pains: [string, string];
        benefits: string;
        projects: [string, string, string];
        overview: string;
        process: [string, string];
        related: [string, string, string];
    };
    cta: { eyebrow: string; title: string; text: string; button: string };
    cta2: { eyebrow: string; title: string; text: string; button: string; href?: string };
    intro: { eyebrow: string; titleLead: string; titleAccent: string; text: string[]; image?: string; alt?: string; image2?: string; alt2?: string; features: Item[] };
    pains: { title: string; subtitle: string; items: Item[] };
    offer: { title: string; text: string; priceLabel: string; price: string; priceNote: string; cta: string; image?: string; alt?: string; items: string[] };
    benefits: { titleLead: string; titleAccent: string; subtitle: string; items: Item[] };
    projects: { subtitle: string; items: { src: string; alt: string; caption: string }[] };
};

export type ServiceData = {
    rich?: RichContent; // optional long-form layout (split intro, pain points, offer, benefits, projects)
    name: string;
    serviceType: string;
    summary: string; // one line, used in related-service cards
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1Lead: string;
    h1Accent: string;
    lead: string;
    cta: string;
    trust: string[];
    heroImage?: string;
    heroAlt: string;
    whatTitle: string;
    what: string[];
    facts: Fact[];
    priceFrom?: string;
    includedTitle: string;
    included: { title: string; text: string }[];
    galleryTitle: string;
    gallery: { src: string; alt: string; caption: string }[];
    processLabel: string;
    process: { title: string; text: string }[];
    platformsTitle: string;
    platformsEyebrow?: string;
    platformsSubtitle?: string;
    platforms: string[];
    showWork: boolean;
    showPricing: boolean;
    related: string[];
    faqIntro: string;
    faqs: { q: string; a: string }[];
    cards?: ServiceCard[]; // sub-service cards shown in a 2-column grid
    category?: string; // schema category, defaults to Email development
};

const founderLine = `${founder.name}, MailStora's founder (${stats.yearsExperience} years, ${upwork.jobSuccess} Job Success on Upwork)`;
const ESPS = ["Klaviyo", "Mailchimp", "HubSpot", "Brevo", "ActiveCampaign", "Campaign Monitor", "Constant Contact", "Zoho Campaigns", "Omnisend", "MailerLite", "Salesforce Marketing Cloud"];
const CLIENTS = ["Gmail", "Outlook 2016 / 2019 / 365", "New Outlook", "Apple Mail", "iOS Mail", "Yahoo Mail", "Samsung Email", "Outlook.com"];

export const SERVICES: Record<string, ServiceData> = {
    "html-email-template-development": {
        rich: {
            labels: {
                pains: ["Common HTML Email Problems", "Email Template Problems That Cost You Sales"],
                benefits: "Why Choose MailStora for HTML Emails",
                projects: ["HTML Email Template Portfolio", "Custom HTML Email Templates", "We Have Built"],
                overview: "HTML Email Template Basics",
                process: ["HTML Email Development Process", "How We Build Your HTML Email Template"],
                related: ["Related Email Development Services", "More Email Services", "From MailStora"],
            },
            cta: {
                eyebrow: "Custom HTML Email Templates",
                title: "Get a Hand-Coded Email Template That Works in Every Inbox",
                text: `Send your design or brand guide and get a free quote within 24 hours. Templates from $40, delivered in ${stats.turnaround}.`,
                button: "Get a Template Quote",
            },
            cta2: {
                eyebrow: "Free Template Consultation",
                title: "Not Sure What Your Email Template Needs?",
                text: "Book a free call with the founder to review your design, email platform and goals before you commit.",
                button: "Book a Free Consultation",
                href: "/schedule/",
            },
            intro: {
                eyebrow: "Custom Email Template Design",
                titleLead: "Custom Email Template Design",
                titleAccent: "Without Builder Limits",
                text: [
                    "Templates from drag-and-drop builders all look alike and break the moment they meet Outlook. A custom HTML email template is designed around your brand, content and goals, then hand-coded so it renders the same in every inbox.",
                    "MailStora turns your Figma, PSD or brand guide into a reusable, editable template for Klaviyo, Mailchimp, HubSpot or any email platform, so every newsletter, promotion and automated email looks on-brand without extra design work.",
                ],
                image: "/images/media/generated/html-email-template-development-intro.webp",
                alt: "A generic drag-and-drop builder template compared with a custom branded HTML email template",
                image2: "/images/media/generated/html-email-template-development-phone.webp",
                alt2: "Custom HTML email template shown on a phone in dark mode",
                features: [
                    { title: "Full design freedom", text: "Any layout, font pairing or section your brand needs, not just what a builder allows." },
                    { title: "Tailored to your audience", text: "Content blocks planned around your products, offers and customer journey." },
                    { title: "Better performance", text: "Lightweight code loads fast, avoids clipping in Gmail and supports deliverability." },
                    { title: "Advanced functionality", text: "Dynamic product blocks, merge tags, conditional content and dark mode support." },
                ],
            },
            pains: {
                title: "Email Template Problems That Cost You Sales",
                subtitle: "Most brands we work with came to us after one of these problems started costing them clicks and sales.",
                items: [
                    { title: "Every email looks like a template", text: "Your emails look the same as every other brand using the same builder themes." },
                    { title: "Designs fall apart in the inbox", text: "What you approved in Figma looks broken in Outlook, Gmail or on mobile." },
                    { title: "DIY templates keep breaking", text: "Every small edit shifts spacing, breaks columns or hides images." },
                    { title: "Pre-made templates limit you", text: "Store-bought templates never quite fit your products, content or brand." },
                ],
            },
            offer: {
                title: "Custom HTML Email Template Package",
                text: "A pixel-perfect HTML email template built from your design or brand guide, tested in 50+ email clients and ready to reuse in your email platform.",
                priceLabel: "Starting at",
                price: "$40",
                priceNote: "per template, one-time",
                cta: "Get a Template Quote",
                image: "/images/media/generated/html-email-template-development-offer.webp",
                alt: "Custom HTML email template package from $40: hand-coded, Outlook-safe, dark mode checked and editable in your email platform",
                items: [
                    "Hand-coded, table-based HTML",
                    "Fully responsive on phones and tablets",
                    "Tested in Gmail, Outlook, Apple Mail and 50+ clients",
                    "Dark mode colour and logo checks",
                    "Editable blocks for Klaviyo, Mailchimp or HubSpot",
                    "Accessible code with alt text",
                    "Optimised images for fast loading",
                    `Delivered in ${stats.turnaround}`,
                ],
            },
            benefits: {
                titleLead: "HTML Email Template Development",
                titleAccent: "Without the Headaches",
                subtitle: "Working with MailStora is simple: one developer, clear communication and templates that work the first time.",
                items: [
                    { title: "Direct access to the developer", text: `You work with ${founder.name} himself, from brief to final revision.` },
                    { title: "Fast, predictable turnaround", text: `Most templates are delivered in ${stats.turnaround}, with no missed deadlines.` },
                    { title: "Revisions included", text: "Revision rounds are built into every package, so you get exactly what you approved." },
                    { title: "Clean, reusable code", text: "Modular sections your team can reuse for every future campaign." },
                    { title: "Clear communication", text: "Quick replies on WhatsApp, email or Upwork, and updates at every step." },
                    { title: "Easy to work with", text: `A founder-led agency, ${upwork.badge} on Upwork and rated ${upwork.rating}/5 across ${upwork.reviews} reviews.` },
                    { title: "Risk-free engagement", text: "A clear price and timeline before work starts, with no hidden fees." },
                    { title: "Consistently dependable", text: `${upwork.jobSuccess} Job Success Score and ${stats.templatesBuilt} templates delivered.` },
                ],
            },
            projects: {
                subtitle: "A selection of HTML email templates built for fashion, retail, SaaS, travel and more.",
                items: [
                    { src: IMG + "mailstora-fashion-email.webp", alt: "Fashion collection email template", caption: "Fashion launch" },
                    { src: IMG + "mailstora-black-friday-email.webp", alt: "Black Friday sale email template", caption: "Black Friday sale" },
                    { src: IMG + "mailstora-real-estate-email.webp", alt: "Real estate listing email template", caption: "Real estate listing" },
                    { src: IMG + "mailstora-welcome-email.webp", alt: "SaaS welcome email template", caption: "SaaS welcome" },
                    { src: IMG + "mailstora-christmas-email.webp", alt: "Christmas holiday email template", caption: "Holiday campaign" },
                    { src: IMG + "mailstora-weekly-newsletter-email.webp", alt: "Weekly newsletter email template", caption: "Weekly newsletter" },
                    { src: IMG + "travel-hospitality-email-design.webp", alt: "Travel email template", caption: "Travel promotion" },
                    { src: IMG + "mailstora-order-confirmation-email.webp", alt: "Order confirmation email template", caption: "Order confirmation" },
                ],
            },
        },
        name: "HTML Email Template Development",
        serviceType: "HTML email template development",
        summary: "Hand-coded, responsive HTML email templates that render in every inbox.",
        metaTitle: "HTML Email Template Development Agency | MailStora",
        metaDescription: `HTML email template development by MailStora: hand-coded, responsive templates tested in Outlook, Gmail and Apple Mail. ESP-ready, from $40, in ${stats.turnaround}.`,
        eyebrow: "HTML Email Templates",
        h1Lead: "HTML Email Template Development,",
        h1Accent: "Hand-Coded for Every Inbox",
        lead: "MailStora builds responsive HTML email templates from your design or brand guide, using clean table-based code that renders reliably in Gmail, Outlook, Apple Mail and mobile apps, and arrives ready to edit in your email platform.",
        cta: "Get a Template Quote",
        trust: [`Delivered in ${stats.turnaround}`, "Tested in 50+ email clients", "Dark mode ready", `${stats.templatesBuilt} templates built`],
        heroImage: "/images/media/generated/service-html-email-templates-hero.webp",
        heroAlt: "Hand-coded HTML email template: the HTML code, the finished email on laptop and phone, checked in Gmail, Outlook, Apple Mail and Yahoo, and ready for Klaviyo, Mailchimp, HubSpot and Shopify",
        whatTitle: "What Is a Custom HTML Email Template?",
        what: [
            "A custom HTML email template is a reusable email layout written by hand in HTML and inline CSS, built specifically for your brand instead of taken from a drag-and-drop builder. It controls how your newsletters, promotions and transactional emails look in every inbox.",
            `At MailStora, every template is led and quality-checked by ${founderLine}. Templates use table-based layouts, bulletproof buttons and Outlook-specific fixes, and every section is set up as an editable block in your email service provider, so your team can reuse it without touching code.`,
        ],
        facts: [
            { label: "Starting price", value: "$40 per template" },
            { label: "Delivery time", value: stats.turnaround },
            { label: "Design input", value: "Figma, PSD, XD, Sketch, PDF or brand guide" },
            { label: "Code", value: "Table-based HTML with inline CSS" },
            { label: "Testing", value: "50+ email clients, light and dark mode" },
            { label: "Platforms", value: "Klaviyo, Mailchimp, HubSpot and more" },
            { label: "Revisions", value: "Included with every package" },
        ],
        priceFrom: "40",
        includedTitle: "Everything Your Template Needs to Perform",
        included: [
            { title: "Hand-coded, table-based HTML", text: "Clean, lightweight code with inline CSS that email clients render consistently, with no builder bloat." },
            { title: "Fully responsive layout", text: "Columns stack, images scale and buttons stay tappable on phones and tablets." },
            { title: "Outlook and dark mode fixes", text: "VML backgrounds, MSO conditional code and dark mode colour checks keep the design intact." },
            { title: "Editable ESP blocks", text: "Sections are set up as editable modules in Klaviyo, Mailchimp, HubSpot or your platform." },
            { title: "Cross-client testing", text: "Every template is checked in Gmail, Outlook, Apple Mail, Yahoo and mobile apps before delivery." },
            { title: "Accessible, spam-safe code", text: "Alt text, semantic roles and a healthy image-to-text ratio help deliverability and readability." },
        ],
        galleryTitle: "HTML Email Templates We Have Built",
        gallery: [
            { src: IMG + "mailstora-fashion-email.webp", alt: "Fashion new collection HTML email template", caption: "Fashion launch email" },
            { src: IMG + "mailstora-black-friday-email.webp", alt: "Black Friday sale HTML email template", caption: "Black Friday promo" },
            { src: IMG + "mailstora-weekly-newsletter-email.webp", alt: "Weekly newsletter HTML email template", caption: "Weekly newsletter" },
            { src: IMG + "mailstora-order-confirmation-email.webp", alt: "Order confirmation transactional email template", caption: "Order confirmation" },
        ],
        processLabel: "Template",
        process: [
            { title: "Share your design", text: "Send a Figma, PSD or PDF file, or a brand guide if you need the layout designed too." },
            { title: "Hand-coding", text: "The template is coded in table-based HTML with responsive and dark mode support." },
            { title: "Testing and QA", text: "It is tested in 50+ email clients and devices, and every issue is fixed before delivery." },
            { title: "Delivery and setup", text: "You receive the HTML file, and it can be uploaded to your ESP with editable blocks." },
        ],
        platformsEyebrow: "HTML Email Template Compatibility",
        platformsTitle: "HTML Email Templates for Every ESP and Inbox",
        platformsSubtitle: "Every custom HTML email template is coded for your email platform and tested in the email clients your subscribers use, from Gmail and Outlook to Apple Mail.",
        platforms: ESPS,
        showWork: false, // the Examples gallery already shows this work
        showPricing: true,
        related: ["figma-to-html-email", "outlook-email-rendering-fix", "klaviyo-campaign-management", "html-email-signature-design"],
        faqIntro: "Answers about custom HTML email templates: price, delivery time, Outlook support and editing.",
        faqs: [
            { q: "How much does a custom HTML email template cost?", a: "A single custom HTML email template from MailStora starts at $40. The Standard Package includes 3 templates and 1 HTML email signature for $149, and larger design systems are quoted per project." },
            { q: "How long does it take to build an HTML email template?", a: `Most custom HTML email templates are delivered within ${stats.turnaround}. Projects with several templates or a full design system usually take a few extra days.` },
            { q: "Will the template work in Outlook?", a: "Yes. Every template uses table-based HTML with Outlook-specific VML and MSO conditional code, and is tested in Outlook 2016, 2019, 365 and the new Outlook before delivery." },
            { q: "Can I edit the template myself after delivery?", a: "Yes. Sections are set up as editable blocks in your email platform, such as Klaviyo, Mailchimp or HubSpot, so you can change text and images without touching code." },
            { q: "What design files do you accept?", a: "MailStora accepts Figma, PSD, Adobe XD, Sketch, Illustrator and PDF files. If you only have a brand guide, the layout can be designed for you and coded in one package." },
            { q: "Are the templates mobile responsive and dark mode friendly?", a: "Yes. Every HTML email template is fully responsive on phones and tablets and is checked in dark mode so colours, logos and text stay readable." },
            { q: "What is the difference between a custom and a pre-made email template?", a: "A pre-made template is a generic layout shared by many brands, while a custom HTML email template is designed and coded around your brand, content and email platform. Custom templates look unique, render more reliably and are easier for your team to reuse." },
            { q: "Do you design the email template or only code it?", a: "Both. MailStora can code your existing Figma or PSD design, or design the layout from your brand guide and then code it as one package." },
            { q: "Will the template work in Klaviyo, Mailchimp and HubSpot?", a: "Yes. The template is set up for your platform, including Klaviyo, Mailchimp, HubSpot, Brevo, ActiveCampaign and Campaign Monitor, with editable sections and the correct merge tags." },
            { q: "How many revisions are included?", a: "Revision rounds are included with every template package, and the Standard Package includes 3 rounds, so the final email matches the design you approved." },
            { q: "Do you build transactional and automated email templates?", a: "Yes. MailStora builds order confirmations, shipping updates, password resets, welcome series and abandoned cart templates, as well as newsletters and promotional campaigns." },
            { q: "Can you work with agencies under white label?", a: "Yes. MailStora builds HTML email templates for marketing agencies under white label, with no MailStora branding in the files you deliver to your clients." },
        ],
    },

    "html-email-signature-design": {
        name: "HTML Email Signature Design",
        serviceType: "HTML email signature design",
        summary: "Clickable, on-brand email signatures for individuals and whole teams.",
        metaTitle: "HTML Email Signature Design Service | MailStora",
        metaDescription: "HTML email signature design for individuals and teams: clickable, on-brand signatures for Gmail, Outlook and Apple Mail, with install guides. From $25.",
        eyebrow: "HTML Email Signatures",
        h1Lead: "HTML Email Signature Design",
        h1Accent: "That Works Everywhere",
        lead: "MailStora designs clickable, on-brand HTML email signatures for individuals and teams, with your logo, photo, contact links and social icons, built to look sharp in Gmail, Outlook and Apple Mail on desktop and mobile.",
        cta: "Order a Signature",
        trust: ["From $25", "Gmail, Outlook and Apple Mail", "Install guide included", "Team rollout support"],
        heroImage: "/images/media/generated/html-email-signature-design-hero.webp",
        heroAlt: "HTML email signature in Gmail on a laptop, one signature for the whole team, working in Gmail, Outlook, Apple Mail and Yahoo",
        whatTitle: "What Is an HTML Email Signature?",
        what: [
            "An HTML email signature is the branded block at the end of every email you send, built in HTML so it can include your logo, photo, clickable phone, email and website links, social icons and a promotional banner. Unlike a plain-text signature, it stays consistent and professional across every reply.",
            `Every MailStora signature is designed under the lead of ${founderLine}. Signatures use lightweight, table-based HTML with hosted retina images, so they load fast and look the same in Gmail, Outlook, Apple Mail and mobile email apps.`,
        ],
        facts: [
            { label: "Starting price", value: "$25 per signature" },
            { label: "Delivery time", value: stats.turnaround },
            { label: "Works in", value: "Gmail, Outlook, Apple Mail, mobile apps" },
            { label: "Elements", value: "Logo, photo, links, social icons, banner" },
            { label: "Team rollout", value: "Company-wide templates available" },
            { label: "Setup", value: "Step-by-step install guide" },
        ],
        priceFrom: "25",
        includedTitle: "What Every Signature Includes",
        included: [
            { title: "Custom branded design", text: "A layout matched to your logo, colours and fonts, designed for clarity at small sizes." },
            { title: "Clickable contact links", text: "Phone, email, website and booking links that open the right app on desktop and mobile." },
            { title: "Social icons and banners", text: "Branded social icons plus an optional promotional banner you can swap for campaigns." },
            { title: "Retina-ready images", text: "Hosted, high-resolution logos and photos that stay sharp on high-density screens." },
            { title: "Cross-client compatibility", text: "Tested in Gmail, Outlook (desktop, web and mobile) and Apple Mail." },
            { title: "Install guide and rollout", text: "Clear setup steps for each email client, and team versions for company-wide rollout." },
        ],
        galleryTitle: "Email Signature Examples",
        gallery: [
            { src: IMG + "mailstora-html-email-signature.webp", alt: "Professional HTML email signature with photo, contact links and banner", caption: "Signature with promo banner" },
            { src: IMG + "corporate-newsletter-email-signature.webp", alt: "Corporate email with branded HTML email signature", caption: "Corporate signature" },
        ],
        processLabel: "Signature",
        process: [
            { title: "Send your details", text: "Share your logo, brand colours, photo and the contact details and links to include." },
            { title: "Design", text: "You receive a signature design to review and approve before it is coded." },
            { title: "Code and test", text: "The signature is coded in HTML and tested in Gmail, Outlook and Apple Mail." },
            { title: "Install", text: "You get the files and an install guide, or team versions for every staff member." },
        ],
        platformsEyebrow: "Email Signature Compatibility",
        platformsTitle: "HTML Email Signatures for Every Email Client",
        platformsSubtitle: "Every signature is coded and tested for the email clients your team and contacts use, on desktop and mobile.",
        platforms: ["Gmail", "Google Workspace", "Outlook desktop", "Outlook on the web", "Microsoft 365", "Apple Mail", "iOS Mail", "Android Gmail"],
        showWork: false,
        showPricing: true,
        related: ["html-email-template-development", "outlook-email-rendering-fix", "figma-to-html-email", "klaviyo-campaign-management"],
        faqIntro: "Answers about HTML email signatures: price, compatibility and team rollout.",
        faqs: [
            { q: "How much does an HTML email signature cost?", a: "A simple HTML email signature from MailStora starts at $25, and a signature with a promotional banner is $65. Team packages for company-wide rollout are quoted per project." },
            { q: "Will my email signature work in Outlook and Gmail?", a: "Yes. Every MailStora signature is coded in table-based HTML and tested in Gmail, Outlook desktop, Outlook on the web and Apple Mail, on both desktop and mobile." },
            { q: "Are the links in the signature clickable?", a: "Yes. Phone numbers, email addresses, websites, booking links and social icons are all clickable and open the right app on desktop and mobile." },
            { q: "Can you create signatures for my whole team?", a: "Yes. MailStora creates a master signature design and individual versions for each team member, with an install guide for every email client you use." },
            { q: "How do I install the signature?", a: "You receive the signature files and a step-by-step install guide for Gmail, Outlook and Apple Mail. Most people finish the setup in a few minutes." },
        ],
    },

    "klaviyo-flow-setup": {
        name: "Klaviyo Flow Setup",
        serviceType: "Klaviyo email automation setup",
        summary: "Welcome, abandoned cart and post-purchase flows built end to end in Klaviyo.",
        metaTitle: "Klaviyo Flow Setup: Automation That Sells | MailStora",
        metaDescription: "Klaviyo flow setup by MailStora: welcome series, abandoned cart, browse abandonment, post-purchase and win-back flows, built end to end with branded templates.",
        eyebrow: "Klaviyo Automation",
        h1Lead: "Klaviyo Flow Setup That",
        h1Accent: "Sells While You Sleep",
        lead: "MailStora sets up Klaviyo automation flows end to end, from welcome series and abandoned cart to post-purchase and win-back, with smart triggers, filters and branded email templates that turn subscribers into repeat customers.",
        cta: "Set Up My Flows",
        trust: ["Core ecommerce flows", "Branded, editable emails", "Dynamic product blocks", "Shopify integration"],
        heroImage: "/images/media/generated/klaviyo-flow-setup-hero.webp",
        heroAlt: "Klaviyo abandoned cart flow: started checkout, wait 4 hours, send reminder email, with the email on laptop and phone",
        whatTitle: "What Is a Klaviyo Flow?",
        what: [
            "A Klaviyo flow is an automated series of emails (and optionally SMS) that Klaviyo sends when a customer does something, such as subscribing, abandoning a cart, browsing a product or placing an order. Flows run in the background and typically drive a large share of an ecommerce store's email revenue.",
            `MailStora builds each flow in your Klaviyo account, including triggers, filters, time delays, conditional splits and dynamic product blocks, and designs every email in the flow as a branded, hand-coded template. Every setup is handled by ${founderLine}.`,
        ],
        facts: [
            { label: "Platform", value: "Klaviyo (email and SMS)" },
            { label: "Core flows", value: "Welcome, abandoned cart, browse, post-purchase, win-back" },
            { label: "Delivery time", value: "Typically 3 to 5 days" },
            { label: "Email design", value: "Branded, hand-coded templates" },
            { label: "Store integration", value: "Shopify and WooCommerce" },
            { label: "Price", value: "Quoted per project" },
        ],
        includedTitle: "Flows and Features We Set Up",
        included: [
            { title: "Welcome series", text: "A 3 to 5 email sequence that introduces your brand and converts new subscribers into first-time buyers." },
            { title: "Abandoned cart and checkout", text: "Timed reminders with dynamic cart items that bring shoppers back to complete their order." },
            { title: "Browse abandonment", text: "Emails triggered by viewed products that keep your best items in front of interested shoppers." },
            { title: "Post-purchase and reviews", text: "Order follow-ups, product tips, review requests and cross-sells that build repeat purchases." },
            { title: "Win-back and sunset", text: "Re-engagement for lapsed customers and clean-up of inactive profiles to protect deliverability." },
            { title: "Segments and dynamic content", text: "Filters, conditional splits and product blocks that personalise every email." },
        ],
        galleryTitle: "Flow Emails We Design",
        gallery: [
            { src: IMG + "mailstora-welcome-email.webp", alt: "Klaviyo welcome series email design", caption: "Welcome email" },
            { src: IMG + "mailstora-abandoned-cart-email.webp", alt: "Klaviyo abandoned cart email with dynamic products", caption: "Abandoned cart email" },
            { src: IMG + "mailstora-order-confirmation-email.webp", alt: "Post-purchase order confirmation email", caption: "Post-purchase email" },
            { src: IMG + "travel-win-back-email-template.webp", alt: "Win-back email with discount code", caption: "Win-back email" },
        ],
        processLabel: "Flow Setup",
        process: [
            { title: "Audit and plan", text: "Your current Klaviyo account, list and store data are reviewed and the flow map is agreed." },
            { title: "Design the emails", text: "Each email in the flow is designed and hand-coded to match your brand." },
            { title: "Build the flows", text: "Triggers, delays, filters, splits and dynamic blocks are set up in Klaviyo." },
            { title: "Test and launch", text: "Every path is tested with live data, then the flows are switched on and monitored." },
        ],
        platformsEyebrow: "Klaviyo Integrations",
        platformsTitle: "Klaviyo Flows Connected to Your Store and Tools",
        platformsSubtitle: "Flows are built on real store data from Shopify or WooCommerce, with emails tested across every major inbox.",
        platforms: ["Klaviyo", "Shopify", "WooCommerce", "Klaviyo SMS", "Google Analytics", "Reviews apps"],
        showWork: false, // the Examples gallery already shows this work
        showPricing: false,
        related: ["klaviyo-campaign-management", "html-email-template-development", "shopify-development", "figma-to-html-email"],
        faqIntro: "Answers about Klaviyo flow setup: which flows, timelines and what you need to provide.",
        faqs: [
            { q: "Which Klaviyo flows should an ecommerce store set up first?", a: "Most stores should start with a welcome series, abandoned cart, browse abandonment and post-purchase flow, then add win-back and sunset flows. These core flows cover the moments when customers are most likely to buy." },
            { q: "How long does Klaviyo flow setup take?", a: "A core flow setup from MailStora typically takes 3 to 5 days, depending on the number of flows and emails, and whether the email designs are created from scratch." },
            { q: "Do you design the emails inside the flows?", a: "Yes. Every email in the flow is designed and hand-coded as a branded, responsive template, with editable sections so your team can update copy later." },
            { q: "Does it work with Shopify?", a: "Yes. MailStora connects Klaviyo to Shopify (or WooCommerce) so flows can use cart, order and product data, including dynamic product blocks." },
            { q: "Do I need to give you access to my Klaviyo account?", a: "Yes. Flows are built directly in your account, so you add MailStora as a user. You keep full ownership of the account, data and flows." },
        ],
    },

    "klaviyo-campaign-management": {
        name: "Klaviyo & Mailchimp Campaign Management",
        serviceType: "Email campaign management",
        summary: "Campaign emails designed, built, segmented and scheduled in Klaviyo or Mailchimp.",
        metaTitle: "Klaviyo Campaign Management Service | MailStora",
        metaDescription: "Klaviyo campaign management, done for you: design, HTML coding, segmentation, A/B subject lines, QA, scheduling and reporting. Mailchimp campaigns too.",
        eyebrow: "Email Campaigns",
        h1Lead: "Klaviyo Campaign Management,",
        h1Accent: "Done for You",
        lead: "MailStora plans, designs, builds and schedules your email campaigns in Klaviyo or Mailchimp, with the right segments, A/B-tested subject lines and full QA, so every send looks on-brand and lands in the inbox.",
        cta: "Plan My Campaign",
        trust: ["Design and build", "Segmentation", "A/B testing", "Clear reporting"],
        heroImage: "/images/media/generated/klaviyo-campaign-management-hero.webp",
        heroAlt: "Monthly email campaign plan with a Black Friday campaign on laptop and phone, sent from Klaviyo or Mailchimp",
        whatTitle: "What Is Email Campaign Management?",
        what: [
            "Email campaign management covers everything needed to send one-off or scheduled emails to your list: planning the calendar, designing and coding each email, choosing the right audience segments, writing and testing subject lines, checking the email in every client and scheduling the send.",
            `MailStora manages campaigns directly in Klaviyo or Mailchimp for ecommerce brands and agencies. Each campaign is built as a responsive, hand-coded email and handled by ${founderLine}.`,
        ],
        facts: [
            { label: "Platforms", value: "Klaviyo and Mailchimp" },
            { label: "Includes", value: "Design, build, segments, QA, scheduling" },
            { label: "Testing", value: "A/B subject lines and 50+ email clients" },
            { label: "Reporting", value: "Opens, clicks and revenue summary" },
            { label: "Engagement", value: "One-off campaigns or monthly packages" },
            { label: "Price", value: "Quoted per project" },
        ],
        includedTitle: "Everything Handled for Each Campaign",
        included: [
            { title: "Campaign planning", text: "A clear send calendar built around your launches, sales and seasonal moments." },
            { title: "Design and HTML build", text: "On-brand, responsive campaign emails built as reusable templates." },
            { title: "Audience segmentation", text: "Sends targeted to engaged segments to lift results and protect deliverability." },
            { title: "A/B subject line testing", text: "Subject lines and preview text tested to find what gets opened." },
            { title: "QA and scheduling", text: "Links, images and rendering checked across clients, then scheduled at the best time." },
            { title: "Performance reports", text: "A simple summary of opens, clicks and revenue after each campaign." },
        ],
        galleryTitle: "Campaign Emails We Have Built",
        gallery: [
            { src: IMG + "mailstora-black-friday-email.webp", alt: "Black Friday campaign email", caption: "Black Friday sale" },
            { src: IMG + "mailstora-christmas-email.webp", alt: "Christmas holiday campaign email", caption: "Holiday campaign" },
            { src: IMG + "mailstora-event-invitation-email.webp", alt: "Event invitation campaign email", caption: "Event invitation" },
            { src: IMG + "mailstora-marketing-tips-email-template.webp", alt: "Marketing newsletter campaign email", caption: "Content newsletter" },
        ],
        processLabel: "Campaign",
        process: [
            { title: "Brief", text: "Share the offer, audience and date, or plan a full calendar together." },
            { title: "Design and build", text: "The email is designed and coded, then shared for your approval." },
            { title: "Segment and test", text: "Audiences are set, subject lines A/B tested and the email QA-checked." },
            { title: "Send and report", text: "The campaign is scheduled, sent and followed by a short performance report." },
        ],
        platformsEyebrow: "Email Campaign Platforms",
        platformsTitle: "Campaigns Managed in Klaviyo, Mailchimp and More",
        platformsSubtitle: "Every campaign is built in your email platform and tested in the inboxes your subscribers use.",
        platforms: ["Klaviyo", "Mailchimp", "HubSpot", "Brevo", "Omnisend", "Shopify"],
        showWork: false, // the Examples gallery already shows this work
        showPricing: false,
        related: ["klaviyo-flow-setup", "html-email-template-development", "social-media-management", "outlook-email-rendering-fix"],
        faqIntro: "Answers about managed email campaigns in Klaviyo and Mailchimp.",
        faqs: [
            { q: "What is included in MailStora campaign management?", a: "Each campaign includes planning, email design, HTML build, audience segmentation, A/B subject line testing, QA across email clients, scheduling and a short performance report." },
            { q: "Do you work in both Klaviyo and Mailchimp?", a: "Yes. MailStora manages campaigns in Klaviyo and Mailchimp, and can also work in HubSpot, Brevo and Omnisend." },
            { q: "Can I book campaigns monthly?", a: "Yes. Campaigns can be booked one at a time or as a monthly package with a planned send calendar." },
            { q: "Will you write the email copy?", a: "MailStora can build from your copy or help shape subject lines and short campaign copy around your offer. Long-form copywriting can be quoted separately." },
            { q: "How do you make sure campaigns reach the inbox?", a: "Campaigns are sent to engaged segments, use clean, lightweight HTML with a healthy image-to-text ratio and are checked for broken links and spam triggers before sending." },
        ],
    },

    "figma-to-html-email": {
        name: "Figma & PSD to HTML Email",
        serviceType: "Design to HTML email conversion",
        summary: "Figma, PSD and XD designs converted into pixel-perfect, responsive HTML emails.",
        metaTitle: "Figma to HTML Email Conversion (PSD & XD) | MailStora",
        metaDescription: `Figma to HTML email conversion: send your Figma, PSD or XD design and get pixel-perfect, responsive HTML tested in Outlook and Gmail. ESP-ready in ${stats.turnaround}.`,
        eyebrow: "Design to HTML",
        h1Lead: "Figma to HTML Email Conversion,",
        h1Accent: "Pixel-Perfect in Every Inbox",
        lead: "MailStora converts your Figma, Photoshop, Adobe XD or Illustrator email design into clean, responsive HTML that matches the original to the pixel and renders correctly in Gmail, Outlook, Apple Mail and on mobile.",
        cta: "Convert My Design",
        trust: ["Figma, PSD, XD, AI", "Pixel-perfect match", `Delivered in ${stats.turnaround}`, "ESP-ready"],
        heroImage: "/images/media/generated/figma-to-html-email-hero.webp",
        heroAlt: "Figma email design converted into a coded HTML email on laptop and phone",
        whatTitle: "What Is Design to HTML Email Conversion?",
        what: [
            "Design to HTML email conversion turns a static email design, usually made in Figma, Photoshop (PSD), Adobe XD or Illustrator, into working HTML code that email clients can display. Email HTML is very different from web HTML, so a design has to be rebuilt with tables and inline styles to look the same in every inbox.",
            `MailStora hand-codes each design, keeping fonts, spacing, colours and images true to the original while adding responsive behaviour and Outlook fixes. Every conversion is handled by ${founderLine}.`,
        ],
        facts: [
            { label: "Design files", value: "Figma, PSD, Adobe XD, Illustrator, Sketch" },
            { label: "Starting price", value: "$40 per design" },
            { label: "Delivery time", value: stats.turnaround },
            { label: "Accuracy", value: "Pixel-perfect match to approved design" },
            { label: "Output", value: "Responsive HTML with inline CSS" },
            { label: "Platforms", value: "Klaviyo, Mailchimp, HubSpot and more" },
        ],
        priceFrom: "40",
        includedTitle: "What You Get With Every Conversion",
        included: [
            { title: "Pixel-perfect accuracy", text: "Spacing, typography, colours and images matched closely to your approved design." },
            { title: "Mobile layout", text: "A responsive version that stacks cleanly on phones, even if only a desktop design was provided." },
            { title: "Web font fallbacks", text: "Custom fonts with safe fallbacks for clients, like Outlook, that do not support them." },
            { title: "Optimised images", text: "Images sliced and compressed for fast loading, with alt text for accessibility." },
            { title: "Outlook support", text: "VML and MSO fixes so backgrounds, buttons and columns hold up in Outlook." },
            { title: "ESP-ready modules", text: "Code split into editable blocks for your email platform." },
        ],
        galleryTitle: "Designs We Have Converted to HTML",
        gallery: [
            { src: IMG + "mailstora-real-estate-email.webp", alt: "Real estate email converted from Figma to HTML", caption: "Real estate listing" },
            { src: IMG + "saas-software-email-design.webp", alt: "SaaS email design converted to HTML", caption: "SaaS product email" },
            { src: IMG + "restaurant-food-email-design.webp", alt: "Restaurant email design converted to HTML", caption: "Restaurant email" },
            { src: IMG + "travel-hospitality-email-design.webp", alt: "Travel email design converted to HTML", caption: "Travel promotion" },
        ],
        processLabel: "Conversion",
        process: [
            { title: "Upload your design", text: "Share a Figma link or PSD, XD, AI or Sketch file with any notes." },
            { title: "Code review", text: "The design is checked for anything that will not render in email and alternatives are suggested." },
            { title: "Hand-coding", text: "The email is rebuilt in table-based, responsive HTML with Outlook fixes." },
            { title: "Test and deliver", text: "It is tested in 50+ clients and delivered as ESP-ready HTML." },
        ],
        platformsEyebrow: "Design to HTML Compatibility",
        platformsTitle: "From Figma and Photoshop to Every ESP and Inbox",
        platformsSubtitle: "We convert designs from Figma, Photoshop, XD, Illustrator and Sketch into HTML that works in every major email platform and client.",
        platforms: ["Figma", "Adobe Photoshop (PSD)", "Adobe XD", "Adobe Illustrator", "Sketch", "Canva", "PDF"],
        showWork: false, // the Examples gallery already shows this work
        showPricing: true,
        related: ["html-email-template-development", "outlook-email-rendering-fix", "klaviyo-flow-setup", "html-email-signature-design"],
        faqIntro: "Answers about converting Figma and PSD designs into HTML email.",
        faqs: [
            { q: "Can you convert a Figma design into an HTML email?", a: "Yes. MailStora converts Figma email designs into hand-coded, responsive HTML that matches the design closely and renders correctly in Gmail, Outlook and Apple Mail." },
            { q: "Which design files do you accept?", a: "Figma links, Photoshop (PSD), Adobe XD, Illustrator (AI), Sketch, Canva and PDF files are all accepted." },
            { q: "Do I need a separate mobile design?", a: "No. If you only have a desktop design, MailStora creates a sensible mobile layout. If you do have a mobile design, it is followed exactly." },
            { q: "Will custom fonts work in the email?", a: "Custom web fonts work in Apple Mail, iOS Mail and some other clients. For clients that do not support them, like Outlook and Gmail, a close fallback font is used so the design still looks right." },
            { q: "How long does a conversion take?", a: `Most single email designs are converted and delivered within ${stats.turnaround}.` },
        ],
    },

    "outlook-email-rendering-fix": {
        name: "Email Testing & Outlook Fixes",
        serviceType: "Email rendering testing and repair",
        summary: "Emails tested in 50+ clients, with Outlook, dark mode and layout issues fixed.",
        metaTitle: "Outlook Email Rendering Fix & Email QA | MailStora",
        metaDescription: "Outlook email rendering fixes: MailStora tests your email in 50+ clients and fixes broken layouts, spacing, images and dark mode with VML and MSO code.",
        eyebrow: "Email Testing & QA",
        h1Lead: "Outlook Email Rendering Fix:",
        h1Accent: "Broken Emails Fixed for Good",
        lead: "MailStora tests your existing email templates across 50+ email clients and devices, then repairs Outlook rendering bugs, dark mode issues, broken images and misaligned layouts so every subscriber sees the email you designed.",
        cta: "Fix My Emails",
        trust: ["50+ clients tested", "Outlook 2016 to new Outlook", "Dark mode fixes", "Before and after report"],
        heroImage: "/images/media/generated/outlook-email-rendering-fix-hero.webp",
        heroAlt: "Outlook-only VML and MSO fix code with the fixed email on laptop and phone, tested in 50+ clients",
        whatTitle: "Why Do Emails Break in Outlook?",
        what: [
            "Desktop Outlook for Windows renders email with Microsoft Word's engine instead of a browser engine, so it ignores many modern CSS features. Background images, rounded buttons, padding, max-width and some fonts can break, which is why an email that looks perfect in Gmail can fall apart in Outlook 2016, 2019 or 365.",
            `MailStora fixes these problems with Outlook-specific techniques such as VML backgrounds, MSO conditional comments, ghost tables and bulletproof buttons, while keeping the email correct in every other client. Every fix is handled by ${founderLine}.`,
        ],
        facts: [
            { label: "Clients tested", value: "50+ email clients and devices" },
            { label: "Outlook versions", value: "2016, 2019, 365, new Outlook, Outlook.com" },
            { label: "Common fixes", value: "Spacing, images, buttons, columns, dark mode" },
            { label: "Techniques", value: "VML, MSO conditionals, ghost tables" },
            { label: "Delivery time", value: stats.turnaround },
            { label: "Report", value: "Before and after screenshots" },
        ],
        includedTitle: "What We Test and Fix",
        included: [
            { title: "Outlook rendering bugs", text: "Ghost spacing, collapsed columns, stretched images and missing backgrounds fixed with VML and MSO code." },
            { title: "Dark mode issues", text: "Inverted logos, unreadable text and clashing colours corrected for Apple Mail, Gmail and Outlook dark mode." },
            { title: "Broken or blocked images", text: "Image sizing, retina scaling and alt text fixed so emails still work with images off." },
            { title: "Mobile layout problems", text: "Columns that do not stack, tiny text and hard-to-tap buttons made mobile-friendly." },
            { title: "Button and link fixes", text: "Bulletproof buttons and working links in every client, including Outlook." },
            { title: "Full QA report", text: "Before and after screenshots across clients, so you can see exactly what changed." },
        ],
        galleryTitle: "Emails We Have Tested and Repaired",
        gallery: [
            { src: IMG + "mailstora-weekly-newsletter-email.webp", alt: "Newsletter email repaired for Outlook", caption: "Newsletter layout fix" },
            { src: IMG + "mailstora-abandoned-cart-email.webp", alt: "Abandoned cart email tested across clients", caption: "Product block fix" },
            { src: IMG + "healthcare-email-design.webp", alt: "Healthcare email tested in dark mode", caption: "Dark mode fix" },
            { src: IMG + "education-email-design.webp", alt: "Education email repaired for mobile", caption: "Mobile layout fix" },
        ],
        processLabel: "Testing",
        process: [
            { title: "Send your email", text: "Share the HTML file or a test send, plus the clients where it breaks." },
            { title: "Test in 50+ clients", text: "The email is rendered across desktop, web and mobile clients to find every issue." },
            { title: "Fix the code", text: "Issues are repaired with Outlook-safe techniques without changing the design." },
            { title: "Re-test and report", text: "The fixed email is re-tested and delivered with before and after screenshots." },
        ],
        platformsEyebrow: "Email Client Testing",
        platformsTitle: "Emails Tested in Every Major Client and ESP",
        platformsSubtitle: "Every fix is re-tested across Outlook, Gmail, Apple Mail, Yahoo and mobile apps, for emails from any email platform.",
        platforms: CLIENTS,
        showWork: false,
        showPricing: false,
        related: ["html-email-template-development", "figma-to-html-email", "html-email-signature-design", "klaviyo-campaign-management"],
        faqIntro: "Answers about Outlook rendering problems and email testing.",
        faqs: [
            { q: "Why does my email look broken in Outlook?", a: "Desktop Outlook for Windows uses Microsoft Word to render email, so it ignores many CSS features such as background images, max-width, border-radius and some padding. Emails need Outlook-specific code like VML and MSO conditional comments to display correctly." },
            { q: "Which Outlook versions do you fix?", a: "MailStora tests and fixes emails for Outlook 2016, 2019, Microsoft 365, the new Outlook for Windows, Outlook for Mac, Outlook.com and the Outlook mobile apps." },
            { q: "Will fixing Outlook break the email in Gmail or Apple Mail?", a: "No. Outlook fixes are wrapped in conditional code that only Outlook reads, and the email is re-tested in every other client before delivery." },
            { q: "Can you fix dark mode problems?", a: "Yes. MailStora fixes inverted logos, unreadable text and clashing colours in Apple Mail, Gmail and Outlook dark mode." },
            { q: "How long does an Outlook fix take?", a: `Most single email fixes are delivered within ${stats.turnaround}, including a before and after screenshot report.` },
        ],
    },

    "shopify-development": {
        name: "Shopify Store Development",
        serviceType: "Shopify development",
        summary: "Fast, on-brand Shopify stores connected to Klaviyo for email and SMS.",
        metaTitle: "Shopify Store Development & Customization | MailStora",
        metaDescription: "Shopify theme customisation, speed optimisation and conversion-focused product pages, connected to Klaviyo so your store and email marketing work together.",
        eyebrow: "Shopify Development",
        h1Lead: "Shopify Store Development",
        h1Accent: "Built to Convert",
        lead: "MailStora customises Shopify themes, speeds up slow stores and builds conversion-focused product and collection pages, then connects your store to Klaviyo so your website and email marketing work as one system.",
        cta: "Build My Store",
        trust: ["Theme customisation", "Speed optimisation", "Klaviyo integration", "Mobile-first"],
        heroImage: "/images/media/generated/shopify-development-hero.webp",
        heroAlt: "Shopify product page on a laptop with a back-in-stock email on a phone",
        whatTitle: "What Does Shopify Store Development Include?",
        what: [
            "Shopify store development covers setting up and customising your Shopify theme, building product, collection and landing pages, installing and configuring apps, and improving speed and mobile experience so more visitors complete checkout.",
            `Because MailStora also builds Klaviyo flows and email templates, your store is set up with email and SMS in mind: sign-up forms, product feeds and events are connected so abandoned cart and post-purchase emails work from day one. Projects are handled by ${founderLine}.`,
        ],
        facts: [
            { label: "Platform", value: "Shopify and Shopify Plus" },
            { label: "Services", value: "Theme edits, pages, apps, speed" },
            { label: "Email integration", value: "Klaviyo email and SMS" },
            { label: "Focus", value: "Mobile experience and conversion" },
            { label: "Price", value: "Quoted per project" },
            { label: "Timeline", value: "Depends on project scope" },
        ],
        includedTitle: "Shopify Services We Offer",
        included: [
            { title: "Theme customisation", text: "Edits to your existing Shopify theme, or custom sections built to match your brand." },
            { title: "Product and collection pages", text: "Clear, persuasive pages with the details, reviews and trust signals shoppers need." },
            { title: "Speed optimisation", text: "Image compression, app clean-up and code fixes for faster load times." },
            { title: "Klaviyo integration", text: "Sign-up forms, product feeds and tracking set up so email and SMS flows work correctly." },
            { title: "App setup", text: "Reviews, upsell, subscription and other apps installed and configured." },
            { title: "Mobile-first checkout", text: "A smooth mobile experience from product page to checkout." },
        ],
        galleryTitle: "",
        gallery: [],
        processLabel: "Shopify",
        process: [
            { title: "Discovery", text: "Your store, goals and problem areas are reviewed and a scope is agreed." },
            { title: "Build", text: "Theme changes, pages and apps are built on a preview theme first." },
            { title: "Connect", text: "Klaviyo and other tools are connected and tested with real events." },
            { title: "Launch", text: "Changes go live after your approval, with a final speed and mobile check." },
        ],
        platformsEyebrow: "Shopify and Ecommerce Tools",
        platformsTitle: "Shopify Stores Connected to Your Marketing Stack",
        platformsSubtitle: "Your Shopify store is connected to Klaviyo and the apps you rely on, so store and email work together.",
        platforms: ["Shopify", "Shopify Plus", "Klaviyo", "Judge.me", "Recharge", "Google Analytics"],
        showWork: false,
        showPricing: false,
        related: ["klaviyo-flow-setup", "klaviyo-campaign-management", "social-media-management", "html-email-template-development"],
        faqIntro: "Answers about Shopify development and connecting your store to Klaviyo.",
        faqs: [
            { q: "Can you customise my existing Shopify theme?", a: "Yes. MailStora customises existing Shopify themes, adds custom sections and improves product and collection pages without rebuilding your store from scratch." },
            { q: "Do you connect Shopify to Klaviyo?", a: "Yes. MailStora connects Shopify to Klaviyo, including sign-up forms, product feeds and tracking, so abandoned cart, browse and post-purchase flows work correctly." },
            { q: "Can you make my Shopify store faster?", a: "Yes. Speed work includes compressing images, removing unused apps and scripts and fixing theme code that slows the store down." },
            { q: "How much does Shopify development cost?", a: "Shopify work is quoted per project based on scope. Request a free quote with your store link and what you want to change." },
        ],
    },

    "social-media-management": {
        name: "Social Media Management",
        serviceType: "Social media management",
        summary: "Branded posts, captions and scheduling that keep your feed active and on-brand.",
        metaTitle: "Social Media Management for Ecommerce Brands | MailStora",
        metaDescription: "Social media management for ecommerce brands: content calendar, post and story designs, captions, hashtags, scheduling and reports for Instagram and Facebook.",
        eyebrow: "Social Media",
        h1Lead: "Social Media Management",
        h1Accent: "for Ecommerce Brands",
        lead: "MailStora plans, designs and schedules on-brand social content for ecommerce brands, with a monthly content calendar, branded posts and stories, captions and hashtags, aligned with your email campaigns so every channel tells the same story.",
        cta: "Grow My Socials",
        trust: ["Monthly content calendar", "Branded designs", "Captions and hashtags", "Monthly reporting"],
        heroImage: "/images/media/generated/social-media-management-hero.webp",
        heroAlt: "Social media content calendar on a laptop and an Instagram-style feed on a phone",
        whatTitle: "What Is Included in Social Media Management?",
        what: [
            "Social media management means planning, creating, publishing and reporting on content for your brand's social accounts, so your feed stays active and consistent without taking up your team's time.",
            `MailStora aligns your social calendar with your email campaigns and product launches, so promotions reach customers on every channel at the same time. The founder, ${founder.name}, has helped brands grow Instagram accounts organically, including one client that reached its goal of 10K+ followers.`,
        ],
        facts: [
            { label: "Platforms", value: "Instagram, Facebook, TikTok, Pinterest, LinkedIn" },
            { label: "Deliverables", value: "Posts, stories, captions, hashtags" },
            { label: "Planning", value: "Monthly content calendar" },
            { label: "Reporting", value: "Monthly performance summary" },
            { label: "Alignment", value: "Synced with your email campaigns" },
            { label: "Price", value: "Monthly packages, quoted per brand" },
        ],
        includedTitle: "What We Handle Each Month",
        included: [
            { title: "Content calendar", text: "A monthly plan of posts and stories built around your products, promotions and seasons." },
            { title: "Branded post designs", text: "Feed posts, carousels and stories designed to match your brand." },
            { title: "Captions and hashtags", text: "Clear captions with calls to action and researched hashtags for reach." },
            { title: "Scheduling", text: "Posts scheduled at the best times for your audience." },
            { title: "Campaign alignment", text: "Social content timed with your email campaigns and launches." },
            { title: "Monthly reporting", text: "A simple summary of reach, engagement and follower growth." },
        ],
        galleryTitle: "",
        gallery: [],
        processLabel: "Social Media",
        process: [
            { title: "Onboarding", text: "Your brand, audience, goals and current accounts are reviewed." },
            { title: "Plan", text: "A monthly content calendar is created and approved." },
            { title: "Create and schedule", text: "Posts and captions are designed, written and scheduled." },
            { title: "Report", text: "Results are summarised each month and the next plan is adjusted." },
        ],
        platformsEyebrow: "Social Media Platforms",
        platformsTitle: "Social Media Managed Across Every Major Platform",
        platformsSubtitle: "Content is planned and scheduled for the social platforms your customers use, alongside your email campaigns.",
        platforms: ["Instagram", "Facebook", "TikTok", "Pinterest", "LinkedIn", "YouTube"],
        showWork: false,
        showPricing: false,
        related: ["klaviyo-campaign-management", "shopify-development", "klaviyo-flow-setup", "html-email-template-development"],
        faqIntro: "Answers about MailStora social media management.",
        faqs: [
            { q: "Which social media platforms do you manage?", a: "MailStora manages Instagram, Facebook, TikTok, Pinterest and LinkedIn for ecommerce brands, with content planned around your products and campaigns." },
            { q: "What is included each month?", a: "Each month includes a content calendar, branded post and story designs, captions and hashtags, scheduling and a performance report." },
            { q: "Can social media be aligned with my email campaigns?", a: "Yes. Because MailStora also runs email campaigns and Klaviyo flows, your social content can be timed and designed to match every email promotion." },
            { q: "How much does social media management cost?", a: "Social media management is offered as a monthly package quoted per brand, based on platforms and posting frequency. Request a free quote to get pricing." },
        ],
    },
};

Object.assign(SERVICES, SPOKES, GROWTH);

// Every page uses the rich layout; pages without their own block take theirs from richContent.ts
for (const [slug, data] of Object.entries(SERVICES)) {
    data.rich ??= RICH[slug];
    data.faqs = [...data.faqs, ...(EXTRA_FAQS[slug] ?? [])];
}

export const SERVICE_SLUGS = Object.keys(SERVICES);
