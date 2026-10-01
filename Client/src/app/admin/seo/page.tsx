"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { seoFetch } from "./seoApi";
import "./seo-admin.css";

type Overview = {
    entries: number;
    noindex: number;
    redirects: number;
    activeRedirects: number;
    notFound: number;
    topNotFound: { _id: string; path: string; hits: number }[];
    webmasterConnected: string[];
    analyticsConnected: string[];
};

type Audit = { _id: string; createdAt: string; average: number; pages: number; issues: number; results: { path: string; score: number; issues: number }[] };

/** Small line chart of the average SEO score per audit run */
function Trend({ runs }: { runs: Audit[] }) {
    const pts = [...runs].reverse();
    if (pts.length < 2) return <p className="seo-help">Run the audit again later to see the trend.</p>;
    const w = 520, h = 120, pad = 8;
    const x = (i: number) => pad + (i * (w - pad * 2)) / (pts.length - 1);
    const y = (v: number) => h - pad - (v / 100) * (h - pad * 2);
    const d = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.average).toFixed(1)}`).join(" ");
    return (
        <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 130 }} role="img" aria-label="SEO score trend">
            {[50, 80].map((g) => <line key={g} x1={pad} x2={w - pad} y1={y(g)} y2={y(g)} stroke="#e5e7eb" strokeDasharray="4 4" />)}
            <path d={d} fill="none" stroke="#f97316" strokeWidth="2.5" />
            {pts.map((p, i) => <circle key={p._id} cx={x(i)} cy={y(p.average)} r="3.5" fill="#f97316"><title>{`${new Date(p.createdAt).toLocaleDateString()}: ${p.average}`}</title></circle>)}
        </svg>
    );
}

const LABELS: Record<string, string> = { google: "Google", bing: "Bing", yandex: "Yandex", pinterest: "Pinterest", ga4: "GA4", gtm: "Tag Manager", clarity: "Clarity", metaPixel: "Meta Pixel" };

export default function SeoDashboard() {
    const [data, setData] = useState<Overview | null>(null);
    const [error, setError] = useState("");
    const [audits, setAudits] = useState<Audit[]>([]);

    useEffect(() => {
        seoFetch<Overview>("/admin/overview").then(setData).catch((e) => setError(e.message));
        seoFetch<Audit[]>("/admin/audits").then(setAudits).catch(() => {});
    }, []);
    const last = audits[0];
    const prev = audits[1];

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>SEO Dashboard</h1>
                <p>Redirects, 404 errors, search engine verification and tracking for mailstora.com.</p>
            </header>

            {error && <p className="seo-msg seo-msg--err">{error}</p>}

            {data && (
                <>
                    <div className="seo-stats">
                        <div className="seo-stat"><span>Active redirects</span><strong>{data.activeRedirects}</strong></div>
                        <div className="seo-stat"><span>404 errors</span><strong>{data.notFound}</strong></div>
                        <div className="seo-stat"><span>Pages with SEO edits</span><strong>{data.entries}</strong></div>
                        <div className="seo-stat"><span>Noindex pages</span><strong>{data.noindex}</strong></div>
                    </div>

                    <section className="seo-card">
                        <div className="seo-row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
                            <h2 style={{ margin: 0 }}>Site SEO Score</h2>
                            <Link href="/admin/seo/pages">Run a new audit →</Link>
                        </div>
                        {!last ? (
                            <p className="seo-empty">No audit yet. Open Pages &amp; Posts SEO and click Run SEO Audit.</p>
                        ) : (
                            <div className="seo-grid-2" style={{ alignItems: "center" }}>
                                <div>
                                    <p style={{ fontSize: "3rem", fontWeight: 800, margin: 0, color: last.average >= 80 ? "#16a34a" : last.average >= 50 ? "#f59e0b" : "#dc2626" }}>
                                        {last.average}<span style={{ fontSize: "1.2rem", color: "#94a3b8" }}>/100</span>
                                        {prev && <span style={{ fontSize: "1rem", marginLeft: 10, color: last.average >= prev.average ? "#16a34a" : "#dc2626" }}>{last.average >= prev.average ? "▲" : "▼"} {Math.abs(last.average - prev.average)}</span>}
                                    </p>
                                    <p className="seo-help">{last.pages} pages · {last.issues} issues · {new Date(last.createdAt).toLocaleString()}</p>
                                    <p style={{ margin: "0.5rem 0 0.25rem", fontWeight: 700 }}>Needs attention</p>
                                    <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
                                        {[...last.results].sort((a, b) => a.score - b.score).slice(0, 5).map((r) => (
                                            <li key={r.path}><Link href={`/admin/seo/pages/edit?path=${encodeURIComponent(r.path)}`}>{r.path}</Link> ({r.score})</li>
                                        ))}
                                    </ul>
                                </div>
                                <Trend runs={audits} />
                            </div>
                        )}
                    </section>

                    <div className="seo-grid-2">
                        <section className="seo-card">
                            <h2>Search engines and tracking</h2>
                            {[...data.webmasterConnected, ...data.analyticsConnected].length === 0 ? (
                                <p className="seo-msg seo-msg--err">Nothing connected yet. Add your Google Search Console code and GA4 ID in Webmaster Tools.</p>
                            ) : (
                                <p style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                                    {[...data.webmasterConnected, ...data.analyticsConnected].map((k) => (
                                        <span key={k} className="seo-pill seo-pill--on">✓ {LABELS[k] || k}</span>
                                    ))}
                                </p>
                            )}
                            <p style={{ marginTop: "1rem" }}><Link href="/admin/seo/webmaster" className="seo-btn" style={{ textDecoration: "none" }}>Open Webmaster Tools</Link></p>
                        </section>

                        <section className="seo-card">
                            <h2>Most requested missing pages</h2>
                            {data.topNotFound.length === 0 ? (
                                <p className="seo-empty">No 404 errors recorded. 👍</p>
                            ) : (
                                <table className="seo-table">
                                    <tbody>
                                        {data.topNotFound.map((n) => (
                                            <tr key={n._id}><td><code>{n.path}</code></td><td>{n.hits} hits</td></tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            <p style={{ marginTop: "1rem" }}><Link href="/admin/seo/404">View 404 Monitor →</Link></p>
                        </section>
                    </div>
                </>
            )}

            <div className="seo-links">
                <Link href="/admin/seo/redirects"><strong>Redirections</strong><span>Send old URLs to new pages (301, 302, 410).</span></Link>
                <Link href="/admin/seo/404"><strong>404 Monitor</strong><span>See broken URLs visitors hit and fix them.</span></Link>
                <Link href="/admin/seo/link-map"><strong>Link Map</strong><span>Internal links per page, orphan pages and link ideas.</span></Link>
                <Link href="/admin/seo/keywords"><strong>Keyword Manager</strong><span>All focus keywords, conflicts and missing keywords.</span></Link>
                <Link href="/admin/seo/webmaster"><strong>Webmaster Tools</strong><span>Search Console, Bing, GA4, GTM and robots.txt.</span></Link>
            </div>
        </div>
    );
}
