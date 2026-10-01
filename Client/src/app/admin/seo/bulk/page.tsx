"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { seoFetch } from "../seoApi";
import { sitemapPaths } from "../analyze";
import "../seo-admin.css";

type Row = { path: string; title: string; description: string; focusKeyword: string; noindex: boolean; defTitle?: string; defDesc?: string; dirty?: boolean };

export default function BulkEditor() {
    const [rows, setRows] = useState<Row[]>([]);
    const [filter, setFilter] = useState("");
    const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        Promise.all([sitemapPaths(), seoFetch<Partial<Row>[]>("/admin/entries")]).then(async ([paths, list]) => {
            const map = Object.fromEntries(list.map((e) => [e.path, e]));
            const all = Array.from(new Set([...paths, ...list.map((e) => e.path as string)]));
            const base = all.map((p) => ({ path: p, title: map[p]?.title || "", description: map[p]?.description || "", focusKeyword: map[p]?.focusKeyword || "", noindex: !!map[p]?.noindex }));
            setRows(base);
            // Fill current page titles as placeholders
            for (const r of base) {
                try {
                    const doc = new DOMParser().parseFromString(await (await fetch(r.path)).text(), "text/html");
                    const t = doc.querySelector("title")?.textContent || "";
                    const d = doc.querySelector('meta[name="description"]')?.getAttribute("content") || "";
                    setRows((cur) => cur.map((x) => (x.path === r.path ? { ...x, defTitle: t, defDesc: d } : x)));
                } catch { /* ignore */ }
            }
        }).catch((e) => setMsg({ ok: false, text: e.message }));
    }, []);

    const edit = (path: string, k: keyof Row, v: string | boolean) => setRows((cur) => cur.map((r) => (r.path === path ? { ...r, [k]: v, dirty: true } : r)));

    const saveAll = async () => {
        setSaving(true);
        const dirty = rows.filter((r) => r.dirty);
        let fail = 0;
        for (const r of dirty) {
            try {
                await seoFetch("/admin/entries", { method: "PUT", body: JSON.stringify({ path: r.path, title: r.title, description: r.description, focusKeyword: r.focusKeyword, noindex: r.noindex }) });
            } catch { fail++; }
        }
        setRows((cur) => cur.map((r) => ({ ...r, dirty: false })));
        setMsg(fail ? { ok: false, text: `${fail} of ${dirty.length} failed.` } : { ok: true, text: `Saved ${dirty.length} page(s).` });
        setSaving(false);
    };

    const count = (s: string, max: number) => <small style={{ color: s.length > max ? "#dc2626" : "#6b7280" }}>{s.length}/{max}</small>;
    const shown = rows.filter((r) => !filter || r.path.includes(filter));
    const dirty = rows.filter((r) => r.dirty).length;

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>Bulk SEO Editor</h1>
                <p>Edit titles, descriptions, focus keywords and indexing for many pages at once. Blank fields use the page default (shown in grey).</p>
            </header>
            {msg && <p className={`seo-msg ${msg.ok ? "seo-msg--ok" : "seo-msg--err"}`}>{msg.text}</p>}
            <section className="seo-card">
                <div className="seo-row" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div className="seo-field" style={{ maxWidth: 320 }}><input placeholder="Filter by URL" value={filter} onChange={(e) => setFilter(e.target.value)} /></div>
                    <button type="button" className="seo-btn" disabled={!dirty || saving} onClick={saveAll}>{saving ? "Saving…" : `Save ${dirty || ""} change${dirty === 1 ? "" : "s"}`}</button>
                </div>
                <table className="seo-table">
                    <thead><tr><th style={{ width: "16%" }}>Page</th><th>SEO title</th><th>Meta description</th><th style={{ width: "14%" }}>Focus keyword</th><th>Noindex</th></tr></thead>
                    <tbody>
                        {shown.map((r) => (
                            <tr key={r.path} style={r.dirty ? { background: "#fffbeb" } : undefined}>
                                <td><Link href={`/admin/seo/pages/edit?path=${encodeURIComponent(r.path)}`}><code>{r.path}</code></Link></td>
                                <td><textarea rows={2} style={{ width: "100%" }} value={r.title} placeholder={r.defTitle} onChange={(e) => edit(r.path, "title", e.target.value)} />{count(r.title || r.defTitle || "", 60)}</td>
                                <td><textarea rows={3} style={{ width: "100%" }} value={r.description} placeholder={r.defDesc} onChange={(e) => edit(r.path, "description", e.target.value)} />{count(r.description || r.defDesc || "", 160)}</td>
                                <td><input style={{ width: "100%" }} value={r.focusKeyword} onChange={(e) => edit(r.path, "focusKeyword", e.target.value)} /></td>
                                <td><input type="checkbox" checked={r.noindex} onChange={(e) => edit(r.path, "noindex", e.target.checked)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
