"use client";

import { useState } from "react";
import Link from "next/link";
import { mapLimit, sitemapPaths } from "../analyze";
import { TOPICS } from "@/lib/topics";
import "../seo-admin.css";

type PageLinks = { path: string; title: string; out: string[]; text: string };
type Row = { path: string; title: string; inbound: string[]; outbound: number; suggestions: { from: string; anchor: string }[] };

const norm = (h: string) => {
    let p = h.split("#")[0].split("?")[0];
    if (p.startsWith("https://mailstora.com")) p = p.slice(21) || "/";
    if (!p.startsWith("/") || /\.[a-z0-9]+$/i.test(p)) return "";
    return p.endsWith("/") ? p : p + "/";
};

export default function LinkMap() {
    const [rows, setRows] = useState<Row[]>([]);
    const [step, setStep] = useState("");
    const [view, setView] = useState<"all" | "orphans" | "weak">("weak");

    const run = async () => {
        const paths = await sitemapPaths();
        const read = await mapLimit(paths, 6, async (path): Promise<PageLinks | null> => {
            try {
                const doc = new DOMParser().parseFromString(await (await fetch(path, { cache: "no-store" })).text(), "text/html");
                // Only links inside the page content: menu and footer links are the same on every page
                const main = doc.querySelector("main") || doc.body;
                main.querySelectorAll("header, footer, nav, script, style").forEach((n) => n.remove());
                const out = [...new Set([...main.querySelectorAll("a[href]")].map((a) => norm(a.getAttribute("href") || "")).filter((p) => p && p !== path))];
                return { path, title: doc.querySelector("title")?.textContent || "", out, text: (main.textContent || "").toLowerCase() };
            } catch {
                return null;
            }
        }, (n) => setStep(`Reading ${n}/${paths.length}`));
        const pages = read.filter(Boolean) as PageLinks[];
        setStep("Analysing");
        const result: Row[] = pages.map((p) => {
            const inbound = pages.filter((q) => q.out.includes(p.path)).map((q) => q.path);
            // Link ideas: pages that mention this page's topic but do not link to it yet
            const topic = TOPICS.find((t) => `/${t.slug}/` === p.path);
            const suggestions = topic
                ? pages
                    .filter((q) => q.path !== p.path && !q.out.includes(p.path))
                    .map((q) => ({ from: q.path, anchor: topic.anchors.find((a) => q.text.includes(a.toLowerCase())) || "" }))
                    .filter((s) => s.anchor)
                    .slice(0, 6)
                : [];
            return { path: p.path, title: p.title, inbound, outbound: p.out.length, suggestions };
        });
        setRows(result.sort((a, b) => a.inbound.length - b.inbound.length));
        setStep("");
    };

    const orphans = rows.filter((r) => r.inbound.length === 0 && r.path !== "/");
    const weak = rows.filter((r) => r.inbound.length < 3 && r.path !== "/");
    const shown = view === "orphans" ? orphans : view === "weak" ? weak : rows;

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>Link Map</h1>
                <p>Internal links found inside each page&apos;s content (menu and footer links are ignored, because every page has them). Pages with few links from other pages are harder for Google to find and rank.</p>
            </header>

            <div className="seo-stats">
                <div className="seo-stat"><span>Pages scanned</span><strong>{rows.length}</strong></div>
                <div className="seo-stat"><span>Orphan pages (0 links in)</span><strong style={{ color: orphans.length ? "#dc2626" : undefined }}>{orphans.length}</strong></div>
                <div className="seo-stat"><span>Weak pages (&lt; 3 links in)</span><strong style={{ color: weak.length ? "#f59e0b" : undefined }}>{weak.length}</strong></div>
                <div className="seo-stat"><span>Link ideas</span><strong>{rows.reduce((n, r) => n + r.suggestions.length, 0)}</strong></div>
            </div>

            <section className="seo-card">
                <div className="seo-row" style={{ justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
                    <div className="seo-row" style={{ gap: 6 }}>
                        {(["weak", "orphans", "all"] as const).map((v) => (
                            <button key={v} type="button" className={`seo-btn ${view === v ? "" : "seo-btn--ghost"}`} onClick={() => setView(v)}>
                                {v === "weak" ? "Weak pages" : v === "orphans" ? "Orphans" : "All pages"}
                            </button>
                        ))}
                    </div>
                    <button type="button" className="seo-btn" onClick={run} disabled={!!step}>{step || "Scan Links"}</button>
                </div>
                {rows.length === 0 ? <p className="seo-empty">Click Scan Links to map internal links across the site.</p> : shown.length === 0 ? <p className="seo-empty">Nothing here. 👍</p> : (
                    <table className="seo-table">
                        <thead><tr><th>Page</th><th>Links in</th><th>Links out</th><th>Link ideas (pages that mention this topic but do not link to it)</th></tr></thead>
                        <tbody>
                            {shown.map((r) => (
                                <tr key={r.path}>
                                    <td><code>{r.path}</code><div style={{ fontSize: 12, color: "#6b7280" }}>{r.title}</div></td>
                                    <td>
                                        <strong style={{ color: r.inbound.length === 0 ? "#dc2626" : r.inbound.length < 3 ? "#f59e0b" : "#16a34a" }}>{r.inbound.length}</strong>
                                        {r.inbound.length > 0 && <details><summary style={{ fontSize: 12, cursor: "pointer" }}>from</summary><div style={{ fontSize: 12 }}>{r.inbound.map((p) => <div key={p}>{p}</div>)}</div></details>}
                                    </td>
                                    <td>{r.outbound}</td>
                                    <td style={{ fontSize: 13 }}>
                                        {r.suggestions.length === 0 ? "–" : r.suggestions.map((s) => (
                                            <div key={s.from}>
                                                On <Link href={`/admin/pages-editor?path=${encodeURIComponent(s.from)}`}>{s.from}</Link>, link &ldquo;{s.anchor}&rdquo;
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <p className="seo-help">Blog posts link to service pages automatically. For other pages, add links in the page content or ask a developer.</p>
            </section>
        </div>
    );
}
