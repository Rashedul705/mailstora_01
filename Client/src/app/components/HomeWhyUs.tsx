import type { ReactNode } from "react";
import { siteConfig } from "../../utils/siteConfig";
import "./HomeSections.css";

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

const REASONS = (): { title: string; text: string; icon: ReactNode }[] => [
    {
        title: "Hand-Coded, Never Drag-and-Drop",
        text: "Every template is written by hand in clean, table-based HTML, so it is lightweight, accessible and easy to edit in your ESP.",
        icon: <svg {...icon}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>,
    },
    {
        title: "Tested in 50+ Email Clients",
        text: "We check every email in Gmail, Outlook, Apple Mail, Yahoo and mobile apps, including dark mode, before it reaches you.",
        icon: <svg {...icon}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
    },
    {
        title: "Founder-Led Quality Control",
        text: "Every project is led and signed off by MailStora's founder, so you get senior email expertise and one point of contact from brief to final file.",
        icon: <svg {...icon}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>,
    },
    {
        title: `Fast ${siteConfig.stats.turnaround} Turnaround`,
        text: "Most single templates are delivered within 24 to 48 hours, with clear updates and no missed deadlines.",
        icon: <svg {...icon}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
    },
    {
        title: "Built for Your ESP",
        text: "Templates arrive ready for Klaviyo, Mailchimp, HubSpot and more, with editable sections your team can update.",
        icon: <svg {...icon}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>,
    },
    {
        title: "Transparent, One-Time Pricing",
        text: "Clear project pricing with no subscriptions or hidden fees, plus revision rounds included so you get exactly what you approved.",
        icon: <svg {...icon}><path d="M20 12l-8 8-9-9V3h8z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg>,
    },
];

export default function HomeWhyUs() {
    const { stats } = siteConfig;
    return (
        <section className="hs-section hs-why" aria-labelledby="why-title">
            <div className="container hs-why-inner">
                <div className="hs-why-intro">
                    <p className="home-eyebrow">Why Choose MailStora</p>
                    <h2 id="why-title" className="hs-title hs-title--left">
                        Email Development You <span>Don&apos;t Have to Double-Check</span>
                    </h2>
                    <p className="hs-subtitle hs-subtitle--left">
                        MailStora is a founder-led HTML email development agency. Brands and agencies get a tested,
                        documented delivery process backed by {stats.yearsExperience} years of experience and{" "}
                        {stats.templatesBuilt} templates delivered.
                    </p>
                    <ul className="hs-why-stats">
                        <li><strong>{stats.yearsExperience}</strong><span>Years of experience</span></li>
                        <li><strong>{stats.templatesBuilt}</strong><span>Templates delivered</span></li>
                        <li><strong>{stats.clientsServed}</strong><span>Happy clients</span></li>
                        <li><strong>100%</strong><span>Upwork Job Success</span></li>
                    </ul>
                </div>

                <ul className="hs-why-grid">
                    {REASONS().map((r, i) => (
                        <li key={r.title} className={`hs-why-card hs-why-card--${i % 2 === 0 ? "orange" : "green"}`}>
                            <span className="hs-why-icon">{r.icon}</span>
                            <h3>{r.title}</h3>
                            <p>{r.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
