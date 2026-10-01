"use client";

import { useEffect, useState } from "react";
import { seoFetch } from "../seoApi";
import "../seo-admin.css";

type Org = Record<string, string | string[]>;
type Tpl = { title?: string; description?: string };
type Settings = { templates?: Record<string, Tpl>; titleSeparator?: string; siteName?: string; defaultOgImage?: string; twitterHandle?: string; organization: Org; indexNowKey?: string };

const TYPES = ["ProfessionalService", "Organization", "LocalBusiness", "Corporation", "OnlineBusiness", "Person"];
const ORG_FIELDS: [string, string][] = [
    ["name", "Business name"], ["url", "Website URL"], ["logo", "Logo URL"], ["description", "Description"],
    ["email", "Email"], ["phone", "Phone"], ["street", "Street"], ["city", "City"], ["region", "Region / State"],
    ["postalCode", "Postal code"], ["country", "Country code (e.g. BD)"], ["priceRange", "Price range"],
    ["founderName", "Founder name"], ["founderTitle", "Founder job title"], ["founderImage", "Founder image URL"],
    ["ratingValue", "Rating value (e.g. 4.8)"], ["ratingCount", "Review count"],
];

export default function SeoGeneral() {
    const [s, setS] = useState<Settings | null>(null);
    const [urls, setUrls] = useState("");
    const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

    useEffect(() => { seoFetch<Settings>("/admin/settings").then(setS).catch((e) => setMsg({ ok: false, text: e.message })); }, []);
    if (!s) return <div className="seo-page"><p>{msg?.text || "Loading…"}</p></div>;

    const o = s.organization || {};
    const setOrg = (k: string, v: string | string[]) => setS({ ...s, organization: { ...o, [k]: v } });
    const save = async () => {
        try {
            const { indexNowKey, ...body } = s; void indexNowKey;
            setS(await seoFetch<Settings>("/admin/settings", { method: "PUT", body: JSON.stringify(body) }));
            setMsg({ ok: true, text: "Saved. Schema updates on the site within 60 seconds." });
        } catch (e) { setMsg({ ok: false, text: (e as Error).message }); }
    };
    const submit = async () => {
        try {
            const r = await seoFetch<{ submitted: number }>("/admin/indexnow", { method: "POST", body: JSON.stringify({ urls: urls.split(/\s+/).filter(Boolean) }) });
            setMsg({ ok: true, text: `Submitted ${r.submitted} URL(s) to IndexNow.` });
        } catch (e) { setMsg({ ok: false, text: (e as Error).message }); }
    };

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>General SEO Settings</h1>
                <p>Site-wide knowledge graph schema (Organization, Founder, WebSite), social defaults and instant indexing.</p>
            </header>
            {msg && <p className={`seo-msg ${msg.ok ? "seo-msg--ok" : "seo-msg--err"}`}>{msg.text}</p>}

            <section className="seo-card">
                <h2>Titles & Social</h2>
                <div className="seo-field"><label>Site name</label><input value={s.siteName || ""} onChange={(e) => setS({ ...s, siteName: e.target.value })} /></div>
                <div className="seo-field"><label>Title separator</label><input value={s.titleSeparator || ""} onChange={(e) => setS({ ...s, titleSeparator: e.target.value })} /></div>
                <div className="seo-field"><label>Default share image URL</label><input value={s.defaultOgImage || ""} onChange={(e) => setS({ ...s, defaultOgImage: e.target.value })} /></div>
                <div className="seo-field"><label>X (Twitter) handle</label><input value={s.twitterHandle || ""} placeholder="@mailstora" onChange={(e) => setS({ ...s, twitterHandle: e.target.value })} /></div>
            </section>

            <section className="seo-card">
                <h2>Titles &amp; Meta Templates</h2>
                <p className="seo-help">
                    Used when a blog post, portfolio item or case study has no SEO title or description of its own. Variables:{" "}
                    <code>%title%</code> <code>%sitename%</code> <code>%sep%</code> <code>%category%</code> <code>%client%</code> <code>%platform%</code> <code>%excerpt%</code> <code>%year%</code>.
                    Titles longer than 60 characters automatically fall back to <code>%title% %sep% %sitename%</code>.
                </p>
                {([["blog", "Blog posts"], ["portfolio", "Portfolio items"], ["caseStudy", "Case studies"]] as const).map(([k, label]) => {
                    const t = s.templates?.[k] || {};
                    const setT = (f: keyof Tpl, v: string) => setS({ ...s, templates: { ...(s.templates || {}), [k]: { ...t, [f]: v } } });
                    const preview = (tpl = "") => tpl
                        .replace(/%title%/g, k === "blog" ? "How to Fix HTML Emails in Outlook" : k === "portfolio" ? "Black Friday Sale Email" : "How TechFlow Increased Onboarding by 121%")
                        .replace(/%sitename%/g, s.siteName || "MailStora").replace(/%sep%/g, s.titleSeparator || "|")
                        .replace(/%client%/g, "TechFlow").replace(/%platform%/g, "Klaviyo").replace(/%category%/g, "Email Development")
                        .replace(/%excerpt%/g, "A short summary of the page.").replace(/%year%/g, "2026");
                    return (
                        <div key={k} style={{ borderTop: "1px solid #f1f5f9", paddingTop: "0.75rem", marginTop: "0.75rem" }}>
                            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>{label}</h3>
                            <div className="seo-field"><label>Title template</label><input value={t.title || ""} onChange={(e) => setT("title", e.target.value)} /></div>
                            <div className="seo-field"><label>Description template</label><input value={t.description || ""} onChange={(e) => setT("description", e.target.value)} /></div>
                            <p className="seo-help" style={{ margin: 0 }}>Preview: <strong>{preview(t.title)}</strong> <span style={{ color: preview(t.title).length > 60 ? "#dc2626" : "#16a34a" }}>({preview(t.title).length}/60)</span></p>
                        </div>
                    );
                })}
                <button type="button" className="seo-btn" style={{ marginTop: "1rem" }} onClick={save}>Save Templates</button>
            </section>

            <section className="seo-card">
                <h2>Knowledge Graph Schema</h2>
                <div className="seo-field">
                    <label>Schema type</label>
                    <select value={String(o.type || "ProfessionalService")} onChange={(e) => setOrg("type", e.target.value)}>
                        {TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                </div>
                {ORG_FIELDS.map(([k, l]) => (
                    <div key={k} className="seo-field"><label>{l}</label><input value={String(o[k] || "")} onChange={(e) => setOrg(k, e.target.value)} /></div>
                ))}
                <div className="seo-field">
                    <label>Social profiles (sameAs), one URL per line</label>
                    <textarea rows={5} value={(Array.isArray(o.sameAs) ? o.sameAs : []).join("\n")} onChange={(e) => setOrg("sameAs", e.target.value.split("\n"))} />
                </div>
                <button type="button" className="seo-btn" onClick={save}>Save Settings</button>
            </section>

            <section className="seo-card">
                <h2>Instant Indexing (IndexNow)</h2>
                <p className="seo-help">Tells Bing, Yandex, Seznam and Naver about new or changed URLs. Google does not use IndexNow; use Search Console for Google. Key: <code>{s.indexNowKey || "created on first submit"}</code></p>
                <div className="seo-field"><label>URLs, one per line</label><textarea rows={5} value={urls} placeholder="https://mailstora.com/blog/new-post/" onChange={(e) => setUrls(e.target.value)} /></div>
                <button type="button" className="seo-btn" onClick={submit}>Submit URLs</button>
            </section>
        </div>
    );
}
