"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "../../seo/seoApi";
import { siteConfig } from "../../../../utils/siteConfig";
import "../../seo/seo-admin.css";

type Tree = Record<string, unknown>;
type Rev = { _id: string; createdAt: string; user?: string; data: Tree };

// Editable site-wide details. Defaults come from utils/siteConfig.ts; saved values override them on the website.
const GROUPS: { title: string; base: string; fields: [string, string][] }[] = [
    { title: "Business", base: "", fields: [["name", "Site name"], ["description", "Short description"]] },
    { title: "Founder & Contact", base: "founder", fields: [["name", "Founder name"], ["role", "Founder role"], ["email", "Contact email"], ["whatsapp", "WhatsApp number (digits, with country code)"]] },
    { title: "Social Profiles", base: "founder.socials", fields: [["upwork", "Upwork URL"], ["fiverr", "Fiverr URL"], ["linkedin", "LinkedIn URL"], ["facebook", "Facebook URL"]] },
    { title: "Upwork Profile Figures", base: "upwork", fields: [["headline", "Headline"], ["jobSuccess", "Job Success"], ["badge", "Badge"], ["rating", "Rating"], ["reviews", "Reviews"], ["feedbackCount", "Client feedback count"], ["totalJobs", "Total jobs"], ["totalHours", "Total hours"], ["location", "Location"]] },
    { title: "Stats Shown Across the Site", base: "stats", fields: [["yearsExperience", "Years of experience"], ["templatesBuilt", "Templates built"], ["clientsServed", "Clients served"], ["upworkHours", "Upwork hours"], ["turnaround", "Turnaround"]] },
];

const get = (o: Tree, path: string): string => {
    const v = path.split(".").filter(Boolean).reduce<unknown>((a, k) => (a && typeof a === "object" ? (a as Tree)[k] : undefined), o);
    return v === undefined || v === null ? "" : String(v);
};
const setIn = (o: Tree, path: string, v: string): Tree => {
    const keys = path.split(".").filter(Boolean);
    const out: Tree = { ...o };
    let cur = out;
    keys.forEach((k, i) => {
        if (i === keys.length - 1) cur[k] = v;
        else { cur[k] = { ...((cur[k] as Tree) || {}) }; cur = cur[k] as Tree; }
    });
    return out;
};

export default function SiteSettings() {
    const [data, setData] = useState<Tree>({});
    const [revs, setRevs] = useState<Rev[]>([]);
    const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

    const load = () => {
        adminFetch<Tree>("/site-settings").then(setData).catch((e) => setMsg({ ok: false, text: e.message }));
        adminFetch<Rev[]>("/revisions?kind=site-settings").then(setRevs).catch(() => {});
    };
    useEffect(load, []);

    const save = async () => {
        try {
            await adminFetch("/site-settings", { method: "PUT", body: JSON.stringify(data) });
            setMsg({ ok: true, text: "Saved. The website updates within 60 seconds." });
            load();
        } catch (e) { setMsg({ ok: false, text: (e as Error).message }); }
    };
    const restore = async (id: string) => {
        if (!confirm("Restore this version? The current values are kept as a revision.")) return;
        try {
            await adminFetch(`/revisions/${id}/restore`, { method: "POST" });
            setMsg({ ok: true, text: "Version restored." });
            load();
        } catch (e) { setMsg({ ok: false, text: (e as Error).message }); }
    };

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>Site Settings</h1>
                <p>Contact details, social links and the numbers shown across the website (header, footer, founder, reviews, stats). Leave a field blank to use the default shown in grey.</p>
            </header>
            {msg && <p className={`seo-msg ${msg.ok ? "seo-msg--ok" : "seo-msg--err"}`}>{msg.text}</p>}

            {GROUPS.map((g) => (
                <section key={g.title} className="seo-card">
                    <h2>{g.title}</h2>
                    {g.fields.map(([k, label]) => {
                        const path = g.base ? `${g.base}.${k}` : k;
                        return (
                            <div key={path} className="seo-field">
                                <label>{label}</label>
                                <input value={get(data, path)} placeholder={get(siteConfig as unknown as Tree, path)} onChange={(e) => setData(setIn(data, path, e.target.value))} />
                            </div>
                        );
                    })}
                </section>
            ))}
            <button type="button" className="seo-btn" onClick={save}>Save Site Settings</button>

            <section className="seo-card" style={{ marginTop: "1.5rem" }}>
                <div className="seo-row" style={{ justifyContent: "space-between" }}>
                    <h2>Revision History</h2>
                    {revs.length > 0 && <button type="button" className="seo-btn seo-btn--danger" onClick={async () => {
                        if (!confirm("Delete all saved versions? This cannot be undone.")) return;
                        await adminFetch("/revisions?kind=site-settings", { method: "DELETE" });
                        setRevs([]);
                        setMsg({ ok: true, text: "Revision history cleared." });
                    }}>Clear revisions</button>}
                </div>
                {revs.length === 0 ? <p className="seo-empty">No earlier versions yet.</p> : (
                    <table className="seo-table">
                        <thead><tr><th>Saved before</th><th>By</th><th></th></tr></thead>
                        <tbody>
                            {revs.map((r) => (
                                <tr key={r._id}>
                                    <td>{new Date(r.createdAt).toLocaleString()}</td>
                                    <td>{r.user || "–"}</td>
                                    <td><button type="button" className="seo-btn seo-btn--ghost" onClick={() => restore(r._id)}>Restore</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}
