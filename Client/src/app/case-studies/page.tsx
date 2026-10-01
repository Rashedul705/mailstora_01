import { withSeo } from "@/lib/seo";
import { pageMeta } from "@/lib/pageMeta";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import MidCTA from "../components/MidCTA";
import HomeContact from "../components/HomeContact";
import { itemTopics } from "@/lib/portfolioTopics";
import { siteConfig } from "../../utils/siteConfig";
import { getCaseStudies, headlineOf, parseResults, type CaseStudyItem } from "./data";
import "./case-studies.css";
import HomeLink from "../components/HomeLink";

const SITE = "https://mailstora.com";

export async function generateMetadata(): Promise<Metadata> {
    const items = await getCaseStudies();
    const meta = await withSeo(pageMeta("/case-studies/"));
    // An empty hub is thin content: keep it out of the index until the first case study is published
    return items.length ? meta : { ...meta, robots: { index: false, follow: true } };
}

const STEPS = [
    { title: "Audit", text: "We review the current emails, platform setup and the numbers that matter." },
    { title: "Plan", text: "We agree the goal, the scope and how success will be measured." },
    { title: "Build and test", text: "Hand-coded emails and flows, tested in 50+ email clients and dark mode." },
    { title: "Measure", text: "We track opens, clicks, revenue or completion and report the results." },
];

const FAQS = () => [
    { q: "Are these case studies from real clients?", a: "Yes. Every case study on this page is a real MailStora project, and the results come from the client's own email platform reports." },
    { q: "What kind of results can I expect?", a: "It depends on your starting point, audience and platform. Most clients see fewer broken emails, faster production and better engagement once templates and flows are rebuilt properly. We agree clear goals before any project starts." },
    { q: "Which platforms do these projects cover?", a: "The case studies cover Klaviyo, Mailchimp, Outlook and Gmail signatures. MailStora also works with HubSpot, Salesforce Marketing Cloud, Brevo, ActiveCampaign and other email platforms." },
    { q: "How do I start a project like these?", a: `Send your design, brief or current emails through the quote form. You get a clear price and timeline within 24 hours, and most single templates are delivered in ${siteConfig.stats.turnaround}.` },
];

const firstResult = (c: CaseStudyItem) => parseResults(c.caseStudy.results)[0];

function CaseCard({ c }: { c: CaseStudyItem }) {
    const results = parseResults(c.caseStudy.results).slice(0, 3);
    return (
        <li className="csh-card">
            <Link href={`/case-studies/${c.slug}/`}>
                <div className="csh-card-media">
                    {c.coverImage && <Image src={c.coverImage} alt={c.title} width={640} height={420} sizes="(max-width: 768px) 92vw, 380px" />}
                    <span className="csh-card-client">{c.clientName}</span>
                </div>
                <div className="csh-card-body">
                    <ul className="csh-chips">{[c.industry, c.esp !== "Other" ? c.esp : "", c.type].filter(Boolean).map((t) => <li key={t}>{t}</li>)}</ul>
                    <h3>{headlineOf(c)}</h3>
                    {c.caseStudy.summary && <p>{c.caseStudy.summary}</p>}
                    {results.length > 0 && (
                        <ul className="csh-results">
                            {results.map((r) => <li key={r.label}><strong>{r.value}</strong><span>{r.label}</span></li>)}
                        </ul>
                    )}
                    <span className="csh-read">Read the case study →</span>
                </div>
            </Link>
        </li>
    );
}

export default async function CaseStudiesPage() {
    const items = await getCaseStudies();
    const [featured, ...rest] = items;
    const highlights = items.map((c) => ({ c, r: firstResult(c) })).filter((x) => x.r).slice(0, 4);
    const platforms = [...new Set(items.map((c) => c.esp).filter((e) => e && e !== "Other"))];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": `${SITE}/case-studies/#page`,
                name: "Email Development Case Studies",
                description: "Real MailStora projects: HTML email templates, Klaviyo flows, Outlook fixes and email signatures, with the challenge, solution and measured results.",
                url: `${SITE}/case-studies/`,
                isPartOf: { "@id": `${SITE}/#website` },
                about: { "@id": `${SITE}/#mailstora` },
                mainEntity: {
                    "@type": "ItemList",
                    numberOfItems: items.length,
                    itemListElement: items.map((c, i) => ({
                        "@type": "ListItem",
                        position: i + 1,
                        url: `${SITE}/case-studies/${c.slug}/`,
                        name: headlineOf(c),
                    })),
                },
            },
            {
                "@type": "FAQPage",
                mainEntity: FAQS().map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
            <Navbar />
            <main className="main csh">
                {/* ── Hero ── */}
                <header className="csh-hero">
                    <div className="container">
                        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Case Studies", url: "/case-studies/" }]} />
                        <div className="csh-hero-inner">
                            <div>
                                <p className="csh-eyebrow">Real projects · Real numbers</p>
                                <h1>Email Development Case Studies With <span>Measured Results</span></h1>
                                <p className="csh-lead">
                                    How MailStora fixed broken templates, built Klaviyo flows and rolled out email signatures for real brands:
                                    the problem each client had, what we built, and the numbers after launch.
                                </p>
                                <div className="csh-actions">
                                    <Link href="/quote/" className="home-btn-primary">Get a Free Quote</Link>
                                    <Link href="/portfolio/" className="csh-btn-ghost">View the Portfolio</Link>
                                </div>
                            </div>
                            {highlights.length > 0 && (
                                <ul className="csh-highlights" aria-label="Result highlights">
                                    {highlights.map(({ c, r }) => (
                                        <li key={c.slug}>
                                            <strong>{r!.value}</strong>
                                            <span>{r!.label}</span>
                                            <em>{c.clientName}</em>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </header>

                {items.length === 0 ? (
                    <section className="cs-section">
                        <div className="container cs-empty">
                            <h2>Case studies are on the way</h2>
                            <p>We are writing up recent projects with their results. Meanwhile, browse finished work in the portfolio.</p>
                            <Link href="/portfolio/" className="home-btn-primary">View the Portfolio</Link>
                        </div>
                    </section>
                ) : (
                    <>
                        {/* ── Featured case study ── */}
                        {featured && (
                            <section className="csh-featured-wrap" aria-label="Featured case study">
                                <div className="container">
                                    <Link href={`/case-studies/${featured.slug}/`} className="csh-featured">
                                        <div className="csh-featured-media">
                                            {featured.coverImage && <Image src={featured.coverImage} alt={featured.title} width={900} height={640} priority sizes="(max-width: 1024px) 92vw, 560px" />}
                                        </div>
                                        <div className="csh-featured-body">
                                            <span className="csh-badge">Featured case study</span>
                                            <p className="csh-featured-meta">{[featured.clientName, featured.industry, featured.esp !== "Other" ? featured.esp : ""].filter(Boolean).join(" · ")}</p>
                                            <h2>{headlineOf(featured)}</h2>
                                            {featured.caseStudy.summary && <p>{featured.caseStudy.summary}</p>}
                                            <ul className="csh-results csh-results--lg">
                                                {parseResults(featured.caseStudy.results).slice(0, 3).map((r) => <li key={r.label}><strong>{r.value}</strong><span>{r.label}</span></li>)}
                                            </ul>
                                            <span className="csh-read">Read the full story →</span>
                                        </div>
                                    </Link>
                                </div>
                            </section>
                        )}

                        {/* ── All case studies ── */}
                        {rest.length > 0 && (
                            <section className="cs-section" aria-labelledby="csh-all">
                                <div className="container">
                                    <div className="csh-head">
                                        <h2 id="csh-all">More Case Studies</h2>
                                        {platforms.length > 0 && <p>Platforms: {platforms.join(", ")}</p>}
                                    </div>
                                    <ul className="csh-grid">{rest.map((c) => <CaseCard key={c.slug} c={c} />)}</ul>
                                </div>
                            </section>
                        )}

                        {/* ── Services behind the results (internal links) ── */}
                        <section className="csh-services" aria-labelledby="csh-services-title">
                            <div className="container">
                                <h2 id="csh-services-title">Services Behind These Results</h2>
                                <ul>
                                    {[...new Map(items.flatMap((c) => itemTopics(c)).map((t) => [t.slug, t])).values()].map((t) => (
                                        <li key={t.slug}><Link href={`/${t.slug}/`}>{t.name}<span aria-hidden="true">→</span></Link></li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </>
                )}

                {/* ── How we work ── */}
                <section className="cs-section csh-process" aria-labelledby="csh-process-title">
                    <div className="container">
                        <div className="csh-head csh-head--center">
                            <p className="home-eyebrow">How Every Project Works</p>
                            <h2 id="csh-process-title">From Problem to Measured Result</h2>
                        </div>
                        <ol className="csh-steps">
                            {STEPS.map((s, i) => (
                                <li key={s.title}>
                                    <span>{String(i + 1).padStart(2, "0")}</span>
                                    <h3>{s.title}</h3>
                                    <p>{s.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section className="cs-section csh-faq" aria-labelledby="csh-faq-title">
                    <div className="container">
                        <div className="csh-head csh-head--center">
                            <p className="home-eyebrow">Questions</p>
                            <h2 id="csh-faq-title">About Our Case Studies</h2>
                        </div>
                        <div className="csh-faq-list">
                            {FAQS().map((f) => (
                                <details key={f.q}>
                                    <summary>{f.q}</summary>
                                    <p>{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <HomeLink />

                <MidCTA eyebrow="Your project next" title="Get Results Like These for Your Emails" text="Share your design or brief and get a free quote within 24 hours." cta="Get a Free Quote" />
                <HomeContact />
            </main>
            <Footer />
        </>
    );
}
