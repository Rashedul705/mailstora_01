import Image from "next/image";
import Link from "next/link";
import MidCTA from "../MidCTA";
import type { RichContent } from "./services";

const check = (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const arrow = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

// Small line icons for feature and benefit cards, picked by index
const ICONS = [
    <path key="a" d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />,
    <path key="b" d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" />,
    <path key="c" d="M13 2L4 14h7l-1 8 9-12h-7z" />,
    <path key="d" d="M8 7l-5 5 5 5M16 7l5 5-5 5" />,
    <path key="e" d="M20 6L9 17l-5-5" />,
    <path key="f" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    <path key="g" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    <path key="h" d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0M12 7v5l3 2" />,
];

function Icon({ i }: { i: number }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {ICONS[i % ICONS.length]}
        </svg>
    );
}

/** Extra sections for service pages with `rich` content: split intro, pain points, offer, benefits, projects. */
export default function RichSections({ rich, name, facts = [] }: { rich: RichContent; name: string; facts?: { label: string; value: string }[] }) {
    const { intro, pains, offer, benefits, projects, labels } = rich;
    const quote = `/quote/?service=${encodeURIComponent(name)}`;

    return (
        <>
            {/* ── Split intro: image + text + 4 features ── */}
            <section className="svc-section rx-intro" aria-labelledby="rx-intro-title">
                <div className="container">
                    <div className="rx-intro-top">
                        {/* Two images: main image on an offset gradient frame, plus a floating email card */}
                        {intro.image ? (
                            <div className="rx-intro-media">
                                <span className="rx-shape-frame" aria-hidden="true" />
                                <Image className="rx-img-main" src={intro.image} alt={intro.alt ?? ""} width={517} height={517} sizes="(max-width: 1024px) 80vw, 480px" />
                                {intro.image2 && (
                                    <Image className="rx-img-float" src={intro.image2} alt={intro.alt2 ?? ""} width={263} height={534} sizes="180px" />
                                )}
                            </div>
                        ) : (
                            /* No photo for this service: key facts on the brand gradient instead */
                            <div className="rx-intro-panel">
                                {facts.slice(0, 4).map((f) => (
                                    <div key={f.label}>
                                        <span>{f.label}</span>
                                        <strong>{f.value}</strong>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div>
                            <p className="home-eyebrow">{intro.eyebrow}</p>
                            <h2 id="rx-intro-title" className="hs-title hs-title--left">
                                {intro.titleLead} <span>{intro.titleAccent}</span>
                            </h2>
                            {intro.text.map((t) => (
                                <p key={t.slice(0, 24)} className="svc-body">{t}</p>
                            ))}
                        </div>
                    </div>
                    <ul className="rx-features">
                        {intro.features.map((f, i) => (
                            <li key={f.title}>
                                <span className={`rx-icon rx-icon--${i % 2 ? "green" : "orange"}`}><Icon i={i} /></span>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── Pain points ── */}
            <section className="svc-section rx-pains" aria-labelledby="rx-pains-title">
                <div className="container">
                    <header className="hs-header">
                        <p className="home-eyebrow">{labels.pains[0]}</p>
                        <h2 id="rx-pains-title" className="hs-title">{pains.title}</h2>
                        <p className="hs-subtitle">{pains.subtitle}</p>
                    </header>
                    <ul className="rx-pain-grid">
                        {pains.items.map((p) => (
                            <li key={p.title}>
                                <span className="rx-pain-x" aria-hidden="true">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                                </span>
                                <h3>{p.title}</h3>
                                <p>{p.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── Offer: the solution with price and what's included ── */}
            <section className="svc-section rx-offer-wrap" aria-labelledby="rx-offer-title">
                <div className="container">
                    <div className={`rx-offer${offer.image ? "" : " rx-offer--no-image"}`}>
                        <div className="rx-offer-copy">
                            <p className="rx-offer-eyebrow">The Solution</p>
                            <h2 id="rx-offer-title">{offer.title}</h2>
                            <p className="rx-offer-text">{offer.text}</p>
                            <p className="rx-offer-price">
                                <span>{offer.priceLabel}</span>
                                <strong>{offer.price}</strong>
                                <small>{offer.priceNote}</small>
                            </p>
                            <Link href={quote} className="home-btn-primary">
                                {offer.cta}
                                {arrow}
                            </Link>
                        </div>
                        {offer.image && (
                            <div className="rx-offer-media">
                                <Image src={offer.image} alt={offer.alt ?? ""} width={300} height={500} sizes="260px" />
                            </div>
                        )}
                        <div className="rx-offer-list">
                            <h3>What&apos;s included</h3>
                            <ul>
                                {offer.items.map((it) => (
                                    <li key={it}>
                                        {check}
                                        {it}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="svc-section rx-benefits" aria-labelledby="rx-ben-title">
                <div className="container">
                    <header className="hs-header">
                        <p className="home-eyebrow">{labels.benefits}</p>
                        <h2 id="rx-ben-title" className="hs-title">
                            {benefits.titleLead} <span>{benefits.titleAccent}</span>
                        </h2>
                        <p className="hs-subtitle">{benefits.subtitle}</p>
                    </header>
                    <ul className="rx-ben-grid">
                        {benefits.items.map((b, i) => (
                            <li key={b.title}>
                                <span className={`rx-icon rx-icon--${i % 2 ? "green" : "orange"}`}><Icon i={i + 3} /></span>
                                <h3>{b.title}</h3>
                                <p>{b.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── Second CTA, between benefits and projects ── */}
            <MidCTA
                eyebrow={rich.cta2.eyebrow}
                title={rich.cta2.title}
                text={rich.cta2.text}
                cta={rich.cta2.button}
                href={rich.cta2.href ?? quote}
            />

            {/* ── Selected projects (masonry) ── */}
            {projects.items.length > 0 && (
            <section className="svc-section rx-projects" aria-labelledby="rx-proj-title">
                <div className="container">
                    <header className="hs-header">
                        <p className="home-eyebrow">{labels.projects[0]}</p>
                        <h2 id="rx-proj-title" className="hs-title">
                            {labels.projects[1]} <span>{labels.projects[2]}</span>
                        </h2>
                        <p className="hs-subtitle">{projects.subtitle}</p>
                    </header>
                    <ul className="rx-masonry">
                        {projects.items.map((p) => (
                            <li key={p.src}>
                                <figure>
                                    <Image src={p.src} alt={p.alt} width={320} height={540} sizes="(max-width: 640px) 45vw, 280px" />
                                    <figcaption>{p.caption}</figcaption>
                                </figure>
                            </li>
                        ))}
                    </ul>
                    <p className="svc-related-home">
                        <Link href="/portfolio/" className="home-btn-primary">
                            View Full Portfolio
                            {arrow}
                        </Link>
                    </p>
                </div>
            </section>
            )}
        </>
    );
}
