"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { seoFetch } from "../seoApi";
import { mapLimit, sitemapPaths } from "../analyze";
import { SERVICE_KEYWORDS } from "../../../components/service/seoMeta";
import "../seo-admin.css";

type Entry = { path: string; focusKeyword?: string; title?: string };
type Row = { path: string; keyword: string; source: "admin" | "built-in" | "none"; title: string; h1: string; inTitle: boolean; inH1: boolean; conflicts: string[] };

const lc = (s: string) => s.toLowerCase().trim();

export default function KeywordManager() {
    const [rows, setRows] = useState<Row[]>([]);
    const [step, setStep] = useState("");
    const [filter, setFilter] = useState<"problems" | "all">("problems");

    const run = async () => {
        setStep("Loading");
        const [paths, entries] = await Promise.all([sitemapPaths(), seoFetch<Entry[]>("/admin/entries")]);
        const byPath = Object.fromEntries(entries.map((e) => [e.path, e]));
        const base: Row[] = await mapLimit(paths, 6, async (p) => {
            const admin = byPath[p]?.focusKeyword?.trim();
            const builtIn = SERVICE_KEYWORDS[p.replace(/\//g, "")]?.[0];
            let title = "", h1 = "", metaKw = "";
            try {
                const doc = new DOMParser().parseFromString(await (await fetch(p, { cache: "no-store" })).text(), "text/html");
                title = doc.querySelector("title")?.textContent || "";
                h1 = doc.querySelector("h1")?.textContent || "";
                // First meta keyword is the page's planned primary keyword
                metaKw = (doc.querySelector('meta[name="keywords"]')?.getAttribute("content") || "").split(",")[0].trim();
            } catch { /* skip */ }
            const keyword = admin || builtIn || metaKw || "";
            return { path: p, keyword, source: (admin ? "admin" : builtIn || metaKw ? "built-in" : "none") as Row["source"], title, h1, inTitle: !!keyword && lc(title).includes(lc(keyword)), inH1: !!keyword && lc(h1).includes(lc(keyword)), conflicts: [] as string[] };
        }, (n) => setStep(`Reading ${n}/${paths.length}`));
        // Cannibalisation: the same keyword targeted by two pages, or a page's keyword leading another page's title
        for (const r of base) {
            if (!r.keyword) continue;
            r.conflicts = base.filter((o) => o.path !== r.path && ((o.keyword && lc(o.keyword) === lc(r.keyword)) || lc(o.title).startsWith(lc(r.keyword)))).map((o) => o.path);
        }
        setRows(base);
        setStep("");
    };

    useEffect(() => { run(); }, []);

    const problems = useMemo(() => rows.filter((r) => !r.keyword || !r.inTitle || !r.inH1 || r.conflicts.length), [rows]);
    const shown = filter === "problems" ? problems : rows;
    const tick = (ok: boolean) => <span style={{ color: ok ? "#16a34a" : "#dc2626", fontWeight: 700 }}>{ok ? "✔" : "✖"}</span>;

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>Keyword Manager</h1>
                <p>Every page&apos;s focus keyword in one place. Each page should target one keyword that no other page competes for, and use it in both the title and the H1.</p>
            </header>

            <div className="seo-stats">
                <div className="seo-stat"><span>Pages</span><strong>{rows.length}</strong></div>
                <div className="seo-stat"><span>With a keyword</span><strong>{rows.filter((r) => r.keyword).length}</strong></div>
                <div className="seo-stat"><span>Keyword conflicts</span><strong style={{ color: rows.some((r) => r.conflicts.length) ? "#dc2626" : undefined }}>{rows.filter((r) => r.conflicts.length).length}</strong></div>
                <div className="seo-stat"><span>Missing from title / H1</span><strong>{rows.filter((r) => r.keyword && (!r.inTitle || !r.inH1)).length}</strong></div>
            </div>

            <section className="seo-card">
                <div className="seo-row" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div className="seo-row" style={{ gap: 6 }}>
                        <button type="button" className={`seo-btn ${filter === "problems" ? "" : "seo-btn--ghost"}`} onClick={() => setFilter("problems")}>Needs attention ({problems.length})</button>
                        <button type="button" className={`seo-btn ${filter === "all" ? "" : "seo-btn--ghost"}`} onClick={() => setFilter("all")}>All pages</button>
                    </div>
                    <button type="button" className="seo-btn seo-btn--ghost" onClick={run} disabled={!!step}>{step || "Refresh"}</button>
                </div>
                {step && !rows.length ? <p>{step}…</p> : (
                    <table className="seo-table">
                        <thead><tr><th>Page</th><th>Focus keyword</th><th>In title</th><th>In H1</th><th>Competing pages</th><th></th></tr></thead>
                        <tbody>
                            {shown.map((r) => (
                                <tr key={r.path}>
                                    <td><code>{r.path}</code><div style={{ fontSize: 12, color: "#6b7280" }}>{r.title}</div></td>
                                    <td>{r.keyword || <span style={{ color: "#dc2626" }}>None set</span>}{r.keyword && <div style={{ fontSize: 11, color: "#94a3b8" }}>{r.source === "admin" ? "set in admin" : "built into page"}</div>}</td>
                                    <td>{r.keyword ? tick(r.inTitle) : "–"}</td>
                                    <td>{r.keyword ? tick(r.inH1) : "–"}</td>
                                    <td style={{ fontSize: 13 }}>{r.conflicts.length ? r.conflicts.map((c) => <div key={c} style={{ color: "#dc2626" }}>{c}</div>) : "–"}</td>
                                    <td><Link href={`/admin/seo/pages/edit?path=${encodeURIComponent(r.path)}`} className="seo-btn seo-btn--ghost" style={{ textDecoration: "none", fontSize: 13 }}>Edit</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <p className="seo-help">Set or change a keyword in Edit SEO (Focus keyword). Built-in keywords come from the service page plan.</p>
            </section>
        </div>
    );
}
