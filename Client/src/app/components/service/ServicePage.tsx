import Image from "next/image";
import type React from "react";
import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Breadcrumb from "../Breadcrumb";
import { SERVICE_KEYWORDS } from "./seoMeta";
import { postsForTopic } from "@/lib/topics";
import { workForTopic, type WorkItem } from "@/lib/portfolioTopics";
import RecentWork from "../RecentWork";
import HomeReviews from "../HomeReviews";
import PricingOverview from "../PricingOverview";
import MidCTA from "../MidCTA";
import LogoStrip from "../LogoStrip";
import Platforms from "../Platforms";
import FounderQuote from "../FounderQuote";
import PageDecor from "../PageDecor";
import HomeFAQ from "../HomeFAQ";
import HomeContact from "../HomeContact";
import { siteConfig } from "../../../utils/siteConfig";
import { SERVICES, type ServiceData } from "./services";
import RichSections from "./RichSections";
import "./ServicePage.css";
import HomeLink from "../HomeLink";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

async function getJSON(path: string) {
    try {
        const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
        return res.ok ? await res.json() : null;
    } catch {
        return null;
    }
}

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

const line = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// Process step icons: requirements, develop and test, review, deliver
const STEP_ICONS = [
    <svg key="1" {...line}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>,
    <svg key="2" {...line}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>,
    <svg key="3" {...line}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>,
    <svg key="4" {...line}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>,
];

const SERVICE_ICONS: Record<string, React.ReactNode> = {
    "html-email-template-development": <svg {...line}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 6 10-6" /></svg>,
    "html-email-signature-design": <svg {...line}><rect x="2" y="4" width="20" height="16" rx="2" /><circle cx="8" cy="10" r="2" /><path d="M5 16c.6-1.4 1.7-2 3-2s2.4.6 3 2M14 9h5M14 12h5" /></svg>,
    "klaviyo-flow-setup": <svg {...line}><circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M9 6h5a4 4 0 0 1 4 4v5" /></svg>,
    "klaviyo-campaign-management": <svg {...line}><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /></svg>,
    "figma-to-html-email": <svg {...line}><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" /><path d="M10 9l-2 3 2 3M14 9l2 3-2 3" /></svg>,
    "outlook-email-rendering-fix": <svg {...line}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
    "shopify-development": <svg {...line}><path d="M6 7h12l-1 13H7L6 7z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>,
    "social-media-management": <svg {...line}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>,
    "seo-aeo-geo-services": <svg {...line}><circle cx="11" cy="11" r="7" /><path d="M21 21l-5-5M8 11h6M11 8v6" /></svg>,
    "performance-marketing": <svg {...line}><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>,
    default: <svg {...line}><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" /></svg>,
};

type Guide = { slug: string; title: string; excerpt?: string; content?: string; tags?: string[] };

// Blog posts that cover this service topic (full posts are needed to read their links and text)
async function getGuides(slug: string): Promise<Guide[]> {
    try {
        const list = await fetch(`${API_BASE}/api/blog?limit=30`, { next: { revalidate: 300 } }).then((r) => (r.ok ? r.json() : { posts: [] }));
        const posts: Guide[] = await Promise.all(
            (list.posts || []).map((p: Guide) =>
                fetch(`${API_BASE}/api/blog/${p.slug}`, { next: { revalidate: 300 } }).then((r) => (r.ok ? r.json() : p)).catch(() => p)
            )
        );
        return postsForTopic(posts, slug, 3);
    } catch {
        return [];
    }
}

/** Shared layout for every service page. Content lives in ./services.ts. */
export default async function ServicePage({ slug }: { slug: string }) {
    const s = SERVICES[slug] as ServiceData;
    const [portfolio, testimonials, pricing, clientLogos] = await Promise.all([
        getJSON("/api/portfolio?limit=20"),
        getJSON("/api/testimonials"),
        s.showPricing ? getJSON("/api/pricing") : Promise.resolve(null),
        getJSON("/api/trust-logos"),
    ]);

    const guides = await getGuides(slug);
    const url = `${siteConfig.url}/${slug}/`;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        name: s.name,
        serviceType: s.serviceType,
        description: s.metaDescription,
        url,
        image: s.heroImage ? `${siteConfig.url}${s.heroImage}` : undefined,
        areaServed: "Worldwide",
        mainEntityOfPage: url,
        category: s.category || "Email development",
        keywords: (SERVICE_KEYWORDS[slug] || []).join(", ") || undefined,
        audience: { "@type": "BusinessAudience", audienceType: "Ecommerce brands, marketing teams and agencies" },
        provider: { "@type": "Organization", "@id": "https://mailstora.com/#mailstora", name: "MailStora", url: siteConfig.url },
        brand: { "@id": "https://mailstora.com/#mailstora" },
        ...(s.priceFrom ? { offers: { "@type": "Offer", priceCurrency: "USD", price: s.priceFrom, url: `${siteConfig.url}/pricing/` } } : {}),
        additionalProperty: s.facts.map((f) => ({ "@type": "PropertyValue", name: f.label, value: f.value })),
        // Each sub-service card becomes a named service in the catalogue, linked to the things it is about
        ...(s.cards ? {
            hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: `${s.name} catalogue`,
                itemListElement: s.cards.map((c, i) => ({
                    "@type": "Offer",
                    position: i + 1,
                    url: `${url}#${c.id}`,
                    itemOffered: { "@type": "Service", name: c.title, description: c.text, about: c.entities.map((e) => ({ "@type": "Thing", name: e })) },
                })),
            },
        } : {}),
    };

    const related = s.related.map((r) => ({ slug: r, ...SERVICES[r] })).filter((r) => r.name);
    const recentItems = Array.isArray(portfolio?.items) ? portfolio.items : [];
    const work = s.showWork ? [] : workForTopic(recentItems as WorkItem[], slug, 3);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />
            <main className="main svc">
                <PageDecor />
                {/* ── Hero ── */}
                <section className="svc-hero" aria-labelledby="svc-title">
                    <div className="container">
                        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Services", url: "/services/" }, { label: s.name, url: `/${slug}/` }]} />
                        <div className="svc-hero-inner">
                            <div className="svc-hero-copy">
                                <p className="home-eyebrow">{s.eyebrow}</p>
                                <h1 id="svc-title" className="svc-hero-title">
                                    {s.h1Lead} <span>{s.h1Accent}</span>
                                </h1>
                                <p className="svc-hero-lead">{s.lead}</p>
                                <div className="svc-hero-actions">
                                    <Link href={`/quote/?service=${encodeURIComponent(s.name)}`} className="home-btn-primary">
                                        {s.cta}
                                        {arrow}
                                    </Link>
                                    <Link href="/portfolio/" className="hs-btn-ghost">
                                        View Our Work
                                    </Link>
                                </div>
                                <ul className="svc-hero-trust">
                                    {s.trust.map((t) => (
                                        <li key={t}>
                                            {check}
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="svc-hero-media">
                                {s.heroImage ? (
                                    <Image src={s.heroImage} alt={s.heroAlt} width={560} height={560} priority sizes="(max-width: 1024px) 90vw, 520px" />
                                ) : (
                                    <div className="svc-hero-panel">
                                        {s.facts.slice(0, 4).map((f) => (
                                            <div key={f.label}>
                                                <span>{f.label}</span>
                                                <strong>{f.value}</strong>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <LogoStrip clients={Array.isArray(clientLogos) ? clientLogos : []} />

                {/* ── Definition + key facts (entity, attributes, values) ── */}
                <section className="svc-section svc-about" aria-labelledby="svc-about-title">
                    <div className="container svc-about-inner">
                        <div className="svc-about-copy">
                            <p className="home-eyebrow">{s.rich?.labels.overview ?? "Overview"}</p>
                            <h2 id="svc-about-title" className="hs-title hs-title--left">{s.whatTitle}</h2>
                            {/* First paragraph is the definition: shown as a highlighted answer block */}
                            <p className="svc-definition">{s.what[0]}</p>
                            {s.what.slice(1).map((p) => (
                                <p key={p.slice(0, 20)} className="svc-body">{p}</p>
                            ))}
                            <HomeLink inline />
                        </div>
                        <aside className="svc-facts" aria-label={`${s.name} at a glance`}>
                            <span className="svc-facts-deco" aria-hidden="true">
                                <svg className="f1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                                <svg className="f2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>
                                <svg className="f3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" /></svg>
                                <svg className="f4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>
                            </span>
                            <h3>At a Glance</h3>
                            <dl>
                                {s.facts.map((f) => (
                                    <div key={f.label}>
                                        <dt>{f.label}</dt>
                                        <dd>{f.value}</dd>
                                    </div>
                                ))}
                            </dl>
                            <Link href={`/quote/?service=${encodeURIComponent(s.name)}`} className="home-btn-primary svc-facts-btn">
                                Get a Free Quote
                                {arrow}
                            </Link>
                        </aside>
                    </div>
                </section>

                {s.rich && <RichSections rich={s.rich} name={s.name} facts={s.facts} />}

                {/* ── Sub-service cards: 2-column grid, same shape for every card ── */}
                {s.cards && (
                    <section className="svc-section svc-cards" aria-labelledby="svc-cards-title">
                        <div className="container">
                            <header className="hs-header">
                                <p className="home-eyebrow">What We Do</p>
                                <h2 id="svc-cards-title" className="hs-title">{s.name}: Everything Included</h2>
                            </header>
                            <ul className="svc-cards-grid">
                                {s.cards.map((c) => (
                                    <li key={c.id} id={c.id} className="svc-card2">
                                        <div className="svc-card2-media">
                                            <Image src={`/images/media/generated/${slug}-guide-${c.id}.webp`} alt={`${c.title}: ${c.entities.slice(0, 3).join(", ")}`} width={900} height={675} sizes="(max-width: 900px) 92vw, 560px" />
                                        </div>
                                        <div className="svc-card2-body">
                                            <h3>{c.title}</h3>
                                            <p>{c.text}</p>
                                            <ul>
                                                {c.bullets.map((b) => <li key={b}>{b}</li>)}
                                            </ul>
                                            <Link href={c.cta.href} className="svc-card2-btn">{c.cta.label} <span aria-hidden="true">→</span></Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}


                {/* ── What's included ── */}
                {!s.rich && (
                <section className="svc-section svc-included" aria-labelledby="svc-inc-title">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">What&apos;s Included</p>
                            <h2 id="svc-inc-title" className="hs-title">{s.includedTitle}</h2>
                        </header>
                        <ul className="svc-grid">
                            {s.included.map((f, i) => (
                                <li key={f.title} className={`svc-card svc-card--${i % 2 === 0 ? "orange" : "green"}`}>
                                    <span className="svc-card-num">{String(i + 1).padStart(2, "0")}</span>
                                    <h3>{f.title}</h3>
                                    <p>{f.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                )}

                {/* ── Examples ── */}
                {!s.rich && s.gallery.length > 0 && (
                    <section className="svc-section svc-gallery" aria-labelledby="svc-gal-title">
                        <div className="container">
                            <header className="hs-header">
                                <p className="home-eyebrow">Examples</p>
                                <h2 id="svc-gal-title" className="hs-title">{s.galleryTitle}</h2>
                            </header>
                            <ul className="svc-gallery-grid">
                                {s.gallery.map((g) => (
                                    <li key={g.src}>
                                        <figure>
                                            <span className="svc-gallery-thumb">
                                                <Image src={g.src} alt={g.alt} fill sizes="(max-width: 640px) 45vw, 250px" />
                                            </span>
                                            <figcaption>{g.caption}</figcaption>
                                        </figure>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                {/* ── Process ── */}
                <section className="svc-section svc-process" aria-labelledby="svc-proc-title">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">{s.rich?.labels.process[0] ?? "How It Works"}</p>
                            <h2 id="svc-proc-title" className="hs-title">
                                {s.rich ? s.rich.labels.process[1] : <>Our <span>{s.processLabel}</span> Process</>}
                            </h2>
                        </header>
                        <ol className="svc-steps">
                            {s.process.map((p, i) => (
                                <li key={p.title} className={i % 2 ? "is-green" : "is-orange"}>
                                    <span className="svc-step-icon" aria-hidden="true">{STEP_ICONS[i % STEP_ICONS.length]}</span>
                                    <span className="svc-step-num">{String(i + 1).padStart(2, "0")}</span>
                                    <h3>{p.title}</h3>
                                    <p>{p.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* ── Platforms (homepage component, page-specific text) ── */}
                <Platforms
                    eyebrow={s.platformsEyebrow ?? "Platforms We Support"}
                    titleLead={s.platformsTitle}
                    titleAccent=""
                    subtitle={s.platformsSubtitle}
                />

                {s.rich ? (
                    <MidCTA
                        eyebrow={s.rich.cta.eyebrow}
                        title={s.rich.cta.title}
                        text={s.rich.cta.text}
                        cta={s.rich.cta.button}
                        href={`/quote/?service=${encodeURIComponent(s.name)}`}
                    />
                ) : (
                    <MidCTA />
                )}
                {s.showWork && <RecentWork items={recentItems} />}
                {work.length > 0 && (
                    <section className="svc-section" aria-labelledby="svc-work-title">
                        <div className="container">
                            <header className="hs-header">
                                <p className="home-eyebrow">Related Work</p>
                                <h2 id="svc-work-title" className="hs-title">{s.name} <span>Examples</span></h2>
                            </header>
                            <ul style={{ listStyle: "none", padding: 0, margin: "0 auto", maxWidth: 1000, display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                                {work.map((w) => (
                                    <li key={w.slug} style={{ border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
                                        <Link href={`/portfolio/${w.slug}/`} style={{ textDecoration: "none", color: "#0f172a", display: "block" }}>
                                            {w.coverImage && <Image src={w.coverImage} alt={w.title} width={400} height={260} style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "top" }} />}
                                            <strong style={{ display: "block", padding: "0.9rem 1rem" }}>{w.title}</strong>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <p style={{ textAlign: "center", marginTop: "1.25rem" }}><Link href="/portfolio/">View the full portfolio</Link></p>
                        </div>
                    </section>
                )}
                <HomeReviews reviews={Array.isArray(testimonials?.data) ? testimonials.data : []} />
                <FounderQuote />
                {s.showPricing && <PricingOverview data={pricing} />}

                {/* ── Guides on this topic (links from the service hub to its blog cluster) ── */}
                {guides.length > 0 && (
                    <section className="svc-section" aria-labelledby="svc-guides-title">
                        <div className="container">
                            <header className="hs-header">
                                <p className="home-eyebrow">Guides &amp; Resources</p>
                                <h2 id="svc-guides-title" className="hs-title">{s.name} <span>Guides</span></h2>
                            </header>
                            <ul style={{ listStyle: "none", padding: 0, margin: "0 auto", maxWidth: 900, display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                                {guides.map((g) => (
                                    <li key={g.slug} style={{ border: "1px solid #e5e7eb", borderRadius: 14, padding: "1.25rem", background: "#fff" }}>
                                        <Link href={`/blog/${g.slug}/`} style={{ fontWeight: 700, color: "#0f172a", textDecoration: "none", display: "block", marginBottom: 6 }}>{g.title}</Link>
                                        {g.excerpt && <p style={{ margin: 0, color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>{g.excerpt.length > 150 ? g.excerpt.slice(0, 150) + "…" : g.excerpt}</p>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                {/* ── Related services (internal links back into the service network) ── */}
                <section className="svc-section svc-related" aria-labelledby="svc-rel-title">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">{s.rich?.labels.related[0] ?? "More From MailStora"}</p>
                            <h2 id="svc-rel-title" className="hs-title">
                                {s.rich ? s.rich.labels.related[1] : "Related"} <span>{s.rich ? s.rich.labels.related[2] : "Services"}</span>
                            </h2>
                        </header>
                        <ul className="svc-related-grid">
                            {related.map((r) => (
                                <li key={r.slug}>
                                    <Link href={`/${r.slug}/`} className="svc-related-card">
                                        <span className="svc-related-icon" aria-hidden="true">{SERVICE_ICONS[r.slug] ?? SERVICE_ICONS.default}</span>
                                        <strong>{r.name}</strong>
                                        <span>{r.summary}</span>
                                        <em>
                                            Learn more {arrow}
                                        </em>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <p className="svc-related-home">
                            <Link href="/services/" className="hs-link">
                                See all MailStora services {arrow}
                            </Link>
                        </p>
                    </div>
                </section>

                <HomeFAQ faqs={s.faqs} heading={<>{s.name} <span>FAQs</span></>} intro={s.faqIntro} />
                <HomeContact />
            </main>
            <Footer />
        </>
    );
}
