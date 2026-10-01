// Image definitions for the growth services: SEO, AEO and GEO, and Performance Marketing.
// Same four sections as other service pages (hero, intro, phone, offer).
const K = require("./kit");
const S = require("./sections");
const V = require("./scenes");
const { txt, bar } = V;

const theme = (bg1, bg2, plant, brand, hero1, hero2, extra = {}) => ({
    bg1, bg2, plant, shadow: "#1e293b", brand, hero1, hero2, product: "#fef3c7",
    productAlt: ["#fdba74", "#93c5fd", "#86efac"],
    plants: [[70, 330, 1.2], [960, 260, 1.1], [900, 820, 0.8]], bokeh: [[260, 110, 32], [700, 70, 24], [120, 760, 20]],
    ...extra,
});
const T = {
    search: theme("#e8f1fd", "#cfe0f7", "#3c648c", "#1a73e8", "#1a73e8", "#34a853", { shadow: "#1e3a8a" }),
    ads: theme("#f1edff", "#ddd5fb", "#6d5b9a", "#7c3aed", "#8b5cf6", "#ec4899", { shadow: "#4c1d95" }),
};
const bigPill = (x, y, text, t, dot) => K.pill(x, y, text, t, { big: true, dot, w: text.length * 15.5 + 76 });
const mark = (name, x, y, size) => `<g transform="translate(${x} ${y}) scale(${size / 48})">${K.brandMark(name)}</g>`;

/* ── Search scenes ── */

// Google-style results page: search box, AI answer box citing the site, then organic results
function serp(x, y, w, h, t, q = "html email agency") {
    const res = (yy, title, url, hl) => `
      ${hl ? `<rect x="${x + 18}" y="${yy - 8}" width="${w - 36}" height="78" rx="10" fill="#ecfdf5" stroke="#16a34a" stroke-width="2"/>` : ""}
      ${txt(x + 30, yy + 12, url, 12, 600, "#16a34a")}
      ${txt(x + 30, yy + 36, title, 17, 700, "#1a0dab")}
      ${bar(x + 30, yy + 48, w * 0.62, 7, "#cbd5e1")}${bar(x + 30, yy + 60, w * 0.45, 7, "#e2e8f0")}`;
    return V.clip(x, y, w, h, 6, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff"/>
      ${mark("google", x + 16, y + 14, 30)}
      <rect x="${x + 58}" y="${y + 14}" width="${w - 80}" height="32" rx="16" fill="#f1f5f9" stroke="#e2e8f0"/>${txt(x + 76, y + 36, q, 14, 600, "#334155")}
      <rect x="${x + 18}" y="${y + 60}" width="${w - 36}" height="92" rx="12" fill="#eef2ff"/>
      ${txt(x + 32, y + 84, "AI Overview", 14, 800, "#4f46e5")}
      ${bar(x + 32, y + 96, w * 0.7, 8, "#c7d2fe")}${bar(x + 32, y + 110, w * 0.58, 8, "#c7d2fe")}
      <rect x="${x + 32}" y="${y + 124}" width="118" height="20" rx="10" fill="#ffffff"/>${txt(x + 42, y + 139, "Source: you", 12, 700, "#4f46e5")}
      ${res(y + 176, "Your brand · Page one", "yourbrand.com", true)}
      ${res(y + 264, "Competitor result", "other.com", false)}`);
}

// Chat-style AI answer: question bubble, answer citing the brand
function aiChat(x, y, w, h, t, brand = "openai") {
    return V.clip(x, y, w, h, 6, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h * 0.13}" fill="#f8fafc"/>${mark(brand, x + w * 0.06, y + h * 0.03, h * 0.07)}
      <rect x="${x + w * 0.3}" y="${y + h * 0.18}" width="${w * 0.64}" height="${h * 0.1}" rx="${h * 0.04}" fill="#1a73e8"/>
      ${bar(x + w * 0.36, y + h * 0.215, w * 0.5, h * 0.018, "#bfdbfe")}${bar(x + w * 0.36, y + h * 0.245, w * 0.34, h * 0.018, "#bfdbfe")}
      <rect x="${x + w * 0.06}" y="${y + h * 0.33}" width="${w * 0.8}" height="${h * 0.4}" rx="${h * 0.04}" fill="#f1f5f9"/>
      ${[0, 1, 2, 3].map((i) => bar(x + w * 0.11, y + h * (0.38 + i * 0.05), w * (0.66 - i * 0.08), h * 0.018, "#cbd5e1")).join("")}
      <rect x="${x + w * 0.11}" y="${y + h * 0.6}" width="${w * 0.5}" height="${h * 0.08}" rx="${h * 0.04}" fill="#dcfce7"/>
      ${K.place(K.icon.check("#16a34a"), x + w * 0.13, y + h * 0.612, h * 0.055)}${bar(x + w * 0.24, y + h * 0.632, w * 0.3, h * 0.018, "#16a34a")}`);
}

/* ── Ads scenes ── */

// Ads dashboard: KPI tiles, bar chart and channel rows
function adsDash(x, y, w, h, t) {
    const kpis = [["ROAS", "4.2x", "#16a34a"], ["CPA", "$18", "#7c3aed"], ["Conv.", "+36%", "#ec4899"]];
    const bars = [40, 55, 48, 70, 62, 84, 96];
    const bw = (w - 80) / bars.length;
    return V.clip(x, y, w, h, 6, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff"/>
      ${txt(x + 20, y + 32, "Campaign performance", 16, 800)}
      ${kpis.map(([l, v, c], i) => `<rect x="${x + 20 + i * ((w - 50) / 3 + 5)}" y="${y + 46}" width="${(w - 50) / 3}" height="62" rx="10" fill="#f8fafc"/>
        ${txt(x + 34 + i * ((w - 50) / 3 + 5), y + 70, l, 12, 700, "#64748b")}${txt(x + 34 + i * ((w - 50) / 3 + 5), y + 96, v, 22, 900, c)}`).join("")}
      ${bars.map((v, i) => `<rect x="${x + 30 + i * bw}" y="${y + h - 30 - v * 1.4}" width="${bw - 12}" height="${v * 1.4}" rx="5" fill="${i === bars.length - 1 ? t.brand : "#c4b5fd"}"/>`).join("")}
      <rect x="${x + 20}" y="${y + h - 28}" width="${w - 40}" height="2" fill="#e2e8f0"/>`);
}

// Phone with a sponsored social ad
function adPost(x, y, w, h, t) {
    return V.clip(x, y, w, h, 6, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff"/>
      <circle cx="${x + w * 0.12}" cy="${y + h * 0.08}" r="${w * 0.06}" fill="${t.hero2}"/>
      ${bar(x + w * 0.22, y + h * 0.065, w * 0.3, h * 0.016, "#334155")}${txt(x + w * 0.22, y + h * 0.115, "Sponsored", w * 0.055, 600, "#64748b")}
      <rect x="${x}" y="${y + h * 0.15}" width="${w}" height="${h * 0.5}" fill="url(#heroGrad)"/>
      <rect x="${x + w * 0.2}" y="${y + h * 0.25}" width="${w * 0.6}" height="${h * 0.3}" rx="${w * 0.05}" fill="${t.product}"/>
      <rect x="${x + w * 0.06}" y="${y + h * 0.69}" width="${w * 0.88}" height="${h * 0.09}" rx="${h * 0.02}" fill="${t.brand}"/>
      ${txt(x + w / 2, y + h * 0.75, "Shop now", w * 0.07, 800, "#ffffff", "middle")}
      ${bar(x + w * 0.06, y + h * 0.83, w * 0.7, h * 0.016, "#cbd5e1")}${bar(x + w * 0.06, y + h * 0.87, w * 0.5, h * 0.016, "#e2e8f0")}`);
}

module.exports = {
    "seo-aeo-geo-services": {
        theme: T.search,
        hero: (t) => V.hero(t, {
            context: (t) => K.card(70, 110, 450, 250, `${txt(96, 150, "Visibility in search and AI", 19, 800)}
              ${[["Technical SEO", "code", "#1a73e8"], ["Answer engines (AEO)", "check", "#16a34a"], ["AI search (GEO)", "link", "#7c3aed"]].map(([l, ic, c], i) => `${K.place(K.icon[ic](c), 96, 170 + i * 56, 34)}${txt(146, 196 + i * 56, l, 18, 700, "#334155")}`).join("")}`),
            laptop: (x, y, w, h) => serp(x, y, w, h, t),
            phone: (x, y, w, h) => aiChat(x, y, w, h, t, "openai"),
            rowTitle: "Found in search and AI answers", row: ["google", "openai", "perplexity", "googlesearchconsole"], rowCheck: false,
            pills: ["Rank on Google", "Cited by AI"],
        }),
        intro: (t) => V.concept(t, (t) => K.laptop(60, 250, 560, t, (x, y, w, h) => serp(x, y, w, h, t))
            + K.phone(640, 170, 300, t, (x, y, w, h) => aiChat(x, y, w, h, t, "perplexity"))
            + bigPill(60, 150, "SEO + AEO + GEO", t, "#1a73e8")),
        phone: (t) => S.floatPhone(t, null, { draw: (x, y, w, h) => aiChat(x, y, w, h, t, "openai") }),
        offer: (t) => S.offerCard(t, null, [{ icon: "code", color: "#1a73e8", text: "Technical SEO" }, { icon: "check", color: "#16a34a", text: "AI answer ready" }, { icon: "chart", color: "#7c3aed", text: "Monthly report" }], (x, y, w, h) => serp(x, y, w, h * 0.55, t)),
    },
    "performance-marketing": {
        theme: T.ads,
        hero: (t) => V.hero(t, {
            context: (t) => K.card(70, 110, 450, 250, `${txt(96, 150, "Paid growth, measured", 19, 800)}
              ${[["Meta and TikTok ads", "heart", "#ec4899"], ["Google and ChatGPT ads", "link", "#1a73e8"], ["Tracking and reporting", "chart", "#16a34a"]].map(([l, ic, c], i) => `${K.place(K.icon[ic](c), 96, 170 + i * 56, 34)}${txt(146, 196 + i * 56, l, 18, 700, "#334155")}`).join("")}`),
            laptop: (x, y, w, h) => adsDash(x, y, w, h, t),
            phone: (x, y, w, h) => adPost(x, y, w, h, t),
            rowTitle: "Ads on every major platform", row: ["meta", "tiktok", "googleads", "openai"], rowCheck: false,
            pills: ["Lower cost per sale", "Clear reporting"],
        }),
        intro: (t) => V.concept(t, (t) => K.laptop(60, 250, 560, t, (x, y, w, h) => adsDash(x, y, w, h, t))
            + K.phone(640, 170, 300, t, (x, y, w, h) => adPost(x, y, w, h, t))
            + bigPill(60, 150, "Ads that pay back", t, "#7c3aed")),
        phone: (t) => S.floatPhone(t, null, { draw: (x, y, w, h) => adPost(x, y, w, h, t) }),
        offer: (t) => S.offerCard(t, null, [{ icon: "heart", color: "#ec4899", text: "Creative testing" }, { icon: "link", color: "#1a73e8", text: "Pixel and tracking" }, { icon: "chart", color: "#16a34a", text: "ROAS reporting" }], (x, y, w, h) => adsDash(x, y, w, h * 0.55, t)),
    },
};

// Scene helpers reused by guide-images.js
module.exports.__serp = serp;
module.exports.__aiChat = aiChat;
module.exports.__adsDash = adsDash;
module.exports.__adPost = adPost;
