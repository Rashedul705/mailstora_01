// 15-second sales video for MailStora (1080 x 1080, 30 fps).
// Step 1: node scripts/image-gen/video.js <framesDir>   -> renders PNG frames
// Step 2: record the frames to MP4 with scripts/image-gen/record.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const K = require("./kit");
require("./services"); // registers extra icons (bolt, palette, grid)

const W = 1080, H = 1080, FPS = 30, DURATION = 15;
const F = K.FONT;
const T = {
    bg1: "#fff4ea", bg2: "#fcdcc8", plant: "#9a7b5c", shadow: "#7c2d12", brand: "#f97316",
    hero1: "#f97316", hero2: "#fb7185", product: "#fef3c7", productAlt: ["#fdba74", "#93c5fd", "#86efac"],
    plants: [[60, 380, 1.3], [1030, 300, 1.2], [960, 900, 0.9]], bokeh: [[260, 120, 36], [780, 80, 26], [140, 820, 22]],
};

// ── timing helpers ──
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const prog = (t, a, b) => clamp((t - a) / (b - a));
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeBack = (x) => { const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
// Scene visibility: fade in over 0.3s from `a`, fade out over 0.3s before `b`
const vis = (t, a, b) => Math.min(prog(t, a, a + 0.3), 1 - prog(t, b - 0.3, b));
const txt = (x, y, s, size, weight = 800, fill = "#0f172a", anchor = "middle", extra = "") =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${F}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${s}</text>`;
const grp = (op, tx, ty, sc, inner, cx = W / 2, cy = H / 2) =>
    `<g opacity="${op.toFixed(3)}" transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) translate(${cx} ${cy}) scale(${sc.toFixed(3)}) translate(${-cx} ${-cy})">${inner}</g>`;
const emailCard = (x, y, w, h, copy, r = 26) => K.card(x, y, w, h, `<clipPath id="ec${x}${y}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath><g clip-path="url(#ec${x}${y})">${K.emailUI(x, y, w, h, T, { heroH: 165, copy, r })}</g>`, { r });
const COPY = { eyebrow: "SUMMER DROP", title: "Up to 40% Off", sub: "New arrivals, free shipping", cta: "Shop now" };
let LOGO = "";

/* ── Scene 1: the problem ── */
function scene1(t) {
    const v = vis(t, 0, 2.6);
    if (v <= 0) return "";
    const l1 = easeOut(prog(t, 0.1, 0.6));
    const card = easeOut(prog(t, 0.4, 1.0));
    const glitch = prog(t, 1.2, 1.5); // layout "breaks"
    const l2 = easeOut(prog(t, 1.3, 1.8));
    const x = easeBack(prog(t, 1.6, 2.0));
    const shake = glitch > 0 && glitch < 1 ? Math.sin(t * 90) * 8 : 0;
    let s = "";
    s += grp(l1, 0, (1 - l1) * 30, 1, txt(W / 2, 150, "Your emails look great…", 64));
    // email card, then broken pieces
    const broken = glitch > 0
        ? `<rect x="330" y="${520 + glitch * 30}" width="260" height="${80}" fill="#ffffff" transform="rotate(${glitch * 6} 460 560)"/>
           <rect x="${560 + glitch * 40}" y="620" width="200" height="140" fill="#fee2e2" opacity="${0.9 * glitch}" transform="rotate(${-glitch * 8} 660 690)"/>
           <rect x="330" y="${760 + glitch * 20}" width="420" height="40" fill="#ffffff" opacity="${glitch}"/>`
        : "";
    s += grp(card, shake, (1 - card) * 60, 0.94 + 0.06 * card, `<g transform="rotate(${glitch * 3} 540 600)">${emailCard(300, 250, 480, 680, COPY)}${broken}</g>`);
    s += grp(l2, 0, (1 - l2) * 30, 1, `<rect x="210" y="${H - 150}" width="660" height="92" rx="46" fill="#0f172a"/>${txt(W / 2, H - 90, "…until they hit Outlook.", 44, 800, "#ffffff")}`);
    s += grp(x, 0, 0, x, `<g transform="translate(760 250) scale(2.2)">${K.icon.cross("#ef4444")}</g>`, 813, 303);
    return grp(v, 0, 0, 1, s);
}

/* ── Scene 2: MailStora hand-codes it ── */
function scene2(t) {
    const v = vis(t, 2.6, 5.6);
    if (v <= 0) return "";
    const logo = easeBack(prog(t, 2.7, 3.1));
    const code = prog(t, 3.0, 4.4);
    const mail = easeOut(prog(t, 4.0, 4.8));
    const label = easeOut(prog(t, 4.6, 5.0));
    const lines = [
        [["com", "<!-- Hand-coded, Outlook-safe -->"]],
        [["tag", "<table "], ["attr", "role="], ["val", '"presentation"'], ["tag", ">"]],
        [["com", "  <!--[if mso]> VML <![endif]-->"]],
        [["tag", "  <a "], ["attr", "class="], ["val", '"btn"'], ["tag", ">"], ["txt", "Shop now"], ["tag", "</a>"]],
        [["tag", "</table>"]],
    ];
    // typewriter: reveal characters progressively
    const total = lines.reduce((n, l) => n + l.reduce((m, p) => m + p[1].length, 0), 0);
    let left = Math.floor(total * code);
    const shown = lines.map((l) => ({ parts: l.map(([k, s]) => { const take = Math.max(0, Math.min(s.length, left)); left -= take; return [k, s.slice(0, take)]; }).filter((p) => p[1]) }));
    let s = "";
    s += grp(logo, 0, 0, logo, `<image x="${W / 2 - 180}" y="70" width="360" height="77" href="data:image/png;base64,${LOGO}"/>`, W / 2, 108);
    s += grp(1, (1 - easeOut(prog(t, 2.8, 3.2))) * -300, 0, 1, K.codeCard(60, 230, 560, shown, { file: "your-email.html", fs: 21, lh: 36 }));
    s += grp(mail, (1 - mail) * 300, 0, 1, emailCard(560, 330, 460, 620, COPY));
    s += grp(label, 0, (1 - label) * 30, 1, `<rect x="90" y="${H - 170}" width="560" height="96" rx="48" fill="#ffffff" filter="url(#shadowSm)"/>${txt(370, H - 108, "Hand-coded HTML emails", 38)}`);
    return grp(v, 0, 0, 1, s);
}

/* ── Scene 3: works in every inbox, ready for every platform ── */
function scene3(t) {
    const v = vis(t, 5.6, 9.0);
    if (v <= 0) return "";
    const head = easeOut(prog(t, 5.7, 6.1));
    let s = grp(head, 0, (1 - head) * 30, 1, txt(W / 2, 190, "Perfect in every inbox", 68));
    const inbox = ["gmail", "outlook", "apple", "yahoo"];
    inbox.forEach((n, i) => {
        const p = easeBack(prog(t, 6.0 + i * 0.18, 6.4 + i * 0.18));
        const x = 150 + i * 205, y = 280;
        s += grp(p, 0, 0, p, K.brandTile(x, y, 170, n, { check: prog(t, 6.5 + i * 0.18, 6.7 + i * 0.18) > 0 }), x + 85, y + 85);
    });
    const sub = easeOut(prog(t, 7.2, 7.6));
    s += grp(sub, 0, (1 - sub) * 30, 1, txt(W / 2, 600, "Tested in 50+ email clients, including dark mode", 34, 700, "#475569"));
    const esp = ["klaviyo", "mailchimp", "hubspot", "shopify"];
    s += grp(easeOut(prog(t, 7.6, 7.9)), 0, 0, 1, txt(W / 2, 710, "Ready for your platform", 40, 800, T.brand));
    esp.forEach((n, i) => {
        const p = easeBack(prog(t, 7.8 + i * 0.15, 8.2 + i * 0.15));
        const x = 230 + i * 160, y = 760;
        s += grp(p, 0, 0, p, K.brandTile(x, y, 130, n, { small: true }), x + 65, y + 65);
    });
    return grp(v, 0, 0, 1, s);
}

/* ── Scene 4: real results ── */
function scene4(t) {
    const v = vis(t, 9.0, 12.2);
    if (v <= 0) return "";
    const head = easeOut(prog(t, 9.1, 9.5));
    let s = grp(head, 0, (1 - head) * 30, 1, txt(W / 2, 180, "Real client results", 68));
    const stats = [
        { to: 121, fmt: (n) => `+${n}%`, label: "onboarding completion", client: "TechFlow · Klaviyo flow" },
        { to: 38, fmt: (n) => `${n}%`, label: "open rate", client: "Canadian Choice · Mailchimp" },
        { to: 6.3, fmt: (n) => `$${n.toFixed(1)}k`, label: "campaign revenue", client: "Urban Vogue · Klaviyo" },
    ];
    stats.forEach((st, i) => {
        const p = easeOut(prog(t, 9.4 + i * 0.25, 9.9 + i * 0.25));
        const count = easeOut(prog(t, 9.5 + i * 0.25, 10.8 + i * 0.25));
        const val = st.to === 6.3 ? st.to * count : Math.round(st.to * count);
        const y = 260 + i * 200;
        s += grp(p, (1 - p) * -120, 0, 1, K.card(140, y, 800, 170, `
            ${txt(190, y + 108, st.fmt(val), 76, 900, "#16a34a", "start")}
            ${txt(480, y + 80, st.label, 34, 800, "#0f172a", "start")}
            ${txt(480, y + 122, st.client, 26, 600, "#64748b", "start")}`, { r: 32 }));
    });
    const rate = easeOut(prog(t, 10.9, 11.3));
    s += grp(rate, 0, (1 - rate) * 30, 1, `<rect x="110" y="${H - 150}" width="860" height="92" rx="46" fill="#0f172a"/>${txt(W / 2, H - 91, "★ Top Rated on Upwork · 4.8 from 152 reviews", 32, 700, "#ffffff")}`);
    return grp(v, 0, 0, 1, s);
}

/* ── Scene 5: offer and call to action ── */
function scene5(t) {
    const v = prog(t, 12.2, 12.5);
    if (v <= 0) return "";
    const logo = easeBack(prog(t, 12.3, 12.7));
    const l1 = easeOut(prog(t, 12.6, 13.0));
    const l2 = easeOut(prog(t, 12.9, 13.3));
    const btn = easeBack(prog(t, 13.3, 13.7));
    const pulse = 1 + (t > 13.7 ? 0.04 * Math.sin((t - 13.7) * 8) : 0);
    let s = "";
    s += grp(logo, 0, 0, logo, `<image x="${W / 2 - 230}" y="170" width="460" height="98" href="data:image/png;base64,${LOGO}"/>`, W / 2, 219);
    s += grp(l1, 0, (1 - l1) * 30, 1, txt(W / 2, 400, "Custom HTML emails", 72) + txt(W / 2, 490, `from <tspan fill="${T.brand}">$40</tspan>`, 72));
    s += grp(l2, 0, (1 - l2) * 30, 1, `<rect x="250" y="545" width="580" height="72" rx="36" fill="#ffffff" filter="url(#shadowSm)"/>${txt(W / 2, 594, "Delivered in 24–48 hours", 34, 700, "#16a34a")}`);
    s += grp(btn, 0, 0, btn * pulse, `<g filter="url(#shadow)"><rect x="240" y="690" width="600" height="120" rx="60" fill="url(#accent)"/></g>${txt(W / 2, 766, "Get a free quote →", 48, 900, "#ffffff")}`, W / 2, 750);
    s += grp(easeOut(prog(t, 13.8, 14.2)), 0, 0, 1, txt(W / 2, 900, "mailstora.com", 44, 800, "#0f172a"));
    return grp(v, 0, 0, 1, s);
}

(async () => {
    const out = process.argv[2];
    fs.mkdirSync(out, { recursive: true });
    const logoFile = path.join(__dirname, "..", "..", "public", "images", "brand", "mailstora-logo-2026.webp");
    LOGO = (await sharp(logoFile).resize({ width: 920 }).png().toBuffer()).toString("base64");
    const frames = FPS * DURATION;
    for (let i = 0; i < frames; i++) {
        const t = i / FPS;
        const svg = K.svgDoc(W, H, T, scene1(t) + scene2(t) + scene3(t) + scene4(t) + scene5(t));
        await sharp(Buffer.from(svg)).png({ compressionLevel: 3 }).toFile(path.join(out, `f${String(i).padStart(4, "0")}.png`));
        if (i % 90 === 0) console.log(`frame ${i}/${frames}`);
    }
    console.log("done");
})();
