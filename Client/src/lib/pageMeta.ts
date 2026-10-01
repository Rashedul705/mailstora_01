import type { Metadata } from "next";
import { siteConfig } from "../utils/siteConfig";

const SITE = "https://mailstora.com";
const DEFAULT_IMG = "/images/media/cropped/service-html-email-templates.webp";

type Spec = { title: string; description: string; keywords: string[]; image?: string; imageAlt?: string; noindex?: boolean };

// Titles <= 60 characters and descriptions <= 160, primary keyword first.
// Built lazily so values from Admin › Site Settings are used.
const SPECS = (): Record<string, Spec> => {
    const { stats, upwork, founder } = siteConfig;
    return {
        "/services/": {
            title: "Email Development Services for Brands & Agencies | MailStora",
            description: `MailStora services: HTML email templates, Figma to HTML, Klaviyo flows and campaigns, email signatures, plus SEO, AEO, GEO and performance marketing. Email from $25.`,
            keywords: ["email development services", "HTML email services", "email template development agency", "Klaviyo services", "email signature services"],
        },
        "/about/": {
            title: "About MailStora: Founder-Led HTML Email Agency",
            description: `MailStora is a founder-led HTML email agency led by ${founder.name}, also offering SEO, AEO, GEO and performance marketing. ${stats.yearsExperience} years, ${upwork.badge} on Upwork.`,
            keywords: ["about MailStora", "HTML email development agency", founder.name, "email developer Bangladesh", "founder-led email agency"],
        },
        "/pricing/": {
            title: "HTML Email Template Pricing: From $40 | MailStora",
            description: `HTML email template pricing from $40, email signatures from $25 and packages from $149. One-time fees, no subscriptions, delivered in ${stats.turnaround}.`,
            keywords: ["HTML email template pricing", "email template cost", "email signature price", "Klaviyo setup cost", "email development pricing"],
        },
        "/portfolio/": {
            title: "HTML Email Template Portfolio & Examples | MailStora",
            description: "HTML email template portfolio: newsletters, ecommerce, transactional emails and signatures built for Klaviyo, Mailchimp and HubSpot. Tested in 50+ inboxes.",
            keywords: ["HTML email template portfolio", "email template examples", "Klaviyo email examples", "email signature examples", "newsletter template examples"],
        },
        "/blog/": {
            title: "HTML Email & Klaviyo Blog: Guides and Tips | MailStora",
            description: "Guides on HTML email development, Outlook rendering fixes, Klaviyo flows and email signatures, written by the MailStora email development team.",
            keywords: ["HTML email blog", "email development guides", "Outlook email tips", "Klaviyo tips", "email marketing blog"],
        },
        "/reviews/": {
            title: "MailStora Reviews: HTML Email & Klaviyo Clients",
            description: `MailStora client reviews for HTML email templates, signatures and Klaviyo work. Rated ${upwork.rating}/5 across ${upwork.reviews} Upwork reviews, ${upwork.jobSuccess} Job Success.`,
            keywords: ["MailStora reviews", "HTML email developer reviews", "Klaviyo expert reviews", "email template service reviews"],
        },
        "/faq/": {
            title: "HTML Email Development FAQ: Klaviyo, Pricing | MailStora",
            description: "Answers to common questions about HTML email templates, Outlook compatibility, Klaviyo flows, email signatures, pricing, delivery and how MailStora works.",
            keywords: ["HTML email FAQ", "email template questions", "Klaviyo FAQ", "email signature FAQ", "MailStora FAQ"],
        },
        "/contact/": {
            title: "Contact MailStora: HTML Email & Klaviyo Agency",
            description: "Contact MailStora about HTML email templates, Klaviyo flows or email signatures. WhatsApp, email, Upwork or the form, with a reply within 2 to 4 hours.",
            keywords: ["contact MailStora", "hire HTML email developer", "hire Klaviyo expert", "email development agency contact"],
        },
        "/quote/": {
            title: "Free Quote for HTML Email Development | MailStora",
            description: "Get a free quote for HTML email templates, Figma to HTML, Klaviyo flows, campaigns or email signatures. Clear price and timeline within 24 hours.",
            keywords: ["HTML email development quote", "email template quote", "Klaviyo setup quote", "email signature quote"],
        },
        "/schedule/": {
            title: "Book a Free Email Development Consultation | MailStora",
            description: "Book a free consultation with MailStora about HTML emails, Klaviyo setup or email signatures, and get expert advice before you commit.",
            keywords: ["email development consultation", "Klaviyo consultation", "free email marketing consultation"],
        },
        "/case-studies/": {
            title: "Email Development Case Studies | MailStora",
            description: "Email development case studies from MailStora: real HTML email, Klaviyo and Outlook projects with the challenge, solution and measured results.",
            keywords: ["email development case studies", "HTML email case study", "Klaviyo case study", "email template results"],
        },
        "/privacy/": {
            title: "Privacy Policy | MailStora",
            description: "How MailStora collects, uses, stores and protects personal information from website visitors, quote requests and client projects, and your data rights.",
            keywords: ["MailStora privacy policy"],
        },
        "/terms/": {
            title: "Terms & Conditions | MailStora",
            description: "Terms for MailStora's HTML email development services: quotes, payment, delivery, revisions, file ownership, platform access, warranties and cancellations.",
            keywords: ["MailStora terms and conditions"],
        },
    };
};

/** Full metadata for a static page: title, description, keywords, canonical, Open Graph and Twitter card. */
export function pageMeta(path: string): Metadata {
    const s = SPECS()[path];
    const url = `${SITE}${path}`;
    const image = { url: `${SITE}${s.image || DEFAULT_IMG}`, alt: s.imageAlt || s.title };
    return {
        title: s.title,
        description: s.description,
        keywords: s.keywords,
        alternates: { canonical: url },
        openGraph: { type: "website", siteName: "MailStora", title: s.title, description: s.description, url, images: [image] },
        twitter: { card: "summary_large_image", title: s.title, description: s.description, images: [image.url] },
    };
}
