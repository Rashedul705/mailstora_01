import { getCaseStudyForProject } from "../../case-studies/data";
import { templateMeta } from "@/lib/seoTemplate";
import { withSeo } from "@/lib/seo";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import MidCTA from "../../components/MidCTA";
import { itemTopics } from "@/lib/portfolioTopics";
import { siteConfig } from "../../../utils/siteConfig";
import PreviewTabs from "./PreviewTabs";
import "./project.css";
import HomeLink from "../../components/HomeLink";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const SITE = "https://mailstora.com";

type Item = {
    _id: string;
    slug: string;
    title: string;
    clientName: string;
    type?: string;
    esp?: string;
    industry?: string;
    year?: string;
    shortDescription?: string;
    metaTitle?: string;
    metaDescription?: string;
    fullDescription?: string;
    whatWasIncluded?: string;
    coverImage?: string;
    fullTemplateFile?: string;
    desktopImages?: string[];
    mobileImages?: string[];
    angleViews?: { label?: string; imageUrl?: string }[];
    compatibility?: string[];
    tags?: string[];
    results?: { openRate?: string; clickRate?: string; deliveryTime?: string; customMetric?: string };
    caseStudy?: { enabled?: boolean };
};

async function getPortfolioItem(slug: string): Promise<Item | null> {
    try {
        const res = await fetch(`${API_BASE}/api/portfolio/${slug}`, { cache: "no-store" });
        return res.ok ? res.json() : null;
    } catch {
        return null;
    }
}

// Same platform or type first, then anything else, so every project shows three neighbours
async function getRelatedItems(item: Item): Promise<Item[]> {
    try {
        const res = await fetch(`${API_BASE}/api/portfolio?limit=30`, { next: { revalidate: 300 } });
        if (!res.ok) return [];
        const all: Item[] = (await res.json()).items || [];
        const others = all.filter((r) => r._id !== item._id);
        return [...others.filter((r) => r.esp === item.esp || r.type === item.type), ...others].filter((r, i, a) => a.indexOf(r) === i).slice(0, 3);
    } catch {
        return [];
    }
}

async function baseGenerateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const item = await getPortfolioItem(slug);
    if (!item) return { title: "Portfolio Item Not Found | MailStora", robots: { index: false } };

    // Own SEO fields first, then a long enough short description, then the portfolio template
    const tpl = await templateMeta("portfolio", { title: item.title, client: item.clientName, platform: item.esp && item.esp !== "Other" ? item.esp : "HTML", excerpt: item.shortDescription, year: item.year });
    const title = item.metaTitle || tpl.title;
    const short = item.shortDescription || "";
    const description = item.metaDescription || (short.length >= 70 ? short : tpl.description);
    const url = `${SITE}/portfolio/${slug}/`;
    const images = item.coverImage ? [{ url: item.coverImage, alt: item.title }] : [];
    return {
        title,
        description,
        keywords: [item.title, `${item.type || "HTML email"} example`, "HTML email template example", "MailStora portfolio"],
        alternates: { canonical: url },
        openGraph: { title, description, url, siteName: "MailStora", type: "website", images },
        twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
    };
}

const lines = (s = "") => s.split("\n").map((l) => l.trim()).filter(Boolean);

const tick = (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default async function SinglePortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = await getPortfolioItem(slug);
    if (!item) notFound();

    const related = await getRelatedItems(item);
    const pageUrl = `${SITE}/portfolio/${slug}/`;
    const services = itemTopics(item);
    const included = lines(item.whatWasIncluded);
    const r = item.results || {};
    const results = [
        r.openRate && { value: r.openRate, label: "Open rate" },
        r.clickRate && { value: r.clickRate, label: "Click rate" },
        r.customMetric && { value: r.customMetric, label: "Result" },
        r.deliveryTime && { value: r.deliveryTime, label: "Delivery" },
    ].filter(Boolean) as { value: string; label: string }[];
    const gallery = [
        ...(item.desktopImages || []).map((u, i) => ({ src: u, label: `Desktop view ${i + 1}` })),
        ...(item.mobileImages || []).map((u, i) => ({ src: u, label: `Mobile view ${i + 1}` })),
        ...(item.angleViews || []).filter((a) => a.imageUrl).map((a) => ({ src: a.imageUrl as string, label: a.label || "Section" })),
    ].filter((g, i, a) => g.src && g.src !== item.coverImage && a.findIndex((x) => x.src === g.src) === i);
    const caseStudy = await getCaseStudyForProject(slug);
    const hasCase = !!caseStudy;
    const wa = `https://wa.me/${siteConfig.founder.whatsapp}?text=${encodeURIComponent(`Hi, I saw "${item.title}" in your portfolio and want something similar.`)}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CreativeWork",
                "@id": `${pageUrl}#work`,
                name: item.title,
                description: item.shortDescription || undefined,
                url: pageUrl,
                image: item.coverImage ? (item.coverImage.startsWith("/") ? SITE + item.coverImage : item.coverImage) : undefined,
                genre: item.type || "HTML email template",
                about: services.map((t) => ({ "@type": "Service", "@id": `${SITE}/${t.slug}/#service`, name: t.name })),
                creator: { "@id": `${SITE}/#mailstora` },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
                    { "@type": "ListItem", position: 2, name: "Portfolio", item: `${SITE}/portfolio/` },
                    { "@type": "ListItem", position: 3, name: item.title, item: pageUrl },
                ],
            },
        ],
    };

    // Every fact appears once: in the facts bar
    const facts = [["Client", item.clientName], ["Platform", item.esp !== "Other" ? item.esp : ""], ["Industry", item.industry], ["Delivered in", r.deliveryTime], ["Year", item.year]].filter(([, v]) => v) as [string, string][];
    const metrics = results.filter((x) => x.label !== "Delivery");
    // "Tested in ..." is shown once, as client labels, so drop it from the included list
    const includedList = (item.compatibility || []).length ? included.filter((x) => !/^tested in/i.test(x)) : included;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
            <Navbar />
            <main className="main pj pj2">
                {/* ── Hero ── */}
                <header className="pj-hero">
                    <div className="container pj-hero-inner">
                        <div className="pj-hero-copy">
                            <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Portfolio", url: "/portfolio/" }, { label: item.title, url: `/portfolio/${slug}/` }]} />
                            {item.type && <p className="pj2-type">{item.type}</p>}
                            <h1>{item.title}</h1>
                            {item.shortDescription && <p className="pj-lead">{item.shortDescription}</p>}
                            <div className="pj-actions">
                                <Link href="/quote/" className="home-btn-primary">Get a Similar Email</Link>
                                {hasCase
                                    ? <Link href={`/case-studies/${caseStudy?.slug}/`} className="pj-btn-ghost">Read the Case Study</Link>
                                    : <a href={wa} target="_blank" rel="noopener noreferrer" className="pj-btn-ghost">Ask on WhatsApp</a>}
                            </div>
                        </div>
                        <PreviewTabs
                            title={item.title}
                            label={`${item.clientName} · ${item.esp || "HTML email"}`}
                            desktop={item.desktopImages?.[0] || item.coverImage}
                            mobile={item.mobileImages?.[0]}
                        />
                    </div>
                </header>

                {/* ── Facts bar (overlaps the hero) ── */}
                <div className="container">
                    <div className="pj2-factbox">
                        <dl className="pj2-facts">
                            {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                        </dl>
                        {metrics.length > 0 && (
                            <dl className="pj2-metrics">
                                <span className="pj2-metrics-label">Results</span>
                                {metrics.map((m) => <div key={m.label}><dd>{m.value}</dd><dt>{m.label}</dt></div>)}
                            </dl>
                        )}
                    </div>
                </div>

                {/* ── Details ── */}
                <div className="container pj2-body">
                    <article className="pj2-main">
                        {item.fullDescription && (
                            <div className="pj2-block">
                                <h2>The Project</h2>
                                {lines(item.fullDescription).map((p, i) => <p key={i}>{p}</p>)}
                                <HomeLink inline />
                            </div>
                        )}
                        {(includedList.length > 0 || (item.compatibility || []).length > 0) && (
                            <div className="pj2-block">
                                <h2>What Was Included</h2>
                                {includedList.length > 0 && <ul className="pj-included">{includedList.map((x) => <li key={x}>{tick}<span>{x}</span></li>)}</ul>}
                                {(item.compatibility || []).length > 0 && (
                                    <div className="pj2-tested">
                                        <span>Tested in</span>
                                        <ul className="pj-clients">{item.compatibility!.map((c) => <li key={c}>{c}</li>)}</ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </article>

                    <aside className="pj2-side">
                        {services.length > 0 && (
                            <div className="pj2-card">
                                <h2>Services Used</h2>
                                <ul className="pj2-services">
                                    {services.map((t) => <li key={t.slug}><Link href={`/${t.slug}/`}>{t.name}<span aria-hidden="true">→</span></Link></li>)}
                                </ul>
                            </div>
                        )}
                        {hasCase && (
                            <Link href={`/case-studies/${caseStudy?.slug}/`} className="pj2-case">
                                <span className="pj2-case-eyebrow">Case study</span>
                                <strong>How this project was planned, built and what it achieved</strong>
                                <span className="pj2-case-go">Read the story →</span>
                            </Link>
                        )}
                    </aside>
                </div>

                {gallery.length > 0 && (
                    <div className="container pj2-block">
                        <h2>More Views</h2>
                        <ul className="pj-gallery">
                            {gallery.map((g) => (
                                <li key={g.src}>
                                    <a href={g.src} target="_blank" rel="noopener noreferrer">
                                        <Image src={g.src} alt={`${item.title}: ${g.label}`} width={600} height={800} sizes="(max-width: 768px) 90vw, 300px" />
                                        <span>{g.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* ── Related projects ── */}
                {related.length > 0 && (
                    <div className="pj-related">
                        <div className="container">
                            <div className="pj-related-head">
                                <h2>More Projects</h2>
                                <Link href="/portfolio/">View full portfolio →</Link>
                            </div>
                            <ul>
                                {related.map((rel) => (
                                    <li key={rel.slug}>
                                        <Link href={`/portfolio/${rel.slug}/`}>
                                            <div className="pj-related-img">
                                                {rel.coverImage && <Image src={rel.coverImage} alt={rel.title} fill sizes="(max-width: 768px) 90vw, 360px" />}
                                            </div>
                                            <div className="pj-related-body">
                                                <span>{[rel.type, rel.esp].filter(Boolean).join(" · ")}</span>
                                                <strong>{rel.title}</strong>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <MidCTA eyebrow="Like this design?" title="Get a Custom Email Built for Your Brand" text="Share your design or brand guide and get a free quote within 24 hours." cta="Get a Free Quote" />
            </main>
            <Footer />
        </>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return withSeo(await baseGenerateMetadata({ params }), `/portfolio/${slug}/`);
}
