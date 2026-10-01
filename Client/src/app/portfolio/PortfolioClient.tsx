'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

type Item = {
    _id?: string;
    slug: string;
    title: string;
    clientName?: string;
    type?: string;
    esp?: string;
    industry?: string;
    coverImage?: string;
    shortDescription?: string;
    compatibility?: string[];
    results?: { openRate?: string; clickRate?: string; deliveryTime?: string; customMetric?: string };
    caseStudy?: { enabled?: boolean };
};

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

/** The strongest real result on a project, for the card badge (never invented) */
const headline = (i: Item) => i.results?.customMetric || (i.results?.openRate ? `${i.results.openRate} open rate` : '');

function ProjectCard({ item, caseSlug }: { item: Item; caseSlug?: string }) {
    const result = headline(item);
    return (
        <article className="pf-card">
            <Link href={`/portfolio/${item.slug}/`} className="pf-card-link" aria-label={`View ${item.title}`}>
                <div className="pf-card-media">
                    {item.coverImage && (
                        <Image src={item.coverImage} alt={item.title} width={600} height={800} sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 360px" />
                    )}
                    <span className="pf-card-type">{item.type || 'Email Template'}</span>
                    {result && <span className="pf-card-result">{result}</span>}
                </div>
                <div className="pf-card-body">
                    <p className="pf-card-meta">{[item.esp, item.industry].filter(Boolean).join(' · ')}</p>
                    <h3>{item.title}</h3>
                    {item.clientName && <p className="pf-card-client">for {item.clientName}</p>}
                    <span className="pf-card-cta">{caseSlug ? 'Project + case study →' : 'View project →'}</span>
                </div>
            </Link>
        </article>
    );
}

export default function PortfolioClient({ initialItems, initialStats, initialFeatured, initialTotalPages, allItems = [], caseSlugs = {} }: {
    caseSlugs?: Record<string, string>; // portfolio slug -> case study slug
    initialItems: Item[];
    initialStats: { total: number; emailTemplates: number; emailSignatures: number; caseStudies: number };
    initialFeatured: Item[];
    initialTotalPages: number;
    allItems?: Item[];
}) {
    const [items, setItems] = useState<Item[]>(initialItems || []);
    const featured = (initialFeatured || [])[0];
    const stats = initialStats || { total: 0, emailTemplates: 0, emailSignatures: 0, caseStudies: 0 };
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
    const [activeTab, setActiveTab] = useState('');
    const [activeEsp, setActiveEsp] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sort, setSort] = useState('latest');
    const [isFirstRender, setIsFirstRender] = useState(true);
    const limit = 9;

    // Only show platform filters that have projects
    const esps = [...new Set(allItems.map((i) => i.esp).filter((e): e is string => !!e && e !== 'Other'))].sort();

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        const fetchItems = async () => {
            const q = new URLSearchParams({ page: String(page), limit: String(limit), sort });
            if (activeTab) q.set('type', activeTab);
            if (activeEsp) q.set('esp', activeEsp);
            if (searchQuery) q.set('q', searchQuery);
            try {
                const data = await (await fetch(`${API}/api/portfolio?${q}`)).json();
                setItems(data.items || []);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                console.error(err);
            }
        };
        const timer = setTimeout(fetchItems, 250);
        return () => clearTimeout(timer);
    }, [page, activeTab, activeEsp, sort, searchQuery, isFirstRender]);

    const tabs: [string, string, number][] = [
        ['', 'All Work', stats.total],
        ['Email Template', 'Email Templates', stats.emailTemplates],
        ['Email Signature', 'Email Signatures', stats.emailSignatures],
    ];
    const showFeatured = page === 1 && !activeTab && !activeEsp && !searchQuery && featured;

    return (
        <section className="pf-main">
            <div className="container">
                {/* ── Filters ── */}
                <div className="pf-toolbar">
                    <div className="pf-tabs" role="tablist">
                        {tabs.filter(([, , n], i) => i === 0 || n > 0).map(([value, label, count]) => (
                            <button key={label} role="tab" aria-selected={activeTab === value} className={`pf-tab ${activeTab === value ? 'is-active' : ''}`} onClick={() => { setActiveTab(value); setPage(1); }}>
                                {label} <span>{count}</span>
                            </button>
                        ))}
                    </div>
                    <div className="pf-tools">
                        <label className="pf-search">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
                            <input type="search" placeholder="Search projects" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} aria-label="Search projects" />
                        </label>
                        <select className="pf-sort" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} aria-label="Sort projects">
                            <option value="latest">Latest</option>
                            <option value="popular">Most viewed</option>
                        </select>
                    </div>
                </div>
                {esps.length > 1 && (
                    <div className="pf-esps" aria-label="Filter by platform">
                        <button className={`pf-esp ${activeEsp === '' ? 'is-active' : ''}`} onClick={() => { setActiveEsp(''); setPage(1); }}>All platforms</button>
                        {esps.map((esp) => (
                            <button key={esp} className={`pf-esp ${activeEsp === esp ? 'is-active' : ''}`} onClick={() => { setActiveEsp(esp); setPage(1); }}>{esp}</button>
                        ))}
                    </div>
                )}

                {/* ── Featured project ── */}
                {showFeatured && (
                    <article className="pf-featured">
                        <div className="pf-featured-copy">
                            <span className="pf-featured-badge">★ Featured project</span>
                            <h2>{featured.title}</h2>
                            {featured.shortDescription && <p>{featured.shortDescription}</p>}
                            <ul className="pf-featured-facts">
                                {featured.clientName && <li><span>Client</span><strong>{featured.clientName}</strong></li>}
                                {featured.esp && <li><span>Platform</span><strong>{featured.esp}</strong></li>}
                                {featured.results?.deliveryTime && <li><span>Delivered in</span><strong>{featured.results.deliveryTime}</strong></li>}
                                {featured.results?.openRate && <li><span>Open rate</span><strong>{featured.results.openRate}</strong></li>}
                            </ul>
                            <div className="pf-featured-actions">
                                <Link href={`/portfolio/${featured.slug}/`} className="home-btn-primary">View Project</Link>
                                {caseSlugs[featured.slug]
                                    ? <Link href={`/case-studies/${caseSlugs[featured.slug]}/`} className="pf-btn-ghost">Read the Case Study</Link>
                                    : <Link href="/quote/" className="pf-btn-ghost">Get Something Similar</Link>}
                            </div>
                        </div>
                        <Link href={`/portfolio/${featured.slug}/`} className="pf-featured-media" aria-label={`View ${featured.title}`}>
                            {featured.coverImage && <Image src={featured.coverImage} alt={featured.title} width={900} height={700} sizes="(max-width: 1024px) 92vw, 560px" />}
                        </Link>
                    </article>
                )}

                {/* ── Grid ── */}
                {items.length === 0 ? (
                    <div className="pf-empty">
                        <p>No projects match these filters.</p>
                        <button className="pf-btn-ghost" onClick={() => { setActiveTab(''); setActiveEsp(''); setSearchQuery(''); setPage(1); }}>Clear filters</button>
                    </div>
                ) : (
                    <div className="pf-grid">
                        {items.map((item) => <ProjectCard key={item.slug} item={item} caseSlug={caseSlugs[item.slug]} />)}
                    </div>
                )}

                {totalPages > 1 && (
                    <nav className="pf-pagination" aria-label="Portfolio pages">
                        <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>← Prev</button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i} className={page === i + 1 ? 'is-active' : ''} aria-current={page === i + 1 ? 'page' : undefined} onClick={() => setPage(i + 1)}>{i + 1}</button>
                        ))}
                        <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next →</button>
                    </nav>
                )}
            </div>
        </section>
    );
}
