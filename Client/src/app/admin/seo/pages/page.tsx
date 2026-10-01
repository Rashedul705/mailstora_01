"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { seoFetch } from "../seoApi";
import { checks, fetchPage, score, scoreColor, sitemapPaths } from "../analyze";
import "../seo-admin.css";

type Entry = { path: string; focusKeyword?: string; title?: string; noindex?: boolean };
type Row = { path: string; title?: string; score?: number; issues?: number; words?: number; schema?: string; edited: boolean; noindex: boolean };

const group = (p: string) =>
    p === "/" ? "Home" : p.startsWith("/blog/") && p !== "/blog/" ? "Blog posts" : p.startsWith("/portfolio/") && p !== "/portfolio/" ? "Portfolio" : "Pages";

export default function SeoPages() {
    const [rows, setRows] = useState<Row[]>([]);
    const [entries, setEntries] = useState<Record<string, Entry>>({});
    const [running, setRunning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all([sitemapPaths(), seoFetch<Entry[]>("/admin/entries")])
            .then(([paths, list]) => {
                const map = Object.fromEntries(list.map((e) => [e.path, e]));
                setEntries(map);
                const all = Array.from(new Set([...paths, ...list.map((e) => e.path)]));
                setRows(all.map((p) => ({ path: p, edited: !!map[p], noindex: !!map[p]?.noindex })));
            })
            .catch((e) => setError(e.message));
    }, []);

    const audit = async () => {
        setRunning(true);
        setProgress(0);
        const next = [...rows];
        for (let i = 0; i < next.length; i++) {
            try {
                const d = await fetchPage(next[i].path);
                const list = checks(d, entries[next[i].path]?.focusKeyword || "");
                next[i] = { ...next[i], title: d.title, score: score(list), issues: list.filter((c) => !c.ok).length, words: d.words, schema: d.schemaTypes.join(", ") };
            } catch {
                next[i] = { ...next[i], title: "Could not load", score: 0 };
            }
            setProgress(i + 1);
            setRows([...next]);
        }
        // Save the run so the dashboard can show the score trend
        seoFetch("/admin/audits", { method: "POST", body: JSON.stringify({ results: next.filter((r) => r.score !== undefined).map((r) => ({ path: r.path, score: r.score, issues: r.issues, words: r.words })) }) }).catch(() => {});
        setRunning(false);
    };

    const shown = rows.filter((r) => !filter || r.path.includes(filter.toLowerCase()) || (r.title || "").toLowerCase().includes(filter.toLowerCase()));
    const scored = rows.filter((r) => r.score !== undefined);
    const avg = scored.length ? Math.round(scored.reduce((n, r) => n + (r.score || 0), 0) / scored.length) : null;

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>Pages & Posts SEO</h1>
                <p>Every page in the sitemap. Run the audit to score each page, then open a page to edit its title, description, schema and indexing.</p>
            </header>
            {error && <p className="seo-msg seo-msg--err">{error}</p>}

            <div className="seo-stats">
                <div className="seo-stat"><span>URLs</span><strong>{rows.length}</strong></div>
                <div className="seo-stat"><span>Average score</span><strong style={{ color: avg !== null ? scoreColor(avg) : undefined }}>{avg ?? "–"}</strong></div>
                <div className="seo-stat"><span>Customised</span><strong>{Object.keys(entries).length}</strong></div>
                <div className="seo-stat"><span>Needs work (&lt;50)</span><strong>{scored.filter((r) => (r.score || 0) < 50).length}</strong></div>
            </div>

            <section className="seo-card">
                <div className="seo-row" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div className="seo-field" style={{ maxWidth: 320 }}>
                        <input placeholder="Search pages" value={filter} onChange={(e) => setFilter(e.target.value)} />
                    </div>
                    <button type="button" className="seo-btn" onClick={audit} disabled={running || !rows.length}>
                        {running ? `Auditing ${progress}/${rows.length}...` : "Run SEO Audit"}
                    </button>
                </div>
                <table className="seo-table">
                    <thead>
                        <tr><th>Page</th><th>Type</th><th>Score</th><th>Issues</th><th>Words</th><th>Schema</th><th></th></tr>
                    </thead>
                    <tbody>
                        {shown.map((r) => (
                            <tr key={r.path}>
                                <td>
                                    <code>{r.path}</code>
                                    {r.title && <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 4 }}>{r.title}</div>}
                                    {r.edited && <span className="seo-pill" style={{ marginTop: 4 }}>Customised</span>} {r.noindex && <span className="seo-pill seo-pill--off">noindex</span>}
                                </td>
                                <td>{group(r.path)}</td>
                                <td>{r.score !== undefined ? <strong style={{ color: scoreColor(r.score) }}>{r.score}</strong> : "–"}</td>
                                <td>{r.issues ?? "–"}</td>
                                <td>{r.words ?? "–"}</td>
                                <td style={{ fontSize: "0.8rem", maxWidth: 220 }}>{r.schema || "–"}</td>
                                <td><Link href={`/admin/seo/pages/edit?path=${encodeURIComponent(r.path)}`} className="seo-btn" style={{ padding: "0.35rem 0.8rem", fontSize: "0.8rem", textDecoration: "none" }}>Edit SEO</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
