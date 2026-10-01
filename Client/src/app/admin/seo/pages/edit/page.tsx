"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { adminFetch, seoFetch } from "../../seoApi";
import { checks, fetchPage, score, scoreColor, type PageData } from "../../analyze";
import "../../seo-admin.css";

type Entry = {
    _id?: string; path: string; title?: string; description?: string; keywords?: string; focusKeyword?: string; canonical?: string;
    noindex?: boolean; nofollow?: boolean; noarchive?: boolean; nosnippet?: boolean; noimageindex?: boolean;
    ogTitle?: string; ogDescription?: string; ogImage?: string; twitterTitle?: string; twitterDescription?: string; schema?: string;
};

const SITE = "https://mailstora.com";

const TEMPLATES: Record<string, (url: string) => object> = {
    FAQPage: () => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Question?", acceptedAnswer: { "@type": "Answer", text: "Answer." } }] }),
    HowTo: () => ({ "@context": "https://schema.org", "@type": "HowTo", name: "How to ...", step: [{ "@type": "HowToStep", name: "Step 1", text: "Do this." }] }),
    Service: (url) => ({ "@context": "https://schema.org", "@type": "Service", name: "Service name", serviceType: "HTML Email Development", url, provider: { "@id": `${SITE}/#mailstora` }, areaServed: "Worldwide", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }),
    Article: (url) => ({ "@context": "https://schema.org", "@type": "Article", headline: "Title", url, datePublished: new Date().toISOString().slice(0, 10), author: { "@id": `${SITE}/#founder` }, publisher: { "@id": `${SITE}/#mailstora` }, image: "" }),
    Product: () => ({ "@context": "https://schema.org", "@type": "Product", name: "Product", description: "", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" } }),
    LocalBusiness: () => ({ "@context": "https://schema.org", "@type": "LocalBusiness", name: "MailStora", address: { "@type": "PostalAddress", addressCountry: "BD" }, telephone: "" }),
    Event: () => ({ "@context": "https://schema.org", "@type": "Event", name: "Event", startDate: "", location: { "@type": "VirtualLocation", url: "" } }),
    VideoObject: () => ({ "@context": "https://schema.org", "@type": "VideoObject", name: "Video", description: "", thumbnailUrl: "", uploadDate: "", contentUrl: "" }),
    Course: () => ({ "@context": "https://schema.org", "@type": "Course", name: "Course", description: "", provider: { "@id": `${SITE}/#mailstora` } }),
    BreadcrumbList: (url) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` }, { "@type": "ListItem", position: 2, name: "Page", item: url }] }),
};

function Editor() {
    const path = useSearchParams().get("path") || "/";
    const [tab, setTab] = useState<"general" | "advanced" | "social" | "schema">("general");
    const [e, setE] = useState<Entry>({ path });
    const [page, setPage] = useState<PageData | null>(null);
    const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
    const [revs, setRevs] = useState<{ _id: string; createdAt: string; user?: string; data: Entry }[]>([]);
    const loadRevs = () => adminFetch<typeof revs>(`/revisions?kind=seo-entry&ref=${encodeURIComponent(path)}`).then(setRevs).catch(() => {});

    useEffect(() => {
        seoFetch<Entry[]>("/admin/entries").then((l) => setE(l.find((x) => x.path === path) || { path })).catch(() => {});
        fetchPage(path).then(setPage).catch(() => {});
        loadRevs();
    }, [path]);

    const set = (k: keyof Entry, v: string | boolean) => setE((p) => ({ ...p, [k]: v }));
    const title = e.title || page?.title || "";
    const desc = e.description || page?.description || "";
    const list = page ? checks(page, e.focusKeyword || "", { title: e.title, description: e.description }) : [];
    const s = score(list);

    let schemaErr = "";
    if (e.schema) { try { JSON.parse(e.schema); } catch (err) { schemaErr = (err as Error).message; } }

    const save = async () => {
        setMsg(null);
        try {
            const { _id, ...body } = e; void _id;
            setE(await seoFetch<Entry>("/admin/entries", { method: "PUT", body: JSON.stringify(body) }));
            setMsg({ ok: true, text: "Saved. Live on the site within 60 seconds." });
            loadRevs();
        } catch (err) { setMsg({ ok: false, text: (err as Error).message }); }
    };
    const reset = async () => {
        if (!e._id || !confirm("Remove all custom SEO for this page?")) return;
        await seoFetch(`/admin/entries/${e._id}`, { method: "DELETE" });
        setE({ path });
        setMsg({ ok: true, text: "Custom SEO removed. Page uses its built-in defaults." });
    };
    const indexNow = async () => {
        try { await seoFetch("/admin/indexnow", { method: "POST", body: JSON.stringify({ urls: [`${SITE}${path}`] }) }); setMsg({ ok: true, text: "Submitted to IndexNow (Bing, Yandex)." }); }
        catch (err) { setMsg({ ok: false, text: (err as Error).message }); }
    };

    const txt = (k: keyof Entry, label: string, ph = "", area = false, max = 0) => (
        <div className="seo-field">
            <label>{label}{max ? <span style={{ float: "right", color: String(e[k] || "").length > max ? "#dc2626" : "#6b7280" }}>{String(e[k] || "").length}/{max}</span> : null}</label>
            {area
                ? <textarea rows={3} value={String(e[k] || "")} placeholder={ph} onChange={(ev) => set(k, ev.target.value)} />
                : <input value={String(e[k] || "")} placeholder={ph} onChange={(ev) => set(k, ev.target.value)} />}
        </div>
    );
    const box = (k: keyof Entry, label: string, help: string) => (
        <label style={{ display: "flex", gap: 8, alignItems: "flex-start", margin: "0.6rem 0" }}>
            <input type="checkbox" checked={!!e[k]} onChange={(ev) => set(k, ev.target.checked)} />
            <span><strong>{label}</strong><br /><small style={{ color: "#6b7280" }}>{help}</small></span>
        </label>
    );

    return (
        <div className="seo-page">
            <header className="seo-head">
                <p><Link href="/admin/seo/pages">← All pages</Link></p>
                <h1>Edit SEO: <code>{path}</code></h1>
                <p><a href={path} target="_blank" rel="noreferrer">View page ↗</a></p>
            </header>
            {msg && <p className={`seo-msg ${msg.ok ? "seo-msg--ok" : "seo-msg--err"}`}>{msg.text}</p>}

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(260px,1fr)", gap: "1.25rem", alignItems: "start" }}>
                <section className="seo-card">
                    <div className="seo-row" style={{ gap: 6, marginBottom: "1rem" }}>
                        {(["general", "advanced", "social", "schema"] as const).map((t) => (
                            <button key={t} type="button" className={`seo-btn ${tab === t ? "" : "seo-btn--ghost"}`} onClick={() => setTab(t)}>{t[0].toUpperCase() + t.slice(1)}</button>
                        ))}
                    </div>

                    {tab === "general" && <>
                        <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "1rem", marginBottom: "1rem", fontFamily: "arial, sans-serif" }}>
                            <small style={{ color: "#4d5156" }}>mailstora.com › {path.split("/").filter(Boolean).join(" › ")}</small>
                            <div style={{ color: "#1a0dab", fontSize: 20, margin: "4px 0" }}>{title.length > 60 ? title.slice(0, 60) + "…" : title}</div>
                            <div style={{ color: "#4d5156", fontSize: 14 }}>{desc.length > 160 ? desc.slice(0, 160) + "…" : desc}</div>
                        </div>
                        {txt("focusKeyword", "Focus keyword", "e.g. html email template development")}
                        {txt("title", "SEO title (blank = page default)", page?.title, false, 60)}
                        {txt("description", "Meta description (blank = page default)", page?.description, true, 160)}
                        {txt("keywords", "Meta keywords, comma separated (blank = page default)", page?.keywords)}
                    </>}

                    {tab === "advanced" && <>
                        {txt("canonical", "Canonical URL", `${SITE}${path}`)}
                        {box("noindex", "No Index", "Hide this page from search results.")}
                        {box("nofollow", "No Follow", "Do not follow links on this page.")}
                        {box("noarchive", "No Archive", "Do not show a cached copy.")}
                        {box("nosnippet", "No Snippet", "Do not show a text snippet in results.")}
                        {box("noimageindex", "No Image Index", "Do not index images on this page.")}
                    </>}

                    {tab === "social" && <>
                        {txt("ogTitle", "Facebook / LinkedIn title", title)}
                        {txt("ogDescription", "Facebook / LinkedIn description", desc, true)}
                        {txt("ogImage", "Share image URL (1200×630)", page?.ogImage)}
                        {txt("twitterTitle", "X (Twitter) title", title)}
                        {txt("twitterDescription", "X (Twitter) description", desc, true)}
                        <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", maxWidth: 480 }}>
                            {(e.ogImage || page?.ogImage) && <img src={e.ogImage || page?.ogImage} alt="" style={{ width: "100%", aspectRatio: "1.91", objectFit: "cover" }} />}
                            <div style={{ padding: "0.6rem", background: "#f3f4f6" }}>
                                <small>MAILSTORA.COM</small>
                                <div><strong>{e.ogTitle || title}</strong></div>
                                <small>{(e.ogDescription || desc).slice(0, 110)}</small>
                            </div>
                        </div>
                    </>}

                    {tab === "schema" && <>
                        <p className="seo-help">Schema already on this page: <strong>{page?.schemaTypes.join(", ") || "none"}</strong>. Site-wide Organization, Founder and WebSite schema come from <Link href="/admin/seo/general">General Settings</Link>. Add extra schema below.</p>
                        <div className="seo-row" style={{ gap: 6, flexWrap: "wrap", margin: "0.75rem 0" }}>
                            {Object.keys(TEMPLATES).map((t) => (
                                <button key={t} type="button" className="seo-btn seo-btn--ghost" onClick={() => {
                                    const add = TEMPLATES[t](`${SITE}${path}`);
                                    let cur: unknown = null;
                                    try { cur = e.schema ? JSON.parse(e.schema) : null; } catch { cur = null; }
                                    const out = cur ? [...(Array.isArray(cur) ? cur : [cur]), add] : add;
                                    set("schema", JSON.stringify(out, null, 2));
                                }}>+ {t}</button>
                            ))}
                        </div>
                        <div className="seo-field">
                            <label>Custom JSON-LD {schemaErr ? <span style={{ color: "#dc2626" }}>Invalid: {schemaErr}</span> : e.schema ? <span style={{ color: "#16a34a" }}>Valid JSON</span> : null}</label>
                            <textarea rows={18} style={{ fontFamily: "monospace", fontSize: 13 }} value={e.schema || ""} onChange={(ev) => set("schema", ev.target.value)} />
                        </div>
                        <p className="seo-help"><a href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(SITE + path)}`} target="_blank" rel="noreferrer">Test in Google Rich Results ↗</a> · <a href={`https://validator.schema.org/#url=${encodeURIComponent(SITE + path)}`} target="_blank" rel="noreferrer">Schema.org validator ↗</a></p>
                        {page?.schemaBlocks.length ? <details><summary>Current page JSON-LD</summary><pre style={{ whiteSpace: "pre-wrap", fontSize: 12, maxHeight: 400, overflow: "auto" }}>{page.schemaBlocks.map((b) => { try { return JSON.stringify(JSON.parse(b), null, 2); } catch { return b; } }).join("\n\n")}</pre></details> : null}
                    </>}

                    <div className="seo-actions" style={{ marginTop: "1rem", display: "flex", gap: 8 }}>
                        <button type="button" className="seo-btn" onClick={save} disabled={!!schemaErr}>Save</button>
                        <button type="button" className="seo-btn seo-btn--ghost" onClick={indexNow}>Submit to IndexNow</button>
                        {e._id && <button type="button" className="seo-btn seo-btn--danger" onClick={reset}>Reset to default</button>}
                    </div>
                </section>

                <aside className="seo-card">
                    <h2 style={{ marginTop: 0 }}>SEO score <span style={{ color: scoreColor(s) }}>{page ? `${s}/100` : "…"}</span></h2>
                    <p className="seo-help">Content checks use the live page. Title/description checks use your unsaved edits.</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {list.map((c, i) => (
                            <li key={i} style={{ padding: "0.4rem 0", borderBottom: "1px solid #f3f4f6", fontSize: 14 }}>
                                <span style={{ color: c.ok ? "#16a34a" : "#dc2626" }}>{c.ok ? "✔" : "✖"}</span> {c.label}
                                {!c.ok && c.tip && <div style={{ color: "#6b7280", fontSize: 12, marginLeft: 18 }}>{c.tip}</div>}
                            </li>
                        ))}
                    </ul>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3>Revisions</h3>
                        {revs.length > 0 && <button type="button" className="seo-btn seo-btn--danger" style={{ padding: "0.2rem 0.6rem" }} onClick={async () => {
                            if (!confirm("Delete all saved versions of this page's SEO? This cannot be undone.")) return;
                            try { await adminFetch(`/revisions?kind=seo-entry&ref=${encodeURIComponent(path)}`, { method: "DELETE" }); setRevs([]); setMsg({ ok: true, text: "Revision history cleared." }); }
                            catch (err) { setMsg({ ok: false, text: (err as Error).message }); }
                        }}>Clear</button>}
                    </div>
                    {revs.length === 0 ? <p className="seo-help">No earlier versions.</p> : revs.map((r) => (
                        <div key={r._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, padding: "0.3rem 0" }}>
                            <span title={r.data.title || ""}>{new Date(r.createdAt).toLocaleString()} · {r.user || "–"}</span>
                            <button type="button" className="seo-btn seo-btn--ghost" style={{ padding: "0.2rem 0.6rem" }} onClick={async () => {
                                if (!confirm("Restore this version?")) return;
                                try {
                                    await adminFetch(`/revisions/${r._id}/restore`, { method: "POST" });
                                    const l = await seoFetch<Entry[]>("/admin/entries");
                                    setE(l.find((x) => x.path === path) || { path });
                                    loadRevs();
                                    setMsg({ ok: true, text: "Version restored. Live within 60 seconds." });
                                } catch (err) { setMsg({ ok: false, text: (err as Error).message }); }
                            }}>Restore</button>
                        </div>
                    ))}
                </aside>
            </div>
        </div>
    );
}

export default function Page() {
    return <Suspense fallback={<p>Loading…</p>}><Editor /></Suspense>;
}
