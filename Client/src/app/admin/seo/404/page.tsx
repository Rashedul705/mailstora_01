"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { seoFetch } from "../seoApi";
import "../seo-admin.css";

type Row = { _id: string; path: string; hits: number; referrer?: string; lastSeen: string; ignored: boolean };

export default function NotFoundMonitor() {
    const [rows, setRows] = useState<Row[]>([]);
    const [showIgnored, setShowIgnored] = useState(false);
    const [error, setError] = useState("");

    const load = () => seoFetch<Row[]>("/admin/404").then(setRows).catch((e) => setError(e.message));
    useEffect(() => {
        load();
    }, []);

    const ignore = async (r: Row) => {
        await seoFetch(`/admin/404/${r._id}`, { method: "PATCH", body: JSON.stringify({ ignored: !r.ignored }) });
        load();
    };
    const remove = async (r: Row) => {
        await seoFetch(`/admin/404/${r._id}`, { method: "DELETE" });
        load();
    };
    const clearAll = async () => {
        if (!confirm("Clear the whole 404 log?")) return;
        await seoFetch("/admin/404", { method: "DELETE" });
        load();
    };

    const shown = rows.filter((r) => showIgnored || !r.ignored);

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>404 Monitor</h1>
                <p>URLs visitors tried to open that do not exist. Redirect the useful ones and ignore the rest (bots, typos).</p>
            </header>

            {error && <p className="seo-msg seo-msg--err">{error}</p>}

            <section className="seo-card">
                <div className="seo-row" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
                    <label style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.9rem" }}>
                        <input type="checkbox" checked={showIgnored} onChange={(e) => setShowIgnored(e.target.checked)} /> Show ignored
                    </label>
                    {rows.length > 0 && <button type="button" className="seo-btn seo-btn--danger" onClick={clearAll}>Clear log</button>}
                </div>

                {shown.length === 0 ? (
                    <p className="seo-empty">No 404 errors recorded.</p>
                ) : (
                    <table className="seo-table">
                        <thead>
                            <tr><th>URL</th><th>Hits</th><th>Last seen</th><th>Came from</th><th></th></tr>
                        </thead>
                        <tbody>
                            {shown.map((r) => (
                                <tr key={r._id} style={{ opacity: r.ignored ? 0.5 : 1 }}>
                                    <td><code>{r.path}</code></td>
                                    <td>{r.hits}</td>
                                    <td>{new Date(r.lastSeen).toLocaleString()}</td>
                                    <td style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.referrer || "Direct"}</td>
                                    <td className="seo-actions">
                                        <Link href={`/admin/seo/redirects?source=${encodeURIComponent(r.path)}`} className="seo-btn" style={{ padding: "0.35rem 0.7rem", fontSize: "0.8rem", textDecoration: "none" }}>Redirect</Link>
                                        <button type="button" className="seo-btn seo-btn--ghost" onClick={() => ignore(r)}>{r.ignored ? "Unignore" : "Ignore"}</button>
                                        <button type="button" className="seo-btn seo-btn--danger" onClick={() => remove(r)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}
