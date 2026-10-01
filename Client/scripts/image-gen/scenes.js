// Reusable UI pieces and scene layouts for service page images.
const K = require("./kit");
const F = K.FONT;
let n = 0;
const uid = (p) => `${p}${++n}`;
const txt = (x, y, s, size, weight = 700, fill = "#0f172a", anchor = "start") => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${F}" font-size="${size}" font-weight="${weight}" fill="${fill}">${s}</text>`;
const clip = (x, y, w, h, r, inner) => { const id = uid("c"); return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };
const bar = (x, y, w, h = 10, fill = "#e2e8f0") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>`;

/* ───────────── UI pieces ───────────── */

/** HTML email signature block (design width 560). */
function signature(x, y, w, t, p) {
    const s = w / 560;
    const X = (v) => x + v * s, Y = (v) => y + v * s;
    return `<rect x="${x}" y="${y}" width="${w}" height="${230 * s}" rx="${16 * s}" fill="#ffffff"/>
      <circle cx="${X(76)}" cy="${Y(76)}" r="${48 * s}" fill="url(#hero)"/>
      <g transform="translate(${X(48)} ${Y(46)}) scale(${56 * s / 48})">${K.icon.user("#ffffff")}</g>
      <rect x="${X(146)}" y="${Y(30)}" width="${4 * s}" height="${96 * s}" rx="${2 * s}" fill="${t.brand}"/>
      ${txt(X(166), Y(56), p.name, 25 * s, 800)}
      ${txt(X(166), Y(82), p.role, 16 * s, 700, t.brand)}
      ${txt(X(166), Y(108), p.contact, 14 * s, 500, "#475569")}
      ${["#0a66c2", "#1877f2", "#0f172a", "#e1306c"].map((c, i) => `<circle cx="${X(178 + i * 32)}" cy="${Y(134)}" r="${11 * s}" fill="${c}"/>`).join("")}
      <rect x="${X(20)}" y="${Y(160)}" width="${520 * s}" height="${54 * s}" rx="${12 * s}" fill="url(#hero)"/>
      ${txt(X(40), Y(193), p.banner, 16 * s, 800, "#ffffff")}
      <rect x="${X(424)}" y="${Y(172)}" width="${96 * s}" height="${30 * s}" rx="${15 * s}" fill="#ffffff"/>
      ${txt(X(472), Y(192), p.cta, 13 * s, 800, t.brand, "middle")}`;
}

/** Mail client window: chrome, a short message, then the signature. */
function mailWithSignature(x, y, w, h, t, p, opt = {}) {
    const top = opt.outlook ? `<rect x="${x}" y="${y}" width="${w}" height="${44}" fill="#0f6cbd"/><g transform="translate(${x + 12} ${y + 8}) scale(${28 / 48})">${K.brandMark("outlook")}</g>${txt(x + 50, y + 28, "Outlook", 15, 700, "#ffffff")}`
        : `<rect x="${x}" y="${y}" width="${w}" height="44" fill="#f1f5f9"/><g transform="translate(${x + 12} ${y + 8}) scale(${28 / 48})">${K.brandMark("gmail")}</g>${txt(x + 50, y + 28, "Gmail", 15, 700, "#334155")}`;
    const body = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff"/>${top}
      ${bar(x + 24, y + 70, w * 0.35, 10, "#cbd5e1")}
      ${bar(x + 24, y + 98, w * 0.8)}${bar(x + 24, y + 118, w * 0.72)}${bar(x + 24, y + 138, w * 0.5)}
      ${signature(x + 20, y + 170, w - 40, t, p)}
      ${h > w * 1.3 ? `<rect x="${x + 20}" y="${y + 190 + (w - 40) * 0.42}" width="${w - 40}" height="2" fill="#e2e8f0"/>
        ${txt(x + 24, y + 226 + (w - 40) * 0.42, "On Monday, Jamie wrote:", 15, 700, "#64748b")}
        ${[0.85, 0.7, 0.78, 0.5].map((f, i) => bar(x + 24, y + 246 + (w - 40) * 0.42 + i * 22, (w - 48) * f)).join("")}
        <rect x="${x + 20}" y="${y + h - 84}" width="${(w - 52) / 2}" height="48" rx="24" fill="#f1f5f9"/>${txt(x + 20 + (w - 52) / 4, y + h - 53, "Reply", 16, 700, "#334155", "middle")}
        <rect x="${x + 32 + (w - 52) / 2}" y="${y + h - 84}" width="${(w - 52) / 2}" height="48" rx="24" fill="#f1f5f9"/>${txt(x + 32 + (w - 52) * 0.75, y + h - 53, "Forward", 16, 700, "#334155", "middle")}` : ""}`;
    return clip(x, y, w, h, opt.r ?? 6, body);
}

/** Figma-like canvas: layers panel + email frame wireframe. */
function figmaCanvas(x, y, w, h, t) {
    const fx = x + w * 0.3, fw = w * 0.62;
    return clip(x, y, w, h, 18, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e5e7eb"/>
      <rect x="${x}" y="${y}" width="${w}" height="40" fill="#2c2c2c"/>
      <g transform="translate(${x + 12} ${y + 8}) scale(${24 / 48})">${K.brandMark("figma")}</g>
      ${txt(x + 44, y + 26, "Email design.fig", 14, 600, "#e5e7eb")}
      <rect x="${x}" y="${y + 40}" width="${w * 0.24}" height="${h}" fill="#ffffff"/>
      ${["Header", "Hero", "Products", "CTA", "Footer"].map((l, i) => `<rect x="${x + 12}" y="${y + 58 + i * 34}" width="14" height="14" rx="3" fill="${i === 1 ? "#a259ff" : "#cbd5e1"}"/>${txt(x + 34, y + 70 + i * 34, l, 13, 600, i === 1 ? "#7c3aed" : "#475569")}`).join("")}
      <rect x="${fx}" y="${y + 60}" width="${fw}" height="${h - 80}" fill="#ffffff" stroke="#a259ff" stroke-width="2.5"/>
      ${txt(fx, y + 54, "Frame 600", 12, 700, "#a259ff")}
      <rect x="${fx + 16}" y="${y + 76}" width="${fw - 32}" height="${h * 0.26}" rx="6" fill="url(#hero)" opacity="0.9"/>
      ${bar(fx + 16, y + 90 + h * 0.26, fw * 0.6, 10, "#94a3b8")}${bar(fx + 16, y + 110 + h * 0.26, fw * 0.8)}${bar(fx + 16, y + 128 + h * 0.26, fw * 0.7)}
      ${[0, 1, 2].map((i) => `<rect x="${fx + 16 + i * ((fw - 40) / 3 + 4)}" y="${y + 150 + h * 0.26}" width="${(fw - 40) / 3}" height="${(fw - 40) / 3}" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-dasharray="4 4"/>`).join("")}
      <rect x="${fx + fw / 2 - 50}" y="${y + h - 64}" width="100" height="26" rx="13" fill="${t.brand}"/>`);
}

/** Klaviyo-style flow: trigger, delays and emails down a line. */
function flow(x, y, t, steps) {
    let out = `<path d="M${x + 150} ${y + 60} V ${y + 60 + (steps.length - 1) * 118}" stroke="#ffffff" stroke-width="5" stroke-dasharray="10 10" opacity="0.95"/>`;
    steps.forEach((st, i) => {
        const yy = y + i * 118;
        if (st.kind === "delay") {
            out += `<g filter="url(#shadowSm)"><rect x="${x + 70}" y="${yy + 30}" width="160" height="56" rx="28" fill="#ffffff"/></g>${K.place(K.icon.sun(t.brand), x + 84, yy + 40, 36)}${txt(x + 128, yy + 66, st.label, 20, 800)}`;
        } else {
            out += K.card(x, yy, 300, 100, `
              <rect x="${x + 18}" y="${yy + 20}" width="60" height="60" rx="16" fill="${st.bg}"/>${K.place(K.icon[st.icon](st.color), x + 30, yy + 32, 36)}
              ${txt(x + 94, yy + 46, st.label, 21, 800)}${txt(x + 94, yy + 74, st.sub, 16, 600, "#64748b")}`, { r: 24 });
        }
    });
    return out;
}

/** Campaign calendar card. */
function calendar(x, y, w, t, events) {
    const cw = (w - 40) / 7, rows = 5;
    let out = K.card(x, y, w, 90 + rows * cw, `${txt(x + 24, y + 44, "Campaign calendar", 22, 800)}${txt(x + w - 24, y + 44, "November", 18, 700, "#64748b", "end")}`, { r: 24 });
    for (let r = 0; r < rows; r++) for (let c = 0; c < 7; c++) {
        const cx = x + 20 + c * cw, cy = y + 70 + r * cw;
        out += `<rect x="${cx + 3}" y="${cy + 3}" width="${cw - 6}" height="${cw - 6}" rx="10" fill="#f8fafc"/>${txt(cx + 12, cy + 24, r * 7 + c + 1, 13, 600, "#94a3b8")}`;
    }
    events.forEach((e) => {
        const cx = x + 20 + e.c * cw, cy = y + 70 + e.r * cw;
        out += `<rect x="${cx + 3}" y="${cy + 3}" width="${cw * (e.span || 1) - 6}" height="${cw - 6}" rx="10" fill="${e.color}"/>${K.place(K.icon.envelope("#ffffff"), cx + 10, cy + cw / 2 - 14, 26)}${e.label ? txt(cx + 42, cy + cw / 2 + 6, e.label, 15, 800, "#ffffff") : ""}`;
    });
    return out;
}

/** Order / receipt email (transactional). */
function receipt(x, y, w, h, t, opt = {}) {
    const s = w / 400;
    return clip(x, y, w, h, opt.r ?? 20, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff"/>
      <circle cx="${x + 30 * s}" cy="${y + 30 * s}" r="${10 * s}" fill="${t.brand}"/>${bar(x + 48 * s, y + 25 * s, 70 * s, 10 * s, "#334155")}
      <circle cx="${x + w / 2}" cy="${y + 100 * s}" r="${36 * s}" fill="#dcfce7"/>${K.place(K.icon.check("#16a34a"), x + w / 2 - 26 * s, y + 74 * s, 52 * s)}
      ${txt(x + w / 2, y + 170 * s, opt.title || "Order confirmed", 26 * s, 900, "#0f172a", "middle")}
      ${txt(x + w / 2, y + 196 * s, opt.sub || "Order #10482 · Arrives Friday", 14 * s, 600, "#64748b", "middle")}
      ${[["Linen shirt", "$48.00", "#fdba74"], ["Canvas tote", "$32.00", "#93c5fd"]].map(([name, price, c], i) => `
        <rect x="${x + 24 * s}" y="${y + (224 + i * 76) * s}" width="${56 * s}" height="${56 * s}" rx="${10 * s}" fill="${c}"/>
        ${txt(x + 96 * s, y + (248 + i * 76) * s, name, 16 * s, 700)}${txt(x + 96 * s, y + (270 + i * 76) * s, "Qty 1 · Size M", 13 * s, 500, "#64748b")}
        ${txt(x + w - 24 * s, y + (256 + i * 76) * s, price, 16 * s, 800, "#0f172a", "end")}`).join("")}
      <rect x="${x + 24 * s}" y="${y + 386 * s}" width="${w - 48 * s}" height="2" fill="#e2e8f0"/>
      ${txt(x + 24 * s, y + 420 * s, "Total", 18 * s, 800)}${txt(x + w - 24 * s, y + 420 * s, "$80.00", 20 * s, 900, "#0f172a", "end")}
      <rect x="${x + w / 2 - 90 * s}" y="${y + 446 * s}" width="${180 * s}" height="${42 * s}" rx="${21 * s}" fill="${t.brand}"/>
      ${txt(x + w / 2, y + 473 * s, "Track order", 16 * s, 800, "#ffffff", "middle")}
      ${h > 560 * s ? `${txt(x + 24 * s, y + 540 * s, "You may also like", 17 * s, 800)}
        ${[0, 1, 2].map((i) => `<rect x="${x + 24 * s + i * 122 * s}" y="${y + 558 * s}" width="${110 * s}" height="${110 * s}" rx="${12 * s}" fill="${t.productAlt[i]}" opacity="0.8"/>${bar(x + 24 * s + i * 122 * s, y + 680 * s, 80 * s, 9 * s)}${txt(x + 24 * s + i * 122 * s, y + 712 * s, ["$36", "$52", "$28"][i], 15 * s, 800)}`).join("")}` : ""}
      <rect x="${x}" y="${y + Math.max(510, 740) * s}" width="${w}" height="${h}" fill="#f8fafc"/>`);
}

/** Shopify-like product page. */
function storePage(x, y, w, h, t) {
    const s = w / 500;
    return clip(x, y, w, h, 6, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff"/>
      <g transform="translate(${x + 16 * s} ${y + 12 * s}) scale(${26 * s / 48})">${K.brandMark("shopify")}</g>${bar(x + 50 * s, y + 20 * s, 80 * s, 11 * s, "#334155")}
      ${[0, 1, 2].map((i) => bar(x + w - (i + 1) * 64 * s, y + 22 * s, 48 * s, 8 * s)).join("")}
      <rect x="${x + 20 * s}" y="${y + 56 * s}" width="${220 * s}" height="${240 * s}" rx="${12 * s}" fill="${t.hero1}" opacity="0.25"/>
      <rect x="${x + 80 * s}" y="${y + 110 * s}" width="${100 * s}" height="${130 * s}" rx="${24 * s}" fill="${t.hero1}"/>
      ${txt(x + 264 * s, y + 90 * s, "Linen Overshirt", 22 * s, 800)}
      ${txt(x + 264 * s, y + 124 * s, "$48.00", 22 * s, 900, t.brand)}
      ${[0, 1, 2].map((i) => `<rect x="${x + (264 + i * 44) * s}" y="${y + 144 * s}" width="${36 * s}" height="${30 * s}" rx="${8 * s}" fill="${i === 1 ? "#0f172a" : "#f1f5f9"}"/>`).join("")}
      <rect x="${x + 264 * s}" y="${y + 194 * s}" width="${210 * s}" height="${44 * s}" rx="${22 * s}" fill="#0f172a"/>
      ${txt(x + 369 * s, y + 222 * s, "Add to cart", 16 * s, 800, "#ffffff", "middle")}
      ${bar(x + 264 * s, y + 256 * s, 190 * s, 8 * s)}${bar(x + 264 * s, y + 272 * s, 160 * s, 8 * s)}
      ${Array.from({ length: Math.max(1, Math.floor((h / s - 318) / 150)) * 4 }, (_, i) => `<rect x="${x + (20 + (i % 4) * 118) * s}" y="${y + (318 + Math.floor(i / 4) * 150) * s}" width="${106 * s}" height="${106 * s}" rx="${10 * s}" fill="${t.productAlt[i % 3]}" opacity="0.8"/>${bar(x + (20 + (i % 4) * 118) * s, y + (434 + Math.floor(i / 4) * 150) * s, 80 * s, 8 * s)}`).join("")}`);
}

/** Instagram-like post grid on a phone screen. */
function socialFeed(x, y, w, h, t) {
    const s = w / 300;
    const cell = (w - 4 * s) / 3;
    const colors = ["#fdba74", "#f9a8d4", "#93c5fd", "#86efac", "#fcd34d", "#c4b5fd", "#fca5a5", "#67e8f9", "#fdba74"];
    const rows = Math.ceil((h - 120 * s) / (cell + 2 * s));
    let grid = "";
    for (let i = 0; i < rows * 3; i++) {
        const cx = x + (i % 3) * (cell + 2 * s), cy = y + 120 * s + Math.floor(i / 3) * (cell + 2 * s);
        grid += `<rect x="${cx}" y="${cy}" width="${cell}" height="${cell}" fill="${colors[i % colors.length]}"/>`;
        if (i % 4 === 0) grid += K.place(K.icon.heart("#ffffff"), cx + cell / 2 - 16 * s, cy + cell / 2 - 16 * s, 32 * s);
    }
    return clip(x, y, w, h, 24 * s, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff"/>
      <circle cx="${x + 48 * s}" cy="${y + 70 * s}" r="${30 * s}" fill="url(#hero)"/>
      ${txt(x + 96 * s, y + 64 * s, "yourbrand", 18 * s, 800)}${txt(x + 96 * s, y + 86 * s, "248 posts · 12.4k followers", 12 * s, 600, "#64748b")}
      ${grid}`);
}

/* ───────────── Scene layouts ───────────── */

/**
 * Service hero (1000 x 1000): context card top-left, devices centre, a titled row of brand tiles top-right,
 * a column of brand tiles on the left and two promise pills at the bottom.
 */
function hero(t, cfg) {
    let b = "";
    b += K.connector("M190 560 C 250 560, 250 640, 330 650", t, [[245, 600]]);
    b += cfg.context(t);
    b += K.laptop(300, 400, 520, t, cfg.laptop || ((x, y, w, h) => K.emailUI(x, y, w, h, t, { heroH: 150, copy: cfg.copy })));
    if (cfg.phone !== false) b += K.phone(745, 540, 170, t, cfg.phone || ((x, y, w, h) => K.emailUI(x, y, w, h, t, { heroH: 140, r: 20, copy: cfg.copy })));
    b += K.card(600, 110, 340, 150, txt(624, 146, cfg.rowTitle, 16, 800), { small: true });
    cfg.row.forEach((name, i) => { b += K.brandTile(624 + i * 78, 164, 62, name, { small: true, check: cfg.rowCheck !== false }); });
    if (cfg.column) {
        b += K.card(70, 470, 150, 380, txt(145, 506, cfg.column.title, 15, 800, "#0f172a", "middle"), { small: true });
        cfg.column.tiles.forEach((name, i) => { b += K.brandTile(110, 526 + i * 78, 70, name, { small: true }); });
    }
    b += K.pill(330, 880, cfg.pills[0], t, { dot: t.brand, w: cfg.pills[0].length * 9.4 + 60 });
    b += K.pill(330 + cfg.pills[0].length * 9.4 + 75, 880, cfg.pills[1], t, { dot: "#16a34a", w: cfg.pills[1].length * 9.4 + 60 });
    return K.svgDoc(1000, 1000, t, b);
}

/** Intro concept (1000 x 1000): one large visual with two big labels. */
function concept(t, draw) {
    return K.svgDoc(1000, 1000, t, draw(t));
}

module.exports = { txt, clip, bar, signature, mailWithSignature, figmaCanvas, flow, calendar, receipt, storePage, socialFeed, hero, concept };
