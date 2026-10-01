// Generates sample MailStora illustrations as SVG, then WebP.
// Usage (from the Client folder): node scripts/image-gen/generate.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const K = require("./kit");

const OUT = path.join(__dirname, "..", "..", "public", "images", "media", "generated");
fs.mkdirSync(OUT, { recursive: true });

const THEMES = {
    // Outlook fixes & testing: cool blue with teal plants
    blue: { bg1: "#e0ecff", bg2: "#cfe3f7", plant: "#3b7a8f", shadow: "#1e3a8a", brand: "#2563eb", hero1: "#1d4ed8", hero2: "#38bdf8", product: "#fde68a", productAlt: ["#fca5a5", "#93c5fd", "#86efac"], plants: [[90, 260, 1.3], [930, 330, 1.1], [860, 720, 0.8]], bokeh: [[180, 120, 40], [760, 90, 28], [640, 180, 18], [120, 640, 22]] },
    // Signatures: warm peach, like the current HubSpot image
    peach: { bg1: "#ffe9dc", bg2: "#f9d4bf", plant: "#b9855f", shadow: "#7c2d12", brand: "#f97316", hero1: "#fb923c", hero2: "#f472b6", product: "#fef3c7", productAlt: ["#fdba74", "#fca5a5", "#fcd34d"], plants: [[80, 300, 1.2], [950, 250, 1.2]], bokeh: [[220, 140, 36], [720, 110, 30], [520, 90, 16], [880, 620, 20]] },
    // Brand share card: cream with orange and green accents
    brand: { bg1: "#fff7ed", bg2: "#fde7d3", plant: "#86a37a", shadow: "#7c2d12", brand: "#16a34a", hero1: "#f97316", hero2: "#fb923c", product: "#fef3c7", productAlt: ["#86efac", "#fdba74", "#93c5fd"], plants: [[1130, 250, 1.3], [60, 560, 0.9]], bokeh: [[980, 90, 34], [700, 60, 20], [1150, 520, 24]] },
};

/* ── Service hero: HTML Email Template Development (1000 x 1000) ──
   Page intent: custom HTML emails, hand-coded, tested in every inbox, ready for any email platform.
   Story left to right: HTML code  ->  the finished email on laptop and phone  ->  inbox apps with checks.
   ESP tiles (Klaviyo, Mailchimp, HubSpot, Shopify) show the template is ready for your platform. */
function htmlTemplatesHero() {
    const t = {
        bg1: "#fff1e6", bg2: "#fbd9c4", plant: "#9a7b5c", shadow: "#7c2d12", brand: "#f97316",
        hero1: "#f97316", hero2: "#fb7185", product: "#fef3c7", productAlt: ["#fdba74", "#93c5fd", "#86efac"],
        plants: [[70, 330, 1.25], [960, 250, 1.1], [900, 820, 0.8]], bokeh: [[260, 110, 34], [700, 70, 26], [560, 150, 14], [120, 760, 20]],
    };
    const W = 1000, H = 1000;
    let b = "";
    const C = (k, v) => [k, v];
    const code = [
        { parts: [C("com", "<!-- Hand-coded, Outlook-safe -->")] },
        { parts: [C("tag", "<table "), C("attr", "role="), C("val", '"presentation"'), C("tag", ">")] },
        { indent: 1, parts: [C("tag", "<tr><td "), C("attr", "align="), C("val", '"center"'), C("tag", ">")] },
        { indent: 2, parts: [C("com", "<!--[if mso]> VML <![endif]-->")] },
        { indent: 2, parts: [C("tag", "<img "), C("attr", "width="), C("val", '"600"'), C("attr", " alt="), C("val", '"Sale"'), C("tag", ">")] },
        { indent: 2, parts: [C("tag", "<a "), C("attr", "class="), C("val", '"btn"'), C("tag", ">"), C("txt", "Shop now"), C("tag", "</a>")] },
        { indent: 1, parts: [C("tag", "</td></tr>")] },
        { parts: [C("tag", "</table>")] },
    ];

    // connectors (behind everything)
    b += K.connector("M190 560 C 250 560, 250 640, 330 650", t, [[245, 600]]);
    b += K.connector("M560 250 C 640 250, 650 190, 700 170", t);

    // code editor (top left) with HTML5 badge
    b += K.codeCard(70, 110, 450, code, { file: "newsletter.html", fs: 16, lh: 26 });
    b += K.brandTile(470, 70, 86, "html5", { small: true });

    // laptop + phone with the finished email
    const copy = { eyebrow: "SUMMER DROP", title: "Up to 40% Off", sub: "New arrivals, free shipping", cta: "Shop now" };
    b += K.laptop(300, 400, 520, t, (x, y, w, h) => K.emailUI(x, y, w, h, t, { heroH: 150, copy }));
    b += K.phone(745, 540, 170, t, (x, y, w, h) => K.emailUI(x, y, w, h, t, { heroH: 140, r: 20, copy }));

    // inbox apps (top right), each checked
    b += K.card(600, 110, 340, 150, `<text x="624" y="146" font-family="${K.FONT}" font-size="16" font-weight="800" fill="#0f172a">Looks right in every inbox</text>`, { small: true });
    [["gmail", "Gmail"], ["outlook", "Outlook"], ["apple", "Apple"], ["yahoo", "Yahoo"]].forEach(([n], i) => {
        b += K.brandTile(624 + i * 78, 164, 62, n, { small: true, check: true });
    });

    // email platforms (left column)
    b += K.card(70, 470, 150, 380, `<text x="145" y="506" text-anchor="middle" font-family="${K.FONT}" font-size="15" font-weight="800" fill="#0f172a">Ready for</text>`, { small: true });
    ["klaviyo", "mailchimp", "hubspot", "shopify"].forEach((n, i) => {
        b += K.brandTile(110, 526 + i * 78, 70, n, { small: true });
    });

    // bottom pills
    b += K.pill(330, 880, "Hand-coded HTML", t, { dot: "#f97316", w: 190 });
    b += K.pill(535, 880, "Tested in 50+ inboxes", t, { dot: "#16a34a", w: 230 });
    return K.svgDoc(W, H, t, b);
}

/* ── 1. Outlook email rendering fix (1000 x 1000) ── */
function outlookScene() {
    const t = THEMES.blue;
    const W = 1000, H = 1000;
    let b = "";
    // connectors behind the cards
    b += K.connector("M170 330 C 240 330, 250 420, 300 440", t, [[245, 385]]);
    b += K.connector("M830 250 C 780 250, 760 330, 700 350", t);
    // laptop with a light email
    b += K.laptop(250, 330, 560, t, (x, y, w, h) => K.emailUI(x, y, w, h, t, { heroH: 140 }));
    // phone with the dark mode version
    b += K.phone(700, 470, 190, t, (x, y, w, h) => K.emailUI(x, y, w, h, t, { dark: true, heroH: 120, r: 22 }));
    // client checklist card (left)
    const rows = [["Outlook", "#2563eb"], ["Gmail", "#ea4335"], ["Apple Mail", "#0f172a"], ["Yahoo", "#7c3aed"]];
    b += K.card(60, 120, 230, 250, `
      <text x="84" y="162" font-family="${K.FONT}" font-size="17" font-weight="800" fill="#0f172a">Tested in</text>
      ${rows.map(([n, c], i) => `
        <circle cx="96" cy="${198 + i * 44}" r="13" fill="${c}" opacity="0.14"/>
        ${K.place(K.icon.envelope(c), 86, 188 + i * 44, 20)}
        <text x="118" y="${204 + i * 44}" font-family="${K.FONT}" font-size="16" font-weight="600" fill="#334155">${n}</text>
        ${K.place(K.icon.check("#16a34a"), 244, 186 + i * 44, 24)}`).join("")}`);
    // before / after card (top right)
    b += K.card(640, 90, 290, 170, `
      <rect x="664" y="116" width="100" height="118" rx="10" fill="#fef2f2"/>
      <rect x="676" y="130" width="60" height="10" rx="4" fill="#fca5a5"/>
      <rect x="690" y="150" width="62" height="26" rx="5" fill="#fecaca" transform="rotate(8 721 163)"/>
      <rect x="672" y="190" width="40" height="8" rx="4" fill="#fca5a5"/>
      <rect x="700" y="206" width="54" height="8" rx="4" fill="#fca5a5" transform="rotate(-6 727 210)"/>
      ${K.place(K.icon.cross("#ef4444"), 742, 104, 30)}
      <path d="M778 175h34m-12-12 12 12-12 12" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="826" y="116" width="84" height="118" rx="10" fill="#f0fdf4"/>
      <rect x="838" y="130" width="60" height="10" rx="4" fill="#86efac"/>
      <rect x="838" y="150" width="60" height="30" rx="6" fill="#bbf7d0"/>
      <rect x="838" y="190" width="48" height="8" rx="4" fill="#86efac"/>
      <rect x="838" y="206" width="60" height="8" rx="4" fill="#86efac"/>
      ${K.place(K.icon.check("#16a34a"), 892, 104, 30)}`);
    // dark mode toggle card
    b += K.card(70, 640, 200, 96, `
      <rect x="92" y="668" width="84" height="40" rx="20" fill="#0f172a"/>
      <circle cx="154" cy="688" r="15" fill="#fbbf24"/>
      ${K.place(K.icon.moon("#fbbf24"), 104, 676, 24)}
      <text x="190" y="684" font-family="${K.FONT}" font-size="15" font-weight="800" fill="#0f172a">Dark</text>
      <text x="190" y="704" font-family="${K.FONT}" font-size="15" font-weight="800" fill="#0f172a">mode</text>`);
    // VML / code badge
    b += K.card(470, 190, 140, 110, `
      <circle cx="540" cy="232" r="26" fill="#dbeafe"/>
      ${K.place(K.icon.code("#2563eb"), 520, 212, 40)}
      <text x="540" y="284" text-anchor="middle" font-family="${K.FONT}" font-size="14" font-weight="800" fill="#0f172a">VML + MSO</text>`);
    // result pill
    b += K.pill(300, 875, "Fixed in every Outlook version", t, { dot: "#16a34a", w: 290 });
    return K.svgDoc(W, H, t, b);
}

/* ── 2. HTML email signature (1000 x 1000) ── */
function signatureScene() {
    const t = THEMES.peach;
    const W = 1000, H = 1000;
    let b = "";
    b += K.connector("M200 250 C 260 250, 280 330, 330 350", t, [[270, 300]]);
    b += K.connector("M830 700 C 780 720, 760 790, 690 800", t);
    // mail window
    b += K.card(150, 330, 700, 520, `
      <rect x="150" y="330" width="700" height="58" rx="22" fill="#f8fafc"/>
      <rect x="150" y="360" width="700" height="28" fill="#f8fafc"/>
      <circle cx="184" cy="359" r="7" fill="#fca5a5"/><circle cx="206" cy="359" r="7" fill="#fcd34d"/><circle cx="228" cy="359" r="7" fill="#86efac"/>
      <rect x="270" y="351" width="220" height="16" rx="8" fill="#e2e8f0"/>
      <rect x="190" y="414" width="80" height="10" rx="5" fill="#cbd5e1"/><rect x="284" y="414" width="180" height="10" rx="5" fill="#e2e8f0"/>
      <rect x="190" y="444" width="420" height="9" rx="4" fill="#e2e8f0"/><rect x="190" y="464" width="380" height="9" rx="4" fill="#e2e8f0"/><rect x="190" y="484" width="300" height="9" rx="4" fill="#e2e8f0"/>
      <rect x="190" y="514" width="120" height="9" rx="4" fill="#cbd5e1"/>`);
    // the signature itself
    b += K.card(190, 548, 620, 262, `
      <circle cx="270" cy="628" r="52" fill="url(#hero)"/>
      ${K.place(K.icon.user("#ffffff"), 238, 594, 64)}
      <rect x="342" y="590" width="4" height="96" rx="2" fill="#f97316"/>
      <text x="364" y="610" font-family="${K.FONT}" font-size="26" font-weight="800" fill="#0f172a">Alex Morgan</text>
      <text x="364" y="636" font-family="${K.FONT}" font-size="16" font-weight="600" fill="#f97316">Marketing Director</text>
      <text x="364" y="664" font-family="${K.FONT}" font-size="14" fill="#475569">+1 (555) 014-2290  ·  brightwave.co</text>
      ${[0, 1, 2, 3].map((i) => `<circle cx="${378 + i * 34}" cy="690" r="12" fill="${["#0a66c2", "#1877f2", "#0f172a", "#e1306c"][i]}"/>`).join("")}
      <rect x="214" y="722" width="572" height="66" rx="14" fill="url(#hero)"/>
      <text x="240" y="752" font-family="${K.FONT}" font-size="17" font-weight="800" fill="#ffffff">Spring launch: 20% off this week</text>
      <rect x="240" y="764" width="150" height="8" rx="4" fill="#ffffff" opacity="0.7"/>
      <rect x="668" y="738" width="96" height="34" rx="17" fill="#ffffff"/>
      <text x="716" y="760" text-anchor="middle" font-family="${K.FONT}" font-size="14" font-weight="800" fill="#f97316">Shop now</text>`);
    // floating cards
    b += K.card(80, 150, 150, 150, `<circle cx="155" cy="210" r="40" fill="#ffedd5"/>${K.place(K.icon.link("#f97316"), 131, 186, 48)}<text x="155" y="280" text-anchor="middle" font-family="${K.FONT}" font-size="14" font-weight="800" fill="#0f172a">Clickable</text>`);
    b += K.card(760, 130, 170, 160, `
      <text x="845" y="168" text-anchor="middle" font-family="${K.FONT}" font-size="15" font-weight="800" fill="#0f172a">Works in</text>
      ${[["Gmail", "#ea4335"], ["Outlook", "#2563eb"], ["Apple Mail", "#0f172a"]].map(([n, c], i) => `${K.place(K.icon.check("#16a34a"), 780, 184 + i * 32, 22)}<text x="812" y="${201 + i * 32}" font-family="${K.FONT}" font-size="15" font-weight="600" fill="#334155">${n}</text>`).join("")}`);
    b += K.card(380, 170, 230, 110, `
      <circle cx="430" cy="225" r="28" fill="#dcfce7"/>${K.place(K.icon.phone("#16a34a"), 412, 207, 36)}
      <text x="474" y="218" font-family="${K.FONT}" font-size="16" font-weight="800" fill="#0f172a">Mobile ready</text>
      <text x="474" y="242" font-family="${K.FONT}" font-size="14" fill="#64748b">Sharp on retina</text>`);
    b += K.place(K.icon.plane("#fb923c"), 840, 610, 64);
    return K.svgDoc(W, H, t, b);
}

/* ── 3. Social share / blog cover (1200 x 630) ── */
function shareScene() {
    const t = THEMES.brand;
    const W = 1200, H = 630;
    let b = "";
    // brand mark + headline on the left
    // Real brand logo, embedded as PNG
    b += `<image x="66" y="66" width="262" height="56" href="data:image/png;base64,${LOGO}"/>`;
    b += `
<text x="70" y="228" font-family="${K.FONT}" font-size="54" font-weight="900" fill="#0f172a">HTML Email</text>
      <text x="70" y="292" font-family="${K.FONT}" font-size="54" font-weight="900" fill="#0f172a">Development</text>
      <text x="70" y="356" font-family="${K.FONT}" font-size="54" font-weight="900" fill="#f97316">Agency</text>
      <text x="72" y="408" font-family="${K.FONT}" font-size="22" font-weight="600" fill="#475569">Hand-coded · Outlook-tested · Klaviyo ready</text>`;
    b += K.pill(70, 460, "Tested in 50+ email clients", t, { dot: "#16a34a", w: 280 });
    b += K.pill(70, 516, "Delivered in 24–48h", t, { dot: "#f97316", w: 220 });
    // devices on the right
    b += K.laptop(600, 150, 470, t, (x, y, w, h) => K.emailUI(x, y, w, h, t, { heroH: 150 }));
    b += K.phone(990, 280, 150, t, (x, y, w, h) => K.emailUI(x, y, w, h, t, { heroH: 120, r: 18 }));
    b += K.card(560, 90, 190, 84, `${K.place(K.icon.chart("#16a34a"), 578, 108, 44)}<text x="632" y="128" font-family="${K.FONT}" font-size="22" font-weight="900" fill="#16a34a">+121%</text><text x="632" y="150" font-family="${K.FONT}" font-size="13" font-weight="600" fill="#64748b">flow completion</text>`, { small: true });
    b += K.card(1010, 90, 150, 84, `${K.place(K.icon.shield("#2563eb"), 1024, 108, 44)}<text x="1076" y="128" font-family="${K.FONT}" font-size="16" font-weight="900" fill="#0f172a">Outlook</text><text x="1076" y="150" font-family="${K.FONT}" font-size="13" font-weight="600" fill="#64748b">safe code</text>`, { small: true });
    return K.svgDoc(W, H, t, b);
}

let LOGO = "";

(async () => {
    const logoFile = path.join(__dirname, "..", "..", "public", "images", "brand", "mailstora-logo-2026.webp");
    LOGO = (await sharp(logoFile).resize({ width: 524 }).png().toBuffer()).toString("base64");
    const only = process.argv[2];
    const scenes = [
        ["service-html-email-templates-hero", htmlTemplatesHero(), 1000],
        ["mailstora-outlook-fix-illustration", outlookScene(), 1000],
        ["mailstora-email-signature-illustration", signatureScene(), 1000],
        ["mailstora-share-card", shareScene(), 1200],
    ];
    for (const [name, svg, w] of scenes.filter(([n]) => !only || n.includes(only))) {
        fs.writeFileSync(path.join(OUT, `${name}.svg`), svg);
        const file = path.join(OUT, `${name}.webp`);
        await sharp(Buffer.from(svg), { density: 144 }).resize({ width: w }).webp({ quality: 88 }).toFile(file);
        console.log(name, Math.round(fs.statSync(file).size / 1024) + " KB");
    }
})();
