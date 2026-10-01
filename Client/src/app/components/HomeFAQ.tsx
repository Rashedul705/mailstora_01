import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "../../utils/siteConfig";
import "./HomeSections.css";

const { stats, upwork, founder } = siteConfig;

// Written to answer one question each in the first sentence (for search snippets and AI answers),
// and to name the entities (MailStora, Rashedul Islam, Klaviyo, Outlook...) explicitly.
export const HOME_FAQS: { q: string; a: string }[] = [
    {
        q: "What is MailStora?",
        a: `MailStora is a founder-led HTML email development agency based in ${upwork.location} and led by ${founder.name}. It builds hand-coded HTML email templates, HTML email signatures, Klaviyo automation flows and Klaviyo or Mailchimp campaigns for ecommerce brands and marketing agencies worldwide.`,
    },
    {
        q: "Is MailStora an agency or a freelancer?",
        a: `MailStora is a founder-led email development agency. ${founder.name} started it after ${stats.yearsExperience} years of freelance email development, and still leads and quality-checks every project, so clients get an agency process with senior expertise on every email.`,
    },
    {
        q: "Who builds the email templates at MailStora?",
        a: `Every project is led and quality-checked by ${founder.name}, MailStora's founder, who has ${stats.yearsExperience} years of HTML email experience, ${stats.upworkHours} hours on Upwork, a ${upwork.jobSuccess} Job Success Score and ${upwork.badge} status.`,
    },
    {
        q: "How much does a custom HTML email template cost?",
        a: "A single custom HTML email template starts at $40, and the Standard Package with 3 templates and 1 HTML signature is $149. HTML email signatures start at $25. Klaviyo flows, Shopify work and larger design systems are quoted per project.",
    },
    {
        q: "How long does it take to deliver an HTML email template?",
        a: `Most HTML email templates and email signatures are delivered within ${stats.turnaround}. Klaviyo flow setups and multi-email campaigns usually take 3 to 5 days, depending on the number of emails.`,
    },
    {
        q: "Will my email template work in Outlook, Gmail and Apple Mail?",
        a: "Yes. MailStora templates use table-based, inline-styled HTML with Outlook-specific fixes, and every email is tested in Gmail, Outlook (2016, 2019, 365 and the new Outlook), Apple Mail, Yahoo Mail and mobile apps, including dark mode.",
    },
    {
        q: "Which email marketing platforms do you support?",
        a: "Templates are built for Klaviyo, Mailchimp, HubSpot, Brevo, ActiveCampaign, Campaign Monitor, Constant Contact, Zoho Campaigns, Omnisend, MailerLite and Salesforce Marketing Cloud, with editable sections set up for your platform.",
    },
    {
        q: "Can you convert my Figma, PSD or Adobe XD design into an HTML email?",
        a: "Yes. MailStora converts Figma, PSD, Adobe XD and Illustrator designs into pixel-perfect, responsive HTML emails. If you do not have a design, a layout can be created for you based on your brand.",
    },
    {
        q: "Do you set up Klaviyo automation flows?",
        a: "Yes. MailStora sets up Klaviyo flows end to end, including welcome series, abandoned cart, browse abandonment, post-purchase and win-back flows, with branded templates, triggers, filters and dynamic product blocks.",
    },
    {
        q: "Are MailStora email templates mobile responsive and dark mode friendly?",
        a: "Yes. Every template is fully responsive on phones and tablets, and colours, logos and images are checked in dark mode so the email stays readable and on-brand in every inbox.",
    },
    {
        q: "Do you create HTML email signatures for teams?",
        a: "Yes. MailStora designs clickable HTML email signatures for individuals and whole teams, with logos, photos, social icons and banners, and provides install guides for Gmail, Outlook and Apple Mail.",
    },
    {
        q: "How many revisions are included?",
        a: "Revision rounds are included in every package, and the Standard Package includes 3 rounds, so you only pay once and get exactly the design you approved.",
    },
    {
        q: "Do you offer white-label email development for agencies?",
        a: "Yes. MailStora builds HTML emails, Klaviyo flows and email signatures under your agency's brand, signs an NDA on request and never contacts or shows work to your clients.",
    },
    {
        q: "How do I start a project with MailStora?",
        a: "Request a free quote with your design or brief, or book a free consultation. You will get a clear price and timeline, usually within 24 hours, before any work starts.",
    },
];

type FAQ = { q: string; a: string };

/** FAQ accordion with FAQPage structured data. Defaults to the homepage questions. */
export default function HomeFAQ({
    faqs = HOME_FAQS,
    heading = <>Frequently Asked <span>Questions</span></>,
    intro = "Answers about HTML email templates, pricing, delivery times, Outlook compatibility and Klaviyo setup.",
}: {
    faqs?: FAQ[];
    heading?: ReactNode;
    intro?: string;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    };

    return (
        <section className="hs-section hs-faq" aria-labelledby="faq-title">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="container hs-faq-inner">
                <div className="hs-faq-intro">
                    <p className="home-eyebrow">FAQ</p>
                    <h2 id="faq-title" className="hs-title hs-title--left">
                        {heading}
                    </h2>
                    <p className="hs-subtitle hs-subtitle--left">
                        {intro}
                    </p>
                    <div className="hs-faq-help">
                        <h3>Still have a question?</h3>
                        <p>Send a message and get a reply from the founder, usually within a few hours.</p>
                        <a
                            href={`https://wa.me/${founder.whatsapp}?text=Hi%2C%20I%20have%20a%20question%20about%20your%20email%20services`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hs-btn-whatsapp"
                        >
                            Ask on WhatsApp
                        </a>
                        <Link href="/faq/" className="hs-link">
                            See all FAQs
                        </Link>
                    </div>
                </div>

                <div className="hs-faq-list">
                    {faqs.map((f, i) => (
                        <details key={f.q} className="hs-faq-item" open={i === 0}>
                            <summary>
                                <h3>{f.q}</h3>
                                <span className="hs-faq-icon" aria-hidden="true" />
                            </summary>
                            <p>{f.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
