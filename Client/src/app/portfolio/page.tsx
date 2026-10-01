import Link from "next/link";
import { pageMeta } from "@/lib/pageMeta";
import { withSeo } from "@/lib/seo";
import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import PageDecor from "../components/PageDecor";
import MidCTA from "../components/MidCTA";
import HomeContact from "../components/HomeContact";
import "./PortfolioPage.css";
import "./portfolio-v2.css";
import PortfolioClient from "./PortfolioClient";
import { getCaseStudies } from "../case-studies/data";
import { siteConfig } from "../../utils/siteConfig";
import HomeLink from "../components/HomeLink";

const baseMetadata = (): Metadata => pageMeta("/portfolio/");

export async function generateMetadata(): Promise<Metadata> {
    return withSeo(baseMetadata());
}

type ProjectLink = { slug: string; title: string; type?: string; esp?: string; clientName?: string; coverImage?: string; results?: { customMetric?: string; openRate?: string }; caseStudy?: { enabled?: boolean; headline?: string; summary?: string; results?: string } };

async function getPortfolioData() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    
    try {
        const [statsRes, featuredRes, itemsRes, allRes] = await Promise.all([
            fetch(`${API_BASE}/api/portfolio/counts`, { cache: 'no-store' }).catch(() => null),
            fetch(`${API_BASE}/api/portfolio/featured`, { cache: 'no-store' }).catch(() => null),
            fetch(`${API_BASE}/api/portfolio?page=1&limit=9&sort=latest`, { cache: 'no-store' }).catch(() => null),
            fetch(`${API_BASE}/api/portfolio?page=1&limit=200&sort=latest`, { cache: 'no-store' }).catch(() => null)
        ]);

        return {
            stats: statsRes && statsRes.ok ? await statsRes.json() : { total: 400, emailTemplates: 0, emailSignatures: 0, caseStudies: 0 },
            featured: featuredRes && featuredRes.ok ? await featuredRes.json() : [],
            itemsData: itemsRes && itemsRes.ok ? await itemsRes.json() : { items: [], totalPages: 1 },
            all: (allRes && allRes.ok ? (await allRes.json()).items || [] : []) as ProjectLink[]
        };
    } catch (e) {
        return {
            stats: { total: 400, emailTemplates: 0, emailSignatures: 0, caseStudies: 0 },
            featured: [],
            itemsData: { items: [], totalPages: 1 },
            all: [] as ProjectLink[]
        };
    }
}

export default async function PortfolioPage() {
    const { stats, featured, itemsData, all } = await getPortfolioData();
    const allCases = await getCaseStudies();
    const cases = allCases.slice(0, 4);
    const caseSlugs = Object.fromEntries(allCases.filter((c) => c.portfolioSlug).map((c) => [c.portfolioSlug as string, c.slug]));

    return (
        <>
            <Navbar />
            <main className="main portfolio-page-wrapper">
                <PageDecor />
                <PageHero
                    eyebrow="Our Portfolio"
                    title={<>HTML Email Template <span>Portfolio</span></>}
                    lead="Hand-coded email templates, newsletters, transactional emails and signatures for brands in every industry, tested in Gmail, Outlook, Apple Mail and 50+ email clients."
                    crumbs={[{ label: "Home", url: "/" }, { label: "Portfolio", url: "/portfolio/" }]}
                >
                    <ul className="ph-trust">
                        <li>{stats.total}+ templates built</li>
                        <li>{siteConfig.stats.clientsServed} happy clients</li>
                        <li>Klaviyo, Mailchimp, HubSpot and more</li>
                    </ul>
                </PageHero>

                <PortfolioClient
                    initialItems={itemsData.items}
                    initialStats={stats}
                    initialFeatured={featured}
                    initialTotalPages={itemsData.totalPages}
                    allItems={all}
                    caseSlugs={caseSlugs}
                />

                {/* ── Case studies ── */}
                {cases.length > 0 && (
                    <section className="pf-cases" aria-labelledby="pf-cases-title">
                        <div className="container">
                            <div className="pf-section-head">
                                <div>
                                    <p className="home-eyebrow">Results, not just designs</p>
                                    <h2 id="pf-cases-title">Case Studies</h2>
                                </div>
                                <Link href="/case-studies/">All case studies →</Link>
                            </div>
                            <ul className="pf-cases-grid">
                                {cases.map((c) => (
                                    <li key={c.slug}>
                                        <Link href={`/case-studies/${c.slug}/`}>
                                            <span className="pf-case-result">{(c.caseStudy.results || "").split("\n")[0]?.split("|")[0]?.trim() || "Case study"}</span>
                                            <strong>{c.caseStudy.headline || c.title}</strong>
                                            <span className="pf-case-client">{[c.clientName, c.esp].filter(Boolean).join(" · ")}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                {/* ── Project index: plain links to every project, grouped by type (also lets search engines reach every item) ── */}
                {all.length > 0 && (
                    <nav className="pf-index" aria-labelledby="pf-index-title">
                        <div className="container">
                            <div className="pf-section-head">
                                <div>
                                    <p className="home-eyebrow">Browse by type</p>
                                    <h2 id="pf-index-title">Project Index</h2>
                                </div>
                                <span className="pf-index-count">{all.length} projects</span>
                            </div>
                            <div className="pf-index-groups">
                                {Object.entries(all.reduce<Record<string, ProjectLink[]>>((g, p) => ((g[p.type || "Other"] ||= []).push(p), g), {})).map(([type, list]) => (
                                    <div key={type} className="pf-index-group">
                                        <h3>{type}<span>{list.length}</span></h3>
                                        <ul>
                                            {list.map((p) => (
                                                <li key={p.slug}>
                                                    <Link href={`/portfolio/${p.slug}/`}>
                                                        <span>{p.title}</span>
                                                        {p.esp && p.esp !== "Other" && <em>{p.esp}</em>}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </nav>
                )}

                <HomeLink />

                <MidCTA
                    eyebrow="Like what you see?"
                    title="Get a Custom Email Template Built for Your Brand"
                    text="Share your design or brand guide and get a free quote within 24 hours."
                    cta="Get a Free Quote"
                />
                <HomeContact />
            </main>
            <Footer />
        </>
    );
}
