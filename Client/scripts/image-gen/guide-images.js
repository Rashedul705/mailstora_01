// One illustration per section of the long guides on the growth service pages.
// Output: public/images/media/generated/<slug>-guide-<section id>.webp (1000 x 750)
// Usage: node scripts/image-gen/guide-images.js [slug]
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const K = require("./kit");
const V = require("./scenes");
require("./services"); // extra icons (bolt, grid, palette...)
const G = require("./services-growth");
const { txt, bar } = V;

const OUT = path.join(__dirname, "..", "..", "public", "images", "media", "generated");
const W = 1000, H = 750;

const theme = (bg1, bg2, brand, hero1, hero2) => ({
    bg1, bg2, plant: "#5b6b8c", shadow: "#1e293b", brand, hero1, hero2, product: "#fef3c7",
    productAlt: ["#fdba74", "#93c5fd", "#86efac"], plants: [[930, 640, 0.8]], bokeh: [[120, 90, 26], [880, 110, 20]],
});
const T = {
    seo: theme("#e8f1fd", "#d3e3f8", "#1a73e8", "#1a73e8", "#34a853"),
    ads: theme("#f1edff", "#e0d8fb", "#7c3aed", "#8b5cf6", "#ec4899"),
};
const doc = (t, b) => K.svgDoc(W, H, t, b);
const tile = (name, x, y, s = 84) => K.brandTile(x, y, s, name, { small: true });
const ic = (name, color, x, y, s = 36) => K.place((K.icon[name] || K.icon.check)(color), x, y, s);

/** Checklist card: heading and rows with an icon each */
function list(x, y, w, head, rows, t, icon = "check") {
    const h = 86 + rows.length * 64;
    return K.card(x, y, w, h, `${txt(x + 28, y + 50, head, 24, 800)}
      ${rows.map((r, i) => `<rect x="${x + 22}" y="${y + 72 + i * 64}" width="${w - 44}" height="52" rx="14" fill="#f8fafc"/>
        ${ic(Array.isArray(r) ? r[1] : icon, Array.isArray(r) && r[2] ? r[2] : t.brand, x + 36, y + 80 + i * 64, 34)}
        ${txt(x + 84, y + 105 + i * 64, Array.isArray(r) ? r[0] : r, 19, 700, "#334155")}`).join("")}`, { r: 24 });
}
/** Big number / label chip */
const stat = (x, y, w, value, label, color) => K.card(x, y, w, 120, `${txt(x + 24, y + 58, value, 38, 900, color)}${txt(x + 24, y + 92, label, 17, 700, "#64748b")}`, { r: 20, small: true });

const S = {
    /* ── SEO, AEO and GEO ── */
    "seo-aeo-geo-services": {
        t: T.seo,
        "what-is-seo-aeo-geo": (t) => {
            const c = [["SEO", "Rank", "#1a73e8", "google"], ["AEO", "Answer", "#16a34a", "googlesearchconsole"], ["GEO", "Be cited", "#7c3aed", "openai"]];
            return c.map(([a, b, col, br], i) => K.card(70 + i * 300, 190, 260, 340, `<circle cx="${200 + i * 300}" cy="290" r="62" fill="${col}"/>${txt(200 + i * 300, 304, a, 38, 900, "#ffffff", "middle")}
              ${txt(200 + i * 300, 400, b, 26, 800, "#0f172a", "middle")}${tile(br, 158 + i * 300, 420, 70)}`, { r: 26 })).join("")
              + K.pill(330, 600, "One plan for search and AI", t, { big: true, dot: t.brand, w: 390 });
        },
        "technical-seo": (t) => K.laptop(60, 150, 520, t, (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0f172a"/>
              ${["robots.txt  ✓", "sitemap.xml  ✓", "canonical  ✓", "schema  ✓", "HTTPS  ✓"].map((l, i) => txt(x + 24, y + 44 + i * 44, l, 18, 700, i % 2 ? "#86efac" : "#93c5fd")).join("")}`)
              + list(610, 120, 330, "Site health", [["Crawlable", "check", "#16a34a"], ["Indexed", "check", "#16a34a"], ["Core Web Vitals", "bolt", "#f59e0b"], ["Mobile-first", "phone"], ["Schema", "code"]], t),
        "on-page-seo": (t) => K.card(70, 110, 560, 420, `${txt(100, 160, "Search result preview", 20, 800)}
              <rect x="96" y="186" width="508" height="150" rx="14" fill="#f8fafc"/>
              ${txt(118, 220, "yourbrand.com › services", 15, 600, "#16a34a")}${txt(118, 256, "HTML Email Development Agency | Brand", 22, 800, "#1a0dab")}
              ${bar(118, 276, 440, 9, "#cbd5e1")}${bar(118, 294, 360, 9, "#e2e8f0")}
              ${[["Title", "60 chars"], ["H1", "1 per page"], ["Keywords", "in intent"]].map(([a, b], i) => `<rect x="${96 + i * 172}" y="364" width="160" height="120" rx="14" fill="#eef2ff"/>${txt(116 + i * 172, 412, a, 22, 800, "#1a73e8")}${txt(116 + i * 172, 446, b, 16, 700, "#64748b")}`).join("")}`, { r: 26 })
              + list(660, 180, 280, "On-page", [["Headings", "grid"], ["Internal links", "link"], ["Alt text", "check"]], t),
        "content-seo": (t) => {
            let b = `<g stroke="#ffffff" stroke-width="5" stroke-dasharray="10 10">${[[250, 200], [750, 200], [200, 560], [800, 560]].map(([x, y]) => `<path d="M500 380 L${x} ${y}"/>`).join("")}</g>`;
            b += K.card(360, 300, 280, 160, `${txt(500, 366, "Pillar page", 26, 900, "#0f172a", "middle")}${txt(500, 404, "Main topic", 18, 700, "#64748b", "middle")}`, { r: 24 });
            [["Guide", 110, 130], ["How-to", 610, 130], ["FAQ", 60, 490], ["Comparison", 660, 490]].forEach(([l, x, y]) => { b += K.card(x, y, 250, 130, `${ic("envelope", t.brand, x + 24, y + 42, 40)}${txt(x + 80, y + 76, l, 22, 800)}`, { r: 20, small: true }); });
            return b;
        },
        "off-page-seo": (t) => {
            const nodes = [[150, 120, "Press"], [720, 120, "Partners"], [110, 520, "Reviews"], [740, 520, "Directories"]];
            let b = nodes.map(([x, y]) => `<path d="M${x + 110} ${y + 60} L500 375" stroke="${t.brand}" stroke-width="4" opacity=".5"/>`).join("");
            b += K.card(390, 290, 220, 170, `${txt(500, 360, "Your site", 24, 900, "#0f172a", "middle")}${txt(500, 396, "Trusted", 18, 700, "#16a34a", "middle")}`, { r: 24 });
            nodes.forEach(([x, y, l]) => { b += K.card(x, y, 220, 120, `${ic("link", t.brand, x + 22, y + 42, 36)}${txt(x + 72, y + 70, l, 21, 800)}`, { r: 20, small: true }); });
            return b;
        },
        "local-seo": (t) => K.card(80, 110, 480, 520, `<rect x="80" y="110" width="480" height="300" rx="24" fill="#dbeafe"/>
              ${[0, 1, 2, 3].map((i) => `<path d="M${80 + i * 140} 110 L${140 + i * 120} 410" stroke="#bfdbfe" stroke-width="10"/>`).join("")}
              <path d="M320 180 c-44 0 -70 34 -70 68 c0 52 70 110 70 110 s70 -58 70 -110 c0 -34 -26 -68 -70 -68z" fill="#ea4335"/><circle cx="320" cy="248" r="24" fill="#ffffff"/>
              ${txt(110, 460, "Your Business", 26, 900)}${txt(110, 500, "★★★★★  4.9 · 120 reviews", 20, 700, "#f59e0b")}${txt(110, 540, "Open now · Directions · Call", 18, 700, "#64748b")}`, { r: 24 })
              + list(600, 180, 330, "Local signals", [["Google Business", "check"], ["Same NAP details", "check"], ["Reviews", "heart", "#ec4899"]], t),
        "ecommerce-seo": (t) => K.laptop(60, 150, 560, t, (x, y, w, h) => V.storePage(x, y, w, h, t))
              + list(640, 150, 300, "Store SEO", [["Category copy", "grid"], ["Product schema", "code"], ["Merchant feed", "chart"], ["Clean filters", "check"]], t),
        "aeo": (t) => K.laptop(60, 140, 560, t, (x, y, w, h) => G.__serp(x, y, w, h, t, "how to fix outlook email"))
              + stat(650, 170, 290, "Snippet", "Direct answer won", "#16a34a") + stat(650, 320, 290, "FAQ", "Schema on every page", "#1a73e8") + stat(650, 470, 290, "AI Overview", "Cited as a source", "#7c3aed"),
        "geo": (t) => K.phone(120, 80, 280, t, (x, y, w, h) => G.__aiChat(x, y, w, h, t, "openai"))
              + K.card(460, 150, 470, 150, `${txt(490, 200, "“Recommended agencies”", 22, 800)}${txt(490, 240, "1. Your brand", 22, 900, "#16a34a")}${txt(490, 272, "Source: yourbrand.com", 16, 700, "#64748b")}`, { r: 22 })
              + [["openai", 0], ["perplexity", 1], ["google", 2]].map(([n, i]) => tile(n, 470 + i * 110, 350, 90)).join("")
              + K.pill(470, 500, "Clear entity + trusted mentions", t, { big: true, dot: "#7c3aed", w: 430 }),
        "measurement": (t) => K.card(70, 110, 560, 460, `${txt(100, 160, "Monthly report", 22, 800)}
              ${[60, 80, 72, 110, 130, 160].map((v, i) => `<rect x="${110 + i * 82}" y="${520 - v * 2}" width="54" height="${v * 2}" rx="8" fill="${i === 5 ? t.brand : "#bfdbfe"}"/>`).join("")}
              <rect x="100" y="522" width="500" height="3" fill="#e2e8f0"/>`, { r: 26 })
              + stat(660, 140, 280, "Clicks", "Organic traffic", "#1a73e8") + stat(660, 290, 280, "Rankings", "Target keywords", "#16a34a") + stat(660, 440, 280, "AI mentions", "Brand citations", "#7c3aed"),
        "timeline": (t) => {
            const m = [["Weeks 1–4", "Audit and fixes", "#1a73e8"], ["Months 2–3", "Pages and content", "#16a34a"], ["Months 3–6+", "Rankings build", "#7c3aed"]];
            return `<path d="M140 380 H860" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>` + m.map(([a, b, c], i) => `<circle cx="${180 + i * 320}" cy="380" r="26" fill="${c}"/>`
              + K.card(70 + i * 320, 440, 250, 150, `${txt(90 + i * 320, 490, a, 24, 900, c)}${txt(90 + i * 320, 530, b, 19, 700, "#334155")}`, { r: 20 })).join("")
              + K.pill(330, 200, "Realistic milestones", t, { big: true, dot: t.brand, w: 340 });
        },
    },

    /* ── Performance marketing ── */
    "performance-marketing": {
        t: T.ads,
        "what-is-performance-marketing": (t) => [["ROAS", "Return on ad spend", "#16a34a"], ["CPA", "Cost per sale", "#7c3aed"], ["CAC", "Cost per customer", "#ec4899"], ["LTV", "Customer value", "#f97316"]]
            .map(([a, b, c], i) => stat(100 + (i % 2) * 420, 170 + Math.floor(i / 2) * 200, 380, a, b, c)).join("")
            + K.pill(330, 600, "Paid ads judged by results", t, { big: true, dot: t.brand, w: 380 }),
        "meta-ads": (t) => K.phone(140, 70, 290, t, (x, y, w, h) => G.__adPost(x, y, w, h, t))
            + tile("meta", 500, 120, 100) + list(500, 260, 430, "Meta campaigns", [["Advantage+ shopping", "chart"], ["Retargeting", "link"], ["Pixel + Conversions API", "code"]], t),
        "tiktok-ads": (t) => K.phone(140, 70, 290, t, (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0f172a"/>
              <rect x="${x}" y="${y}" width="${w}" height="${h * 0.8}" fill="url(#heroGrad)"/><circle cx="${x + w / 2}" cy="${y + h * 0.4}" r="${w * 0.14}" fill="#ffffff" opacity=".9"/>
              <path d="M${x + w / 2 - 12} ${y + h * 0.4 - 18} l30 18 -30 18z" fill="${t.brand}"/>${txt(x + 20, y + h * 0.88, "Spark Ad · Shop now", 16, 800, "#ffffff")}`)
            + tile("tiktok", 500, 120, 100) + list(500, 260, 430, "TikTok ads", [["Hook in 2 seconds", "bolt"], ["Creator content", "user"], ["Events API", "code"]], t),
        "google-ads": (t) => K.laptop(60, 150, 540, t, (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff"/>
              ${K.place(K.brandMark("google"), x + 16, y + 14, 28)}<rect x="${x + 56}" y="${y + 14}" width="${w - 76}" height="30" rx="15" fill="#f1f5f9"/>
              ${[0, 1].map((i) => `${txt(x + 24, y + 80 + i * 90, "Sponsored", 12, 800, "#0f172a")}${txt(x + 24, y + 104 + i * 90, i ? "Other brand" : "Your brand · Shop now", 18, 700, "#1a0dab")}${bar(x + 24, y + 116 + i * 90, w * 0.6, 7, "#cbd5e1")}`).join("")}`)
            + tile("googleads", 640, 130, 100) + list(640, 270, 300, "Google Ads", [["Search", "link"], ["Shopping + PMax", "chart"], ["YouTube", "bolt"]], t),
        "chatgpt-ads": (t) => K.phone(140, 70, 290, t, (x, y, w, h) => G.__aiChat(x, y, w, h, t, "openai"))
            + tile("openai", 500, 120, 100) + list(500, 260, 430, "AI chat ads", [["Small test budget", "chart"], ["Helpful messaging", "envelope"], ["Compared on CPA", "check"]], t),
        "tracking": (t) => list(90, 130, 420, "Tracking stack", [["GA4 + consent mode", "chart"], ["Google Tag Manager", "code"], ["Meta Conversions API", "link"], ["TikTok Events API", "link"], ["UTM naming", "check"]], t)
            + [["googleanalytics", 0], ["meta", 1], ["tiktok", 2]].map(([n, i]) => tile(n, 590 + i * 110, 200, 90)).join("")
            + stat(590, 360, 310, "1 view", "Spend vs revenue", "#16a34a"),
        "creative": (t) => ["Hook A", "Hook B", "Hook C"].map((l, i) => K.card(80 + i * 290, 150, 250, 400, `<rect x="${96 + i * 290}" y="166" width="218" height="240" rx="14" fill="${["#fdba74", "#c4b5fd", "#f9a8d4"][i]}"/>
              ${txt(110 + i * 290, 450, l, 24, 900)}${txt(110 + i * 290, 490, ["Testing", "Winner ★", "Testing"][i], 18, 800, i === 1 ? "#16a34a" : "#64748b")}`, { r: 22, stroke: i === 1 ? "#16a34a" : undefined }))
            .join("") + K.pill(360, 620, "Test, keep the winner", t, { big: true, dot: "#16a34a", w: 340 }),
        "full-funnel": (t) => [["Ad click", "meta"], ["Site visit", "shopify"], ["Email signup", "gmail"], ["Purchase", "shopify"]].map(([l, br], i) =>
              `${i ? `<path d="M${120 + i * 210} 375 h40" stroke="#ffffff" stroke-width="6"/>` : ""}` + K.card(40 + i * 230, 280, 190, 190, `${tile(br, 91 + i * 230, 305, 88)}${txt(135 + i * 230, 440, l, 20, 800, "#0f172a", "middle")}`, { r: 22 })).join("")
            + K.pill(300, 560, "Klaviyo flows catch the rest", t, { big: true, dot: "#16a34a", w: 420 }),
        "budget": (t) => K.card(80, 120, 540, 460, `${txt(110, 170, "Spend and return by month", 22, 800)}
              ${[[40, 50], [60, 90], [70, 130], [80, 180]].map(([s, r], i) => `<rect x="${130 + i * 120}" y="${530 - s * 2}" width="40" height="${s * 2}" rx="6" fill="#c4b5fd"/><rect x="${176 + i * 120}" y="${530 - r * 2}" width="40" height="${r * 2}" rx="6" fill="#16a34a"/>${txt(160 + i * 120, 560, `M${i + 1}`, 16, 700, "#64748b", "middle")}`).join("")}`, { r: 26 })
            + K.card(650, 180, 280, 170, `<rect x="672" y="214" width="22" height="22" rx="4" fill="#c4b5fd"/>${txt(706, 232, "Ad spend", 19, 700)}<rect x="672" y="264" width="22" height="22" rx="4" fill="#16a34a"/>${txt(706, 282, "Revenue", 19, 700)}${txt(672, 326, "Example only", 15, 700, "#94a3b8")}`, { r: 20 }),
    },
};

(async () => {
    fs.mkdirSync(OUT, { recursive: true });
    const only = process.argv[2];
    for (const [slug, set] of Object.entries(S)) {
        if (only && slug !== only) continue;
        for (const [id, draw] of Object.entries(set)) {
            if (id === "t") continue;
            const file = path.join(OUT, `${slug}-guide-${id}.webp`);
            await sharp(Buffer.from(doc(set.t, draw(set.t))), { density: 144 }).resize({ width: 900 }).webp({ quality: 84 }).toFile(file);
            console.log(path.basename(file), Math.round(fs.statSync(file).size / 1024) + " KB");
        }
    }
})();
