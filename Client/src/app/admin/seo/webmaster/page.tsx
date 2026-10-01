"use client";

import { useEffect, useState } from "react";
import { seoFetch } from "../seoApi";
import "../seo-admin.css";

type Settings = {
    webmaster: { google: string; bing: string; yandex: string; pinterest: string };
    analytics: { ga4: string; gtm: string; clarity: string; metaPixel: string };
    robots: string;
};

// Accept a full meta tag or just the code, and keep only the code
const extract = (v: string) => {
    const m = v.match(/content=["']([^"']+)["']/i);
    return (m ? m[1] : v).trim();
};

const WEBMASTER = [
    { key: "google", label: "Google Search Console", help: "Search Console › Settings › Ownership verification › HTML tag. Paste the tag or just the content code." },
    { key: "bing", label: "Bing Webmaster Tools", help: "The msvalidate.01 code from Bing's HTML meta tag option." },
    { key: "yandex", label: "Yandex Webmaster", help: "The yandex-verification code." },
    { key: "pinterest", label: "Pinterest", help: "The p:domain_verify code from Pinterest's claim website page." },
] as const;

const ANALYTICS = [
    { key: "ga4", label: "Google Analytics 4 Measurement ID", placeholder: "G-XXXXXXXXXX" },
    { key: "gtm", label: "Google Tag Manager Container ID", placeholder: "GTM-XXXXXXX" },
    { key: "clarity", label: "Microsoft Clarity Project ID", placeholder: "abcd1234ef" },
    { key: "metaPixel", label: "Meta (Facebook) Pixel ID", placeholder: "123456789012345" },
] as const;

const PATTERNS: Record<string, RegExp> = { ga4: /^G-[A-Z0-9]{4,20}$/, gtm: /^GTM-[A-Z0-9]{4,12}$/, clarity: /^[a-z0-9]{6,20}$/, metaPixel: /^\d{8,20}$/ };

export default function WebmasterPage() {
    const [s, setS] = useState<Settings | null>(null);
    const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        seoFetch<Settings>("/admin/settings").then(setS).catch((e) => setMsg({ ok: false, text: e.message }));
    }, []);

    if (!s) return <div className="seo-page">{msg ? <p className="seo-msg seo-msg--err">{msg.text}</p> : <p>Loading...</p>}</div>;

    const bad = Object.entries(s.analytics).filter(([k, v]) => v && !PATTERNS[k].test(v)).map(([k]) => k);
    const robotsBlocksAll = /^\s*disallow:\s*\/\s*$/im.test(s.robots);

    const save = async () => {
        setBusy(true);
        setMsg(null);
        try {
            const saved = await seoFetch<Settings>("/admin/settings", {
                method: "PUT",
                body: JSON.stringify({
                    webmaster: Object.fromEntries(Object.entries(s.webmaster).map(([k, v]) => [k, extract(v)])),
                    analytics: s.analytics,
                    robots: s.robots,
                }),
            });
            setS(saved);
            setMsg({ ok: true, text: "Saved. Changes appear on the live site within a minute." });
        } catch (e) {
            setMsg({ ok: false, text: (e as Error).message });
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>Webmaster Tools</h1>
                <p>Verify the site with search engines, connect tracking tools and edit robots.txt.</p>
            </header>

            {msg && <p className={`seo-msg ${msg.ok ? "seo-msg--ok" : "seo-msg--err"}`}>{msg.text}</p>}

            <section className="seo-card">
                <h2>Search engine verification</h2>
                <p className="seo-help">No verification tag was found in the site code, so Search Console is either not set up or verified by DNS. Add the code here to verify with an HTML tag.</p>
                <div className="seo-grid-2">
                    {WEBMASTER.map((w) => (
                        <div className="seo-field" key={w.key}>
                            <label htmlFor={`w-${w.key}`}>{w.label}</label>
                            <input
                                id={`w-${w.key}`}
                                value={s.webmaster[w.key]}
                                onChange={(e) => setS({ ...s, webmaster: { ...s.webmaster, [w.key]: e.target.value } })}
                            />
                            <small>{w.help}</small>
                        </div>
                    ))}
                </div>
            </section>

            <section className="seo-card">
                <h2>Analytics and tracking</h2>
                <p className="seo-help">Scripts load only for IDs in the correct format. If you add analytics for EU or UK visitors, a cookie consent banner is required by law.</p>
                <div className="seo-grid-2">
                    {ANALYTICS.map((a) => (
                        <div className="seo-field" key={a.key}>
                            <label htmlFor={`a-${a.key}`}>{a.label}</label>
                            <input
                                id={`a-${a.key}`}
                                placeholder={a.placeholder}
                                value={s.analytics[a.key]}
                                onChange={(e) => setS({ ...s, analytics: { ...s.analytics, [a.key]: e.target.value.trim() } })}
                            />
                            {bad.includes(a.key) && <small style={{ color: "#b91c1c" }}>This does not look like a valid ID, so it will not load.</small>}
                        </div>
                    ))}
                </div>
            </section>

            <section className="seo-card">
                <h2>robots.txt</h2>
                <p className="seo-help">Controls what search engines may crawl. Served at <a href="/robots.txt" target="_blank" rel="noreferrer">/robots.txt</a>.</p>
                {robotsBlocksAll && <p className="seo-msg seo-msg--err">Warning: “Disallow: /” blocks search engines from the whole site.</p>}
                <div className="seo-field">
                    <textarea value={s.robots} onChange={(e) => setS({ ...s, robots: e.target.value })} spellCheck={false} />
                </div>
            </section>

            <div>
                <button type="button" className="seo-btn" onClick={save} disabled={busy}>{busy ? "Saving..." : "Save Settings"}</button>
            </div>
        </div>
    );
}
