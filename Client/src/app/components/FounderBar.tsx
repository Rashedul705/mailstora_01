import Image from "next/image";
import type { ReactNode } from "react";
import { siteConfig } from "../../utils/siteConfig";
import "./FounderBar.css";

const { founder, stats, upwork } = siteConfig;

// "16,000+" -> "16k+" so the stat fits its column, as in the design
const compact = (value: string) => value.replace(/^(\d{1,3}),000(\+?)$/, "$1k$2");

const statIcon = {
    width: 32,
    height: 32,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

const STATS = (): { value: string; label: string; icon: ReactNode }[] => [
    {
        value: stats.yearsExperience,
        label: "Years of Experience",
        icon: (
            <svg {...statIcon}>
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
            </svg>
        ),
    },
    {
        value: compact(stats.upworkHours),
        label: "Upwork Hours",
        icon: (
            <svg {...statIcon}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
    },
    {
        value: String(upwork.totalJobs),
        label: "Upwork Jobs",
        icon: (
            <svg {...statIcon}>
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
            </svg>
        ),
    },
    {
        value: upwork.rating + "/5",
        label: `Rating (${upwork.reviews} reviews)`,
        icon: (
            <svg {...statIcon}>
                <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
            </svg>
        ),
    },
    {
        value: stats.templatesBuilt,
        label: "Email Templates",
        icon: (
            <svg {...statIcon}>
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        value: stats.clientsServed,
        label: "Clients Worldwide",
        icon: (
            <svg {...statIcon}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
];

const SOCIALS = () => [
    {
        label: "Hire me on Upwork",
        href: founder.socials.upwork,
        className: "founder-bar-social--upwork",
        external: true,
        icon: (
            <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M24.75 17.542c-1.469 0-2.849-.61-4.081-1.638l.303-1.437.013-.066c.264-1.511 1.094-4.047 3.765-4.047 1.98 0 3.595 1.627 3.595 3.595 0 1.979-1.615 3.593-3.595 3.593zM24.75 8c-3.43 0-6.017 2.287-7.122 6.019-.838-1.548-1.459-3.414-1.838-4.985H12.9v5.967c0 1.905-.87 3.808-2.775 3.808-1.905 0-2.906-1.903-2.906-3.808l.011-5.967H4.25v5.967c0 3.748 1.95 6.722 5.875 6.722 3.925 0 5.918-3.15 5.918-6.906l-.003-.638c.35 1.104.831 2.276 1.438 3.293L15.56 26h2.97l1.123-5.447c1.203.813 2.593 1.301 4.097 1.301 3.748 0 6.75-3.027 6.75-6.75 0-3.722-3.002-6.104-5.75-6.104z" />
            </svg>
        ),
    },
    {
        label: "Chat on WhatsApp",
        href: `https://wa.me/${founder.whatsapp}?text=Hi%2C%20I%27m%20interested%20in%20your%20email%20template%20services`,
        className: "founder-bar-social--whatsapp",
        external: true,
        icon: (
            <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
        ),
    },
    {
        label: "Send an email",
        href: `mailto:${founder.email}`,
        className: "founder-bar-social--email",
        external: false,
        icon: (
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
            </svg>
        ),
    },
];

export default function FounderBar() {
    return (
        <section className="founder-bar" aria-label={`About ${founder.name}`}>
            <div className="container">
                <div className="founder-bar-card">
                    <div className="founder-bar-about">
                        <p className="founder-bar-eyebrow">Meet the Founder</p>

                        <div className="founder-bar-profile">
                            <div className="founder-bar-photo-wrap">
                                <Image
                                    src="/images/brand/rashedul-islam-founder.webp"
                                    alt={`${founder.name}, founder and lead HTML email developer at MailStora`}
                                    width={132}
                                    height={132}
                                    className="founder-bar-photo"
                                />
                            </div>
                            <div className="founder-bar-info">
                                <p className="founder-bar-name">{founder.name}</p>
                                <p className="founder-bar-role">Founder &amp; Lead Developer</p>
                                <p className="founder-bar-headline">{upwork.headline}</p>
                                <ul className="founder-bar-socials">
                                    {SOCIALS().map((s) => (
                                        <li key={s.label}>
                                            <a
                                                href={s.href}
                                                className={`founder-bar-social ${s.className}`}
                                                aria-label={s.label}
                                                title={s.label}
                                                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                            >
                                                {s.icon}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <ul className="founder-bar-upwork" aria-label="Upwork profile highlights">
                            <li>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f57c3" strokeWidth="2" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M7 14l2-5 3 3 3-3 2 5z" fill="#1f57c3" stroke="none" />
                                </svg>
                                <strong>{upwork.jobSuccess}</strong> Job Success
                            </li>
                            <li>
                                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 1.5l2.6 2.1 3.3-.3.8 3.2 2.8 1.8-1.2 3.1 1.2 3.1-2.8 1.8-.8 3.2-3.3-.3L12 22.5l-2.6-2.1-3.3.3-.8-3.2-2.8-1.8 1.2-3.1-1.2-3.1 2.8-1.8.8-3.2 3.3.3z" fill="#1f57c3" />
                                    <path d="M12 7.5l1.3 2.7 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4z" fill="#fff" />
                                </svg>
                                <strong>{upwork.badge}</strong>
                            </li>
                            <li>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="#f5c518" aria-hidden="true">
                                    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                                </svg>
                                <strong>{upwork.rating}</strong> ({upwork.reviews} reviews)
                            </li>
                        </ul>

                        <div className="founder-bar-bio">
                            <p>
                                <strong>MailStora</strong> is a specialist HTML email development agency led by{" "}
                                <strong>{founder.name}</strong>, a developer with <strong>{stats.yearsExperience} years of experience</strong>{" "}
                                building emails that look right in every inbox, from Gmail and Apple Mail to the most stubborn
                                versions of Outlook.
                            </p>
                            <p>
                                <strong>{upwork.badge}</strong> on Upwork with a <strong>{upwork.jobSuccess} Job Success Score</strong>,{" "}
                                <strong>{upwork.totalJobs} completed Upwork jobs</strong> and <strong>{stats.upworkHours} hours</strong>{" "}
                                rated {upwork.rating}/5 across {upwork.reviews} reviews, Rashedul personally oversees
                                every project, from Figma or PSD conversion to Klaviyo, Mailchimp and HubSpot setup, so every email meets
                                the same senior standard.
                            </p>
                        </div>
                    </div>

                    <ul className="founder-bar-stats">
                        {STATS().map((s) => (
                            <li key={s.label} className="founder-bar-stat">
                                <span className="founder-bar-stat-icon">{s.icon}</span>
                                <span className="founder-bar-stat-value">{s.value}</span>
                                <span className="founder-bar-stat-label">{s.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
