import { templateMeta } from "@/lib/seoTemplate";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import MidCTA from "../../components/MidCTA";
import HomeContact from "../../components/HomeContact";
import { itemTopics } from "@/lib/portfolioTopics";
import { getCaseStudies, getCaseStudy, headlineOf, lines, parseResults } from "../data";
import "../case-studies.css";
import "./case-study.css";
import HomeLink from "../../components/HomeLink";

const SITE = "https://mailstora.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const c = await getCaseStudy(slug);
    if (!c) return { title: "Case Study Not Found | MailStora", robots: { index: false } };
    const h = headlineOf(c);
    // Search title: the admin's SEO title, else the headline if it fits, else "<Client> Case Study"
    // Own SEO title first, then the case study template from Admin › SEO › General
    const tpl = await templateMeta("caseStudy", { title: h, client: c.clientName, platform: c.esp, category: c.industry, excerpt: c.caseStudy.summary || c.shortDescription || h, year: c.year });
    const title = c.caseStudy.seoTitle || tpl.title;
    const description = c.caseStudy.seoDescription || tpl.description;
    const url = `${SITE}/case-studies/${slug}/`;
    const image = c.coverImage ? [{ url: c.coverImage.startsWith("/") ? SITE + c.coverImage : c.coverImage, alt: c.title }] : [];
    return withSeo(
        {
            title,
            description,
            keywords: [`${c.clientName} case study`, `${c.esp || "email"} case study`, `${c.industry || "ecommerce"} email case study`, "email development case study", ...(c.tags || [])],
            alternates: { canonical: url },
            openGraph: { type: "article", siteName: "MailStora", title, description, url, images: image },
            twitter: { card: "summary_large_image", title, description, images: image.map((i) => i.url) },
        },
        `/case-studies/${slug}/`
    );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const c = await getCaseStudy(slug);
    if (!c) notFound();

    const cs = c.caseStudy;
    const results = parseResults(cs.results);
    const steps = lines(cs.approach);
    const included = lines(c.whatWasIncluded);
    const services = itemTopics(c);
    const others = (await getCaseStudies()).filter((x) => x.slug !== slug).slice(0, 3);
    const url = `${SITE}/case-studies/${slug}/`;
    const h = headlineOf(c);

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": `${url}#article`,
                headline: h,
                description: cs.summary || c.shortDescription,
                url,
                image: c.coverImage ? (c.coverImage.startsWith("/") ? SITE + c.coverImage : c.coverImage) : undefined,
                datePublished: c.createdAt,
                dateModified: c.updatedAt || c.createdAt,
                author: { "@id": `${SITE}/#founder` },
                publisher: { "@id": `${SITE}/#mailstora` },
                articleSection: "Case Studies",
                about: services.map((t) => ({ "@type": "Service", "@id": `${SITE}/${t.slug}/#service`, name: t.name })),
                mentions: { "@type": "Organization", name: c.clientName },
            },
            ...(cs.testimonialQuote && cs.testimonialAuthor
                ? [{
                      "@type": "Review",
                      itemReviewed: { "@id": `${SITE}/#mailstora` },
                      author: { "@type": "Person", name: cs.testimonialAuthor },
                      reviewBody: cs.testimonialQuote,
                  }]
                : []),
        ],
    };

    const facts = [["Client", c.clientName], ["Industry", c.industry], ["Platform", c.esp !== "Other" ? c.esp : ""], ["Project", c.type], ["Duration", cs.duration], ["Year", c.year]].filter(([, v]) => v) as [string, string][];
    const moreCases = others.map((o) => ({ o, r: parseResults(o.caseStudy.results)[0] }));
    const chapters = [
        cs.challenge && { n: "01", title: "The Challenge", tone: "red", body: lines(cs.challenge) },
        cs.solution && { n: "02", title: "The Solution", tone: "green", body: lines(cs.solution) },
    ].filter(Boolean) as { n: string; title: string; tone: string; body: string[] }[];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
            <Navbar />
            <main className="main csd">
                {/* ── Hero ── */}
                <header className="csd-hero">
                    <div className="container">
                        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Case Studies", url: "/case-studies/" }, { label: c.clientName, url: `/case-studies/${slug}/` }]} />
                        <div className="csd-hero-inner">
                            <div>
                                <p className="csd-eyebrow">Case study · {c.clientName}</p>
                                <h1>{h}</h1>
                                {cs.summary && <p className="csd-lead">{cs.summary}</p>}
                                <ul className="csd-tags">
                                    {facts.slice(1, 4).map(([k, v]) => <li key={k}>{v}</li>)}
                                </ul>
                            </div>
                            {c.coverImage && (
                                <div className="csd-hero-media">
                                    <div className="csd-window">
                                        <div className="csd-window-bar" aria-hidden="true"><i /><i /><i /><span>{c.clientName}</span></div>
                                        <Image src={c.coverImage} alt={c.title} width={900} height={640} priority sizes="(max-width: 1024px) 92vw, 520px" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* ── Results, overlapping the hero ── */}
                {results.length > 0 && (
                    <div className="csd-results" role="region" aria-label="Results">
                        <div className="container">
                            <ul>
                                {results.map((r) => (
                                    <li key={r.label}>
                                        <strong>{r.value}</strong>
                                        <span>{r.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="container csd-body">
                    <article className="csd-article">
                        {chapters.map((ch) => (
                            <div key={ch.n} className={`csd-chapter csd-chapter--${ch.tone}`}>
                                <span className="csd-num">{ch.n}</span>
                                <div>
                                    <h2>{ch.title}</h2>
                                    {ch.body.map((p, i) => <p key={i}>{p}</p>)}
                                </div>
                            </div>
                        ))}

                        {steps.length > 0 && (
                            <div className="csd-block">
                                <h2><span className="csd-num-inline">03</span>How We Did It</h2>
                                <ol className="csd-timeline">
                                    {steps.map((s, i) => (
                                        <li key={s}>
                                            <span className="csd-dot">{i + 1}</span>
                                            <p>{s}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}

                        {included.length > 0 && (
                            <div className="csd-block">
                                <h2><span className="csd-num-inline">04</span>What Was Delivered</h2>
                                <ul className="csd-delivered">
                                    {included.map((s) => (
                                        <li key={s}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor" /><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            <span>{s}</span>
                                        </li>
                                    ))}
                                </ul>
                                {(c.compatibility || []).length > 0 && (
                                    <p className="csd-tested">
                                        Tested in {(c.compatibility || []).map((x) => <span key={x}>{x}</span>)} in light and dark mode.
                                    </p>
                                )}
                            </div>
                        )}

                        {cs.testimonialQuote && (
                            <figure className="csd-quote">
                                <div className="csd-stars" aria-label="5 out of 5 stars">★★★★★</div>
                                <blockquote>&ldquo;{cs.testimonialQuote}&rdquo;</blockquote>
                                {cs.testimonialAuthor && (
                                    <figcaption>
                                        <span className="csd-avatar" aria-hidden="true">{cs.testimonialAuthor.charAt(0)}</span>
                                        <span><strong>{cs.testimonialAuthor}</strong>{cs.testimonialRole && <em>{cs.testimonialRole}</em>}</span>
                                    </figcaption>
                                )}
                            </figure>
                        )}

                        <HomeLink inline />
                        <Link href={`/portfolio/${c.slug}/`} className="csd-design-link">
                            <span>See the full email design</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                    </article>

                    <aside className="csd-aside">
                        <div className="csd-card">
                            <h2>Project at a Glance</h2>
                            <dl>
                                {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                            </dl>
                        </div>
                        {services.length > 0 && (
                            <div className="csd-card">
                                <h2>Services Used</h2>
                                <ul className="csd-services">
                                    {services.map((t) => <li key={t.slug}><Link href={`/${t.slug}/`}>{t.name}<span aria-hidden="true">→</span></Link></li>)}
                                </ul>
                            </div>
                        )}
                        <div className="csd-card csd-card--cta">
                            <h2>Want results like these?</h2>
                            <p>Send your design, brief or current emails and get a clear quote within 24 hours.</p>
                            <Link href="/quote/" className="home-btn-primary">Get a Free Quote</Link>
                        </div>
                    </aside>
                </div>

                {moreCases.length > 0 && (
                    <section className="csd-more">
                        <div className="container">
                            <div className="csd-more-head">
                                <h2>More Case Studies</h2>
                                <Link href="/case-studies/">All case studies →</Link>
                            </div>
                            <ul>
                                {moreCases.map(({ o, r }) => (
                                    <li key={o.slug}>
                                        <Link href={`/case-studies/${o.slug}/`}>
                                            <div className="csd-more-img">
                                                {o.coverImage && <Image src={o.coverImage} alt={o.title} fill sizes="(max-width: 768px) 92vw, 360px" />}
                                                {r && <span>{r.value} <em>{r.label}</em></span>}
                                            </div>
                                            <div className="csd-more-body">
                                                <p>{o.clientName}</p>
                                                <strong>{headlineOf(o)}</strong>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                <MidCTA eyebrow="Your project next" title="Get Hand-Coded Emails That Work in Every Inbox" text="Share your design or brief and get a free quote within 24 hours." cta="Get a Free Quote" />
                <HomeContact />
            </main>
            <Footer />
        </>
    );
}
