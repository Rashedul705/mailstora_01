"use client";

import { useEffect, useState } from "react";
import { seoFetch } from "../seoApi";
import "../seo-admin.css";

type Redirect = { _id: string; source: string; target: string; type: number; active: boolean; hits: number; lastHit?: string; note?: string };

const EMPTY = { source: "", target: "", type: 301, note: "" };

export default function RedirectsPage() {
    const [list, setList] = useState<Redirect[]>([]);
    const [form, setForm] = useState(EMPTY);
    const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
    const [busy, setBusy] = useState(false);
    const [filter, setFilter] = useState("");

    const load = () => seoFetch<Redirect[]>("/admin/redirects").then(setList).catch((e) => setMsg({ ok: false, text: e.message }));

    useEffect(() => {
        load();
        // Pre-fill from the 404 monitor ("Redirect" button)
        const src = new URLSearchParams(window.location.search).get("source");
        if (src) setForm((f) => ({ ...f, source: src }));
    }, []);

    const save = async (e: React.FormEvent) => {
        e.preventDefault();
        setBusy(true);
        setMsg(null);
        try {
            await seoFetch("/admin/redirects", { method: "POST", body: JSON.stringify(form) });
            setForm(EMPTY);
            setMsg({ ok: true, text: "Redirect saved. It goes live within a minute." });
            load();
        } catch (err) {
            setMsg({ ok: false, text: (err as Error).message });
        } finally {
            setBusy(false);
        }
    };

    const toggle = async (r: Redirect) => {
        await seoFetch(`/admin/redirects/${r._id}`, { method: "PUT", body: JSON.stringify({ active: !r.active }) });
        load();
    };

    const remove = async (r: Redirect) => {
        if (!confirm(`Delete the redirect from ${r.source}?`)) return;
        await seoFetch(`/admin/redirects/${r._id}`, { method: "DELETE" });
        load();
    };

    const exportCsv = () => {
        const rows = [["source", "target", "type", "active", "hits"], ...list.map((r) => [r.source, r.target, r.type, r.active, r.hits])];
        const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
        a.download = "mailstora-redirects.csv";
        a.click();
    };

    const importCsv = async (file: File) => {
        const text = await file.text();
        const lines = text.split(/\r?\n/).slice(1).filter(Boolean);
        let ok = 0;
        for (const line of lines) {
            const [source, target, type] = line.split(",").map((c) => c.replace(/^"|"$/g, "").trim());
            try {
                await seoFetch("/admin/redirects", { method: "POST", body: JSON.stringify({ source, target, type: Number(type) || 301 }) });
                ok++;
            } catch {
                // skip bad rows
            }
        }
        setMsg({ ok: true, text: `Imported ${ok} of ${lines.length} redirects.` });
        load();
    };

    const shown = list.filter((r) => !filter || r.source.includes(filter) || r.target.includes(filter));

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>Redirections</h1>
                <p>Send visitors and search engines from an old URL to a new one. Use 301 for permanent moves.</p>
            </header>

            {msg && <p className={`seo-msg ${msg.ok ? "seo-msg--ok" : "seo-msg--err"}`}>{msg.text}</p>}

            <form className="seo-card" onSubmit={save}>
                <h2>Add a redirect</h2>
                <div className="seo-row">
                    <div className="seo-field">
                        <label htmlFor="r-src">Old URL (source)</label>
                        <input id="r-src" placeholder="/old-page/" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} required />
                    </div>
                    <div className="seo-field">
                        <label htmlFor="r-tgt">New URL (target)</label>
                        <input id="r-tgt" placeholder="/new-page/ or https://..." value={form.target} disabled={form.type === 410} onChange={(e) => setForm({ ...form, target: e.target.value })} />
                    </div>
                    <div className="seo-field" style={{ flex: "0 0 190px" }}>
                        <label htmlFor="r-type">Type</label>
                        <select id="r-type" value={form.type} onChange={(e) => setForm({ ...form, type: Number(e.target.value) })}>
                            <option value={301}>301 Permanent</option>
                            <option value={302}>302 Temporary</option>
                            <option value={307}>307 Temporary</option>
                            <option value={308}>308 Permanent</option>
                            <option value={410}>410 Content deleted</option>
                        </select>
                    </div>
                    <button className="seo-btn" disabled={busy}>{busy ? "Saving..." : "Add Redirect"}</button>
                </div>
            </form>

            <section className="seo-card">
                <div className="seo-row" style={{ marginBottom: "1rem", justifyContent: "space-between" }}>
                    <div className="seo-field" style={{ maxWidth: 320 }}>
                        <input placeholder="Search redirects" value={filter} onChange={(e) => setFilter(e.target.value)} />
                    </div>
                    <div className="seo-actions">
                        <button type="button" className="seo-btn seo-btn--ghost" onClick={exportCsv}>Export CSV</button>
                        <label className="seo-btn seo-btn--ghost" style={{ cursor: "pointer" }}>
                            Import CSV
                            <input type="file" accept=".csv" hidden onChange={(e) => e.target.files?.[0] && importCsv(e.target.files[0])} />
                        </label>
                    </div>
                </div>

                {shown.length === 0 ? (
                    <p className="seo-empty">No redirects yet.</p>
                ) : (
                    <table className="seo-table">
                        <thead>
                            <tr><th>From</th><th>To</th><th>Type</th><th>Hits</th><th>Status</th><th></th></tr>
                        </thead>
                        <tbody>
                            {shown.map((r) => (
                                <tr key={r._id}>
                                    <td><code>{r.source}</code></td>
                                    <td>{r.type === 410 ? <em>Deleted (410)</em> : <code>{r.target}</code>}</td>
                                    <td>{r.type}</td>
                                    <td>{r.hits}</td>
                                    <td><span className={`seo-pill ${r.active ? "seo-pill--on" : "seo-pill--off"}`}>{r.active ? "Active" : "Paused"}</span></td>
                                    <td className="seo-actions">
                                        <button type="button" className="seo-btn seo-btn--ghost" onClick={() => toggle(r)}>{r.active ? "Pause" : "Activate"}</button>
                                        <button type="button" className="seo-btn seo-btn--danger" onClick={() => remove(r)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <p className="seo-help" style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#6b7280" }}>
                    CSV format: source,target,type (one redirect per line, with a header row).
                </p>
            </section>
        </div>
    );
}
