"use client";

import { useState } from "react";
import Link from "next/link";
import { adminFetch } from "../seoApi";
import { sitemapPaths } from "../analyze";
import "../seo-admin.css";

type Result = { url: string; status: number; error?: string; finalUrl?: string; pages: string[] };

const SITE = "https://mailstora.com";

export default function LinkChecker() {
    const [results, setResults] = useState<Result[]>([]);
    const [step, setStep] = useState("");
    const [onlyBroken, setOnlyBroken] = useState(true);

    const run = async () => {
        setResults([]);
        const found = new Map<string, Set<string>>();
        const paths = await sitemapPaths();
        for (let i = 0; i < paths.length; i++) {
            setStep(`Reading pages ${i + 1}/${paths.length}`);
            try {
                const html = await (await fetch(paths[i], { cache: "no-store" })).text();
                const doc = new DOMParser().parseFromString(html, "text/html");
                doc.querySelectorAll("a[href]").forEach((a) => {
                    const h = a.getAttribute("href") || "";
                    if (!h || h.startsWith("#") || /^(mailto|tel|javascript|sms):/i.test(h)) return;
                    let abs: string;
                    try { abs = new URL(h, window.location.origin + paths[i]).href; } catch { return; }
                    abs = abs.split("#")[0];
                    if (!found.has(abs)) found.set(abs, new Set());
                    found.get(abs)!.add(paths[i]);
                });
            } catch { /* skip page */ }
        }
        const all = Array.from(found.keys());
        const internal = all.filter((u) => u.startsWith(window.location.origin));
        const external = all.filter((u) => !u.startsWith(window.location.origin));
        const out: Result[] = [];

        // Internal links: checked from the browser against this server
        for (let i = 0; i < internal.length; i++) {
            setStep(`Checking internal links ${i + 1}/${internal.length}`);
            let status = 0;
            try { status = (await fetch(internal[i], { method: "HEAD", cache: "no-store" })).status; } catch { status = 0; }
            out.push({ url: internal[i].replace(window.location.origin, ""), status, pages: Array.from(found.get(internal[i])!) });
        }
        // External links: checked by the API server (browsers block cross-site checks)
        for (let i = 0; i < external.length; i += 25) {
            setStep(`Checking external links ${Math.min(i + 25, external.length)}/${external.length}`);
            try {
                const r = await adminFetch<Omit<Result, "pages">[]>("/check-links", { method: "POST", body: JSON.stringify({ urls: external.slice(i, i + 25) }) });
                r.forEach((x) => out.push({ ...x, pages: Array.from(found.get(x.url) || []) }));
            } catch (e) {
                external.slice(i, i + 25).forEach((u) => out.push({ url: u, status: 0, error: (e as Error).message, pages: Array.from(found.get(u)!) }));
            }
            setResults([...out]);
        }
        setResults(out.sort((a, b) => (a.status >= 400 || a.status === 0 ? -1 : 1) - (b.status >= 400 || b.status === 0 ? -1 : 1)));
        setStep("");
    };

    const broken = (r: Result) => r.status === 0 || r.status >= 400;
    // Many sites (LinkedIn, Upwork, Fiverr) block bots with 403/429/999; flag those as "check manually", not broken
    const blocked = (r: Result) => [403, 429, 999].includes(r.status);
    const shown = results.filter((r) => !onlyBroken || broken(r));

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>Broken Link Checker</h1>
                <p>Crawls every page in the sitemap, collects all links and checks each one. Fix broken internal links in the page, or add a redirect.</p>
            </header>

            <div className="seo-stats">
                <div className="seo-stat"><span>Links checked</span><strong>{results.length}</strong></div>
                <div className="seo-stat"><span>Broken</span><strong style={{ color: "#dc2626" }}>{results.filter((r) => broken(r) && !blocked(r)).length}</strong></div>
                <div className="seo-stat"><span>Blocked (check manually)</span><strong style={{ color: "#f59e0b" }}>{results.filter(blocked).length}</strong></div>
                <div className="seo-stat"><span>Redirected</span><strong>{results.filter((r) => r.finalUrl).length}</strong></div>
            </div>

            <section className="seo-card">
                <div className="seo-row" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
                    <label><input type="checkbox" checked={onlyBroken} onChange={(e) => setOnlyBroken(e.target.checked)} /> Show only problems</label>
                    <button type="button" className="seo-btn" onClick={run} disabled={!!step}>{step || "Scan Site"}</button>
                </div>
                {shown.length === 0 ? <p className="seo-empty">{results.length ? "No broken links found." : "Run a scan to check links."}</p> : (
                    <table className="seo-table">
                        <thead><tr><th>Link</th><th>Status</th><th>Found on</th><th></th></tr></thead>
                        <tbody>
                            {shown.map((r) => (
                                <tr key={r.url}>
                                    <td style={{ wordBreak: "break-all" }}><code>{r.url}</code>{r.finalUrl && <div><small>→ {r.finalUrl}</small></div>}</td>
                                    <td><span className={`seo-pill ${broken(r) ? "seo-pill--off" : "seo-pill--on"}`}>{r.status || r.error || "Error"}</span>{blocked(r) && <div><small>Site blocks bots</small></div>}</td>
                                    <td style={{ fontSize: 12 }}>{r.pages.slice(0, 4).map((p) => <div key={p}><a href={p} target="_blank" rel="noreferrer">{p}</a></div>)}{r.pages.length > 4 && <small>+{r.pages.length - 4} more</small>}</td>
                                    <td>{r.url.startsWith("/") && broken(r) && <Link className="seo-btn seo-btn--ghost" href={`/admin/seo/redirects?source=${encodeURIComponent(r.url)}`}>Redirect</Link>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <p className="seo-help">Live site: {SITE}. Local scans check the local server.</p>
            </section>
        </div>
    );
}
