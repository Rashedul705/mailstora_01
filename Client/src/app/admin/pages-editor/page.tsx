"use client";

import { useEffect, useMemo, useState } from "react";
import { API } from "../seo/seoApi";
import { sitemapPaths } from "../seo/analyze";
import "../seo/seo-admin.css";

type Edit = { kind: "text" | "img" | "alt"; original: string; value: string };
type Item = { kind: "text" | "img"; tag: string; original: string; alt?: string; count: number };
type Block = { id: string; label: string; global: boolean; items: Item[] };

const key = (k: string, o: string) => `${k}\u0000${o}`;
const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "svg", "SVG", "TITLE"]);

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API}/api${path}`, { ...init, credentials: "include", headers: { "Content-Type": "application/json", ...(init.headers || {}) } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((data as { message?: string }).message || `Request failed (${res.status})`);
    return data as T;
}

// next/image renders /_next/image?url=<original>&w=..; the editor works with the original file path
const realSrc = (src: string) => {
    if (src.startsWith("/_next/image")) {
        try { return new URL(src, location.origin).searchParams.get("url") || src; } catch { return src; }
    }
    return src;
};

/** Split the ORIGINAL page (without edits) into blocks: header, each section of <main>, footer. */
function parseBlocks(html: string): Block[] {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const regions: { el: Element; global: boolean; name: string }[] = [];
    const header = doc.querySelector("body header, body nav");
    if (header) regions.push({ el: header, global: true, name: "Header / menu (all pages)" });
    const main = doc.querySelector("main");
    if (main) Array.from(main.children).forEach((el) => regions.push({ el, global: false, name: "" }));
    const footer = doc.querySelector("body footer");
    if (footer) regions.push({ el: footer, global: true, name: "Footer (all pages)" });

    // How often each text appears on the page (an edit changes every copy)
    const counts = new Map<string, number>();
    const all = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    for (let n = all.nextNode(); n; n = all.nextNode()) {
        const t = n.nodeValue || "";
        if (t.trim()) counts.set(t, (counts.get(t) || 0) + 1);
    }

    const blocks: Block[] = [];
    regions.forEach((r, i) => {
        const items: Item[] = [];
        const seen = new Set<string>();
        const walk = (el: Element) => {
            if (SKIP.has(el.tagName) || el.getAttribute("aria-hidden") === "true" && el.tagName !== "IMG") return;
            if (el.tagName === "IMG") {
                const src = realSrc(el.getAttribute("src") || "");
                if (src && !seen.has("img" + src)) {
                    seen.add("img" + src);
                    items.push({ kind: "img", tag: "IMG", original: src, alt: el.getAttribute("alt") || "", count: 1 });
                }
                return;
            }
            el.childNodes.forEach((c) => {
                if (c.nodeType === 3) {
                    const t = c.nodeValue || "";
                    if (t.trim().length > 1 && !seen.has("t" + t)) {
                        seen.add("t" + t);
                        items.push({ kind: "text", tag: el.tagName, original: t, count: counts.get(t) || 1 });
                    }
                } else if (c.nodeType === 1) walk(c as Element);
            });
        };
        walk(r.el);
        if (!items.length) return;
        const heading = r.el.querySelector("h1,h2,h3")?.textContent?.trim();
        blocks.push({ id: `b${i}`, global: r.global, items, label: r.name || heading || r.el.getAttribute("aria-label") || `Section ${i + 1}` });
    });
    return blocks;
}

export default function PageEditor() {
    const [paths, setPaths] = useState<string[]>([]);
    const [path, setPath] = useState("/");
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [open, setOpen] = useState<string>("");
    const [vals, setVals] = useState<Record<string, string>>({}); // key(kind, original) -> new value
    const [saved, setSaved] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
    const [revs, setRevs] = useState<{ _id: string; ref: string; createdAt: string; user?: string; data: Edit[] }[]>([]);
    const loadRevs = async (p: string) => {
        const [a, b] = await Promise.all([
            api<typeof revs>(`/admin/revisions?kind=page-edit&ref=${encodeURIComponent(p)}`).catch(() => []),
            api<typeof revs>(`/admin/revisions?kind=page-edit&ref=*`).catch(() => []),
        ]);
        setRevs([...a, ...b].sort((x, y) => y.createdAt.localeCompare(x.createdAt)));
    };
    const restoreRev = async (id: string) => {
        if (!confirm("Restore this version? Current edits are kept as a new revision.")) return;
        try {
            await api(`/admin/revisions/${id}/restore`, { method: "POST" });
            await load(path);
            setMsg({ ok: true, text: "Version restored. The live page updates within 60 seconds." });
        } catch (e) { setMsg({ ok: false, text: (e as Error).message }); }
    };
    const clearRevs = async () => {
        if (!confirm("Delete all saved versions for this page and the header/footer? This cannot be undone.")) return;
        try {
            await Promise.all([
                api(`/admin/revisions?kind=page-edit&ref=${encodeURIComponent(path)}`, { method: "DELETE" }),
                api(`/admin/revisions?kind=page-edit&ref=*`, { method: "DELETE" }),
            ]);
            setRevs([]);
            setMsg({ ok: true, text: "Revision history cleared." });
        } catch (e) { setMsg({ ok: false, text: (e as Error).message }); }
    };

    useEffect(() => {
        sitemapPaths().then((p) => setPaths(p)).catch(() => setPaths(["/"]));
        // Open a specific page when linked as /admin/pages-editor?path=/some-page/
        const start = new URLSearchParams(window.location.search).get("path");
        if (start) setPath(start);
    }, []);

    const load = async (p: string) => {
        setLoading(true);
        setMsg(null);
        try {
            const [html, page, global] = await Promise.all([
                fetch(p, { headers: { "x-ms-raw": "1" }, cache: "no-store" }).then((r) => r.text()),
                api<{ edits: Edit[] }>(`/page-edits/page?path=${encodeURIComponent(p)}`),
                api<{ edits: Edit[] }>(`/page-edits/page?path=*`),
            ]);
            const b = parseBlocks(html);
            setBlocks(b);
            setOpen(b[1]?.id || b[0]?.id || "");
            const v: Record<string, string> = {};
            [...global.edits, ...page.edits].forEach((e) => { v[key(e.kind, e.original)] = e.value; });
            setVals(v);
            setSaved(v);
            loadRevs(p);
        } catch (e) {
            setMsg({ ok: false, text: (e as Error).message });
        }
        setLoading(false);
    };
    useEffect(() => { load(path); }, [path]);

    const dirty = useMemo(() => JSON.stringify(vals) !== JSON.stringify(saved), [vals, saved]);
    const set = (k: string, v: string) => setVals((cur) => ({ ...cur, [k]: v }));

    const save = async () => {
        // Header/footer edits go to '*' (every page); section edits to this page only
        const globalItems = new Set(blocks.filter((b) => b.global).flatMap((b) => b.items.flatMap((it) => [key(it.kind, it.original), key("alt", it.alt || "")])));
        const toEdits = (onlyGlobal: boolean) => Object.entries(vals)
            .filter(([k, v]) => v !== "" && globalItems.has(k) === onlyGlobal && k.split("\u0000")[1] !== v)
            .map(([k, v]) => { const [kind, original] = k.split("\u0000"); return { kind, original, value: v }; });
        try {
            const globalDoc = await api<{ edits: Edit[] }>(`/page-edits/page?path=*`);
            // Keep '*' edits for items not on this page
            const keepGlobal = globalDoc.edits.filter((e) => !globalItems.has(key(e.kind, e.original)));
            await Promise.all([
                api("/page-edits/page", { method: "PUT", body: JSON.stringify({ path, edits: toEdits(false) }) }),
                api("/page-edits/page", { method: "PUT", body: JSON.stringify({ path: "*", edits: [...keepGlobal, ...toEdits(true)] }) }),
            ]);
            setSaved(vals);
            loadRevs(path);
            setMsg({ ok: true, text: "Saved. The live page updates within 60 seconds." });
        } catch (e) {
            setMsg({ ok: false, text: (e as Error).message });
        }
    };

    const upload = async (k: string, file: File) => {
        const fd = new FormData();
        fd.append("image", file);
        try {
            const res = await fetch(`${API}/api/admin/blog/upload-image`, { method: "POST", body: fd, credentials: "include" });
            const data = await res.json();
            if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
            set(k, data.url);
        } catch (e) {
            setMsg({ ok: false, text: `${(e as Error).message}. Paste an image URL instead, e.g. /images/media/your-file.webp` });
        }
    };

    const changed = (b: Block) => b.items.filter((it) => (vals[key(it.kind, it.original)] ?? it.original) !== it.original || (it.kind === "img" && (vals[key("alt", it.alt || "")] ?? it.alt) !== it.alt)).length;

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>Page Editor</h1>
                <p>Pick a page. Each block is a section of that page. Change any text or image and save. Header and footer changes apply to every page.</p>
            </header>

            <div className="seo-row" style={{ gap: 8, marginBottom: "1rem", flexWrap: "wrap", position: "sticky", top: 0, zIndex: 5, background: "#f8fafc", padding: "0.5rem 0" }}>
                <select value={path} onChange={(e) => { if (!dirty || confirm("Discard unsaved changes?")) setPath(e.target.value); }} style={{ minWidth: 280, padding: "0.5rem" }}>
                    {(paths.length ? paths : ["/"]).map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <a className="seo-btn seo-btn--ghost" href={path} target="_blank" rel="noreferrer">View page ↗</a>
                <button type="button" className="seo-btn" disabled={!dirty} onClick={save}>{dirty ? "Save changes" : "Saved"}</button>
                {msg && <span className={`seo-msg ${msg.ok ? "seo-msg--ok" : "seo-msg--err"}`} style={{ margin: 0 }}>{msg.text}</span>}
            </div>

            {loading ? <p>Loading page…</p> : blocks.map((b) => (
                <section key={b.id} className="seo-card" style={{ padding: 0, overflow: "hidden" }}>
                    <button type="button" onClick={() => setOpen(open === b.id ? "" : b.id)} style={{ width: "100%", textAlign: "left", padding: "0.9rem 1.2rem", background: "none", border: 0, cursor: "pointer", display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                        <strong>{b.label}</strong>
                        <span style={{ color: "#6b7280" }}>{b.items.length} items{changed(b) ? ` · ${changed(b)} edited` : ""} {open === b.id ? "▲" : "▼"}</span>
                    </button>
                    {open === b.id && (
                        <div style={{ padding: "0 1.2rem 1.2rem" }}>
                            {b.items.map((it) => {
                                const k = key(it.kind, it.original);
                                if (it.kind === "img") {
                                    const ka = key("alt", it.alt || "");
                                    const shown = vals[k] || it.original;
                                    return (
                                        <div key={k} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, padding: "0.75rem 0", borderTop: "1px solid #f1f5f9" }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={shown} alt="" style={{ width: 120, height: 80, objectFit: "contain", background: "#f1f5f9", borderRadius: 6 }} />
                                            <div>
                                                <div className="seo-field"><label>Image <small style={{ color: "#6b7280" }}>{it.original}</small></label><input value={vals[k] ?? it.original} onChange={(e) => set(k, e.target.value)} /></div>
                                                <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(k, e.target.files[0])} />
                                                {it.alt ? <div className="seo-field" style={{ marginTop: 8 }}><label>Alt text</label><input value={vals[ka] ?? it.alt} onChange={(e) => set(ka, e.target.value)} /></div> : null}
                                            </div>
                                        </div>
                                    );
                                }
                                const long = it.original.length > 70;
                                return (
                                    <div key={k} className="seo-field" style={{ borderTop: "1px solid #f1f5f9", paddingTop: "0.6rem" }}>
                                        <label>
                                            <span className="seo-pill" style={{ marginRight: 6 }}>{it.tag.toLowerCase()}</span>
                                            {it.count > 1 && <small style={{ color: "#b45309" }}>appears {it.count}× on this page, all copies change</small>}
                                        </label>
                                        {long
                                            ? <textarea rows={Math.min(6, Math.ceil(it.original.length / 90))} value={vals[k] ?? it.original} onChange={(e) => set(k, e.target.value)} />
                                            : <input value={vals[k] ?? it.original} onChange={(e) => set(k, e.target.value)} />}
                                        {vals[k] !== undefined && vals[k] !== it.original ? <small><button type="button" style={{ border: 0, background: "none", color: "#2563eb", cursor: "pointer", padding: 0 }} onClick={() => setVals((cur) => { const n = { ...cur }; delete n[k]; return n; })}>Reset to original</button></small> : null}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            ))}
            <section className="seo-card">
                <div className="seo-row" style={{ justifyContent: "space-between" }}>
                    <h2 style={{ margin: 0 }}>Revisions</h2>
                    {revs.length > 0 && <button type="button" className="seo-btn seo-btn--danger" onClick={clearRevs}>Clear revisions</button>}
                </div>
                {revs.length === 0 ? <p className="seo-empty">No earlier versions yet. A version is saved each time you click Save.</p> : (
                    <table className="seo-table">
                        <thead><tr><th>Saved before</th><th>Scope</th><th>Edits in version</th><th>By</th><th></th></tr></thead>
                        <tbody>
                            {revs.map((r) => (
                                <tr key={r._id}>
                                    <td>{new Date(r.createdAt).toLocaleString()}</td>
                                    <td>{r.ref === "*" ? "Header/footer (all pages)" : "This page"}</td>
                                    <td>{(r.data || []).length}</td>
                                    <td>{r.user || "–"}</td>
                                    <td><button type="button" className="seo-btn seo-btn--ghost" onClick={() => restoreRev(r._id)}>Restore</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}
