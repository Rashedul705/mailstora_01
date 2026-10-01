import Link from "next/link";
import type { ReactNode } from "react";
import "./Problem.css";

const icon = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

const PROBLEMS: { title: string; problem: string; fix: string; href: string; link: string; icon: ReactNode }[] = [
    {
        title: "Emails That Break in Outlook",
        problem: "Your template looks perfect in Gmail but collapses in Outlook 2016, 2019 or 365, with broken columns, missing images and odd spacing.",
        fix: "Hand-coded, table-based HTML tested in 50+ email clients before delivery.",
        href: "/outlook-email-rendering-fix/",
        link: "Fix Outlook rendering",
        icon: (
            <svg {...icon}>
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6M8 21h8" />
                <path d="M15 12l3 3M18 12l-3 3" />
            </svg>
        ),
    },
    {
        title: "Signatures That Look Amateur",
        problem: "Plain-text or badly built email signatures break on mobile and look unprofessional in every reply your team sends.",
        fix: "Clickable, on-brand HTML email signatures that work in Gmail, Outlook and Apple Mail.",
        href: "/html-email-signature-design/",
        link: "Upgrade your signature",
        icon: (
            <svg {...icon}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <circle cx="8" cy="10" r="2" />
                <path d="M5 16c.6-1.4 1.7-2 3-2s2.4.6 3 2M14 9h5M14 12h5M14 15h3" />
            </svg>
        ),
    },
    {
        title: "Campaigns That Miss the Brand",
        problem: "Drag-and-drop builders in Klaviyo and Mailchimp rarely match your design, so campaigns look generic and click-through rates drop.",
        fix: "Custom, editable Klaviyo and Mailchimp templates built to match your brand exactly.",
        href: "/klaviyo-email-templates/",
        link: "Get branded templates",
        icon: (
            <svg {...icon}>
                <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
        ),
    },
    {
        title: "Automation Flows Left Unfinished",
        problem: "Without working welcome, abandoned cart and post-purchase flows, new subscribers and shoppers never hear from you when it matters.",
        fix: "Klaviyo flows set up end to end, with smart triggers and branded emails.",
        href: "/klaviyo-flow-setup/",
        link: "Set up your flows",
        icon: (
            <svg {...icon}>
                <circle cx="6" cy="6" r="3" />
                <circle cx="18" cy="18" r="3" />
                <path d="M9 6h5a4 4 0 0 1 4 4v5" />
                <path d="M4 20l3-3M7 20l-3-3" />
            </svg>
        ),
    },
    {
        title: "Shopify Stores That Don't Convert",
        problem: "A slow, generic Shopify store loses the sale before shoppers reach checkout, no matter how good your emails are.",
        fix: "Fast, on-brand Shopify stores connected to Klaviyo for email and SMS.",
        href: "/shopify-development/",
        link: "Improve your store",
        icon: (
            <svg {...icon}>
                <path d="M6 7h12l-1 13H7L6 7z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
                <path d="M9 17l6-6M15 17l-6-6" />
            </svg>
        ),
    },
    {
        title: "Social Feeds That Go Quiet",
        problem: "Irregular posting kills reach and makes your brand look inactive, even when the business behind it is growing.",
        fix: "A monthly content calendar with branded posts, captions and scheduling done for you.",
        href: "/social-media-management/",
        link: "Keep your feed active",
        icon: (
            <svg {...icon}>
                <path d="M3 3v18h18" />
                <path d="M7 8l4 4 3-3 5 6" />
            </svg>
        ),
    },
];

export default function Problem() {
    return (
        <section className="pain" id="problem" aria-labelledby="pain-title">
            <div className="container">
                <header className="pain-header">
                    <p className="pain-eyebrow">Common Email Marketing Problems</p>
                    <h2 id="pain-title" className="pain-title">
                        Every Piece Looks Fine On Its Own,{" "}
                        <span>Until It Has to Work Together</span>
                    </h2>
                    <p className="pain-subtitle">
                        A broken <strong>HTML email template</strong>, a <strong>Klaviyo flow</strong> that never fires, a{" "}
                        <strong>Shopify store</strong> that doesn&apos;t convert or a quiet social feed: each one quietly costs you
                        customers. MailStora builds every piece to work as one connected system, so your emails, store and
                        socials finally pull in the same direction.
                    </p>
                </header>

                <ul className="pain-grid">
                    {PROBLEMS.map((p, i) => (
                        <li key={p.title} className={`pain-card pain-card--${i % 2 === 0 ? "orange" : "green"}`}>
                            <span className="pain-icon">{p.icon}</span>
                            <h3 className="pain-card-title">{p.title}</h3>

                            <p className="pain-row pain-row--problem">
                                <span className="pain-row-badge" aria-hidden="true">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
                                        <path d="M6 6l12 12M18 6L6 18" />
                                    </svg>
                                </span>
                                <span>
                                    <span className="sr-only">Problem: </span>
                                    {p.problem}
                                </span>
                            </p>

                            <p className="pain-row pain-row--fix">
                                <span className="pain-row-badge" aria-hidden="true">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                    </svg>
                                </span>
                                <span>
                                    <strong>Our fix: </strong>
                                    {p.fix}
                                </span>
                            </p>

                            <Link href={p.href} className="pain-link">
                                {p.link}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="pain-cta">
                    <p>
                        Not sure where the leak is? <strong>Get a free email and store audit.</strong>
                    </p>
                    <Link href="/quote/" className="pain-cta-btn">
                        Get My Free Audit
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
