// Building blocks for MailStora-style illustrations, drawn as SVG and rendered to WebP with sharp.
// Style: tinted soft background with blurred "room" shapes, device mockups showing an email,
// white rounded floating cards with icons, dashed connectors, soft shadows.

const FONT = "Segoe UI, Inter, Arial, Helvetica, sans-serif";
let uid = 0;
const id = (p) => `${p}${++uid}`;

/** Shared <defs>: shadows and gradients used by every scene. */
function defs(t) {
    return `
  <filter id="shadow" x="-30%" y="-30%" width="160%" height="170%">
    <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="${t.shadow}" flood-opacity="0.28"/>
  </filter>
  <filter id="shadowSm" x="-30%" y="-30%" width="160%" height="170%">
    <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="${t.shadow}" flood-opacity="0.22"/>
  </filter>
  <filter id="blurBig"><feGaussianBlur stdDeviation="38"/></filter>
  <filter id="gray"><feColorMatrix type="saturate" values="0.08"/></filter>
  <filter id="blurMd"><feGaussianBlur stdDeviation="14"/></filter>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${t.bg1}"/><stop offset="1" stop-color="${t.bg2}"/>
  </linearGradient>
  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.55"/>
  </linearGradient>
  <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#e5e7eb"/><stop offset="0.5" stop-color="#cbd5e1"/><stop offset="1" stop-color="#94a3b8"/>
  </linearGradient>
  <linearGradient id="hero" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${t.hero1}"/><stop offset="1" stop-color="${t.hero2}"/>
  </linearGradient>
  <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#fb923c"/><stop offset="1" stop-color="#f97316"/>
  </linearGradient>`;
}

/** Soft blurred room: tinted wall, plant silhouettes, window light, floor sheen, bokeh. */
function background(w, h, t) {
    const plants = t.plants.map(([x, y, s]) => `
    <g filter="url(#blurBig)" opacity="0.55">
      <ellipse cx="${x}" cy="${y}" rx="${70 * s}" ry="${150 * s}" fill="${t.plant}" transform="rotate(-18 ${x} ${y})"/>
      <ellipse cx="${x + 60 * s}" cy="${y - 20 * s}" rx="${60 * s}" ry="${140 * s}" fill="${t.plant}" transform="rotate(22 ${x} ${y})"/>
      <ellipse cx="${x - 55 * s}" cy="${y + 30 * s}" rx="${50 * s}" ry="${120 * s}" fill="${t.plant}" transform="rotate(-40 ${x} ${y})"/>
    </g>`).join("");
    const bokeh = t.bokeh.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" opacity="0.35" filter="url(#blurMd)"/>`).join("");
    return `
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <ellipse cx="${w * 0.72}" cy="${h * 0.12}" rx="${w * 0.45}" ry="${h * 0.3}" fill="#ffffff" opacity="0.45" filter="url(#blurBig)"/>
  ${plants}
  ${bokeh}
  <rect x="0" y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="url(#floor)"/>
  <ellipse cx="${w * 0.5}" cy="${h * 0.93}" rx="${w * 0.55}" ry="${h * 0.06}" fill="${t.shadow}" opacity="0.12" filter="url(#blurMd)"/>`;
}

/** A generic, well-designed marketing email rendered inside a screen. */
function emailUI(x, y, w, h, t, opt = {}) {
    const clip = id("clip");
    const s = w / 400; // design grid is 400 wide
    const pad = 22 * s;
    const bars = (yy, widths, color = "#e2e8f0", hh = 9) => widths.map((ww, i) => `<rect x="${x + pad}" y="${yy + i * (hh + 7) * s}" width="${ww * s}" height="${hh * s}" rx="${4 * s}" fill="${color}"/>`).join("");
    const dark = opt.dark;
    const paper = dark ? "#0f172a" : "#ffffff";
    const text = dark ? "#e2e8f0" : "#0f172a";
    const line = dark ? "#334155" : "#e2e8f0";
    let yy = y + 18 * s;
    let out = `<clipPath id="${clip}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${opt.r ?? 6}"/></clipPath><g clip-path="url(#${clip})">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${paper}"/>`;
    // header: logo + nav
    out += `<circle cx="${x + pad + 8 * s}" cy="${yy + 8 * s}" r="${8 * s}" fill="${t.brand}"/>
      <rect x="${x + pad + 22 * s}" y="${yy + 3 * s}" width="${60 * s}" height="${10 * s}" rx="${5 * s}" fill="${text}" opacity="0.85"/>
      ${[0, 1, 2].map((i) => `<rect x="${x + w - pad - (i + 1) * 44 * s}" y="${yy + 4 * s}" width="${34 * s}" height="${8 * s}" rx="${4 * s}" fill="${line}"/>`).join("")}`;
    yy += 34 * s;
    // hero banner
    const hh = opt.heroH ?? 150;
    out += `<rect x="${x + pad}" y="${yy}" width="${w - pad * 2}" height="${hh * s}" rx="${10 * s}" fill="url(#hero)"/>`;
    if (opt.copy) {
        const F = "Segoe UI, Inter, Arial, sans-serif";
        out += `<text x="${x + pad + 22 * s}" y="${yy + 30 * s}" font-family="${F}" font-size="${11 * s}" font-weight="800" letter-spacing="${1.5 * s}" fill="#ffffff" opacity="0.85">${opt.copy.eyebrow}</text>
          <text x="${x + pad + 22 * s}" y="${yy + 62 * s}" font-family="${F}" font-size="${Math.min(28, 205 / (opt.copy.title.length * 0.6)) * s}" font-weight="900" fill="#ffffff">${opt.copy.title}</text>
          <text x="${x + pad + 22 * s}" y="${yy + 86 * s}" font-family="${F}" font-size="${14 * s}" font-weight="600" fill="#ffffff" opacity="0.92">${opt.copy.sub}</text>
          <rect x="${x + pad + 22 * s}" y="${yy + 100 * s}" width="${88 * s}" height="${26 * s}" rx="${13 * s}" fill="#ffffff"/>
          <text x="${x + pad + 66 * s}" y="${yy + 117 * s}" text-anchor="middle" font-family="${F}" font-size="${12 * s}" font-weight="800" fill="${t.brand}">${opt.copy.cta}</text>`;
    } else {
        out += `<rect x="${x + pad + 22 * s}" y="${yy + 34 * s}" width="${120 * s}" height="${16 * s}" rx="${4 * s}" fill="#ffffff"/>
      <rect x="${x + pad + 22 * s}" y="${yy + 58 * s}" width="${90 * s}" height="${16 * s}" rx="${4 * s}" fill="#ffffff" opacity="0.9"/>
      <rect x="${x + pad + 22 * s}" y="${yy + 86 * s}" width="${110 * s}" height="${7 * s}" rx="${3 * s}" fill="#ffffff" opacity="0.7"/>
      <rect x="${x + pad + 22 * s}" y="${yy + 108 * s}" width="${74 * s}" height="${24 * s}" rx="${12 * s}" fill="url(#accent)"/>`;
    }
    out += `
      <circle cx="${x + w - pad - 78 * s}" cy="${yy + 78 * s}" r="${48 * s}" fill="#ffffff" opacity="0.22"/>
      <rect x="${x + w - pad - 112 * s}" y="${yy + 40 * s}" width="${68 * s}" height="${86 * s}" rx="${14 * s}" fill="#ffffff" opacity="0.85"/>
      <path d="M${x + w - pad - 96 * s} ${yy + 62 * s} h${36 * s} l${4 * s} ${46 * s} h${-44 * s} z" fill="${t.product}"/>
      <path d="M${x + w - pad - 88 * s} ${yy + 64 * s} v${-8 * s} a${10 * s} ${10 * s} 0 0 1 ${20 * s} 0 v${8 * s}" fill="none" stroke="${t.product}" stroke-width="${4 * s}" stroke-linecap="round"/>`;
    yy += (hh + 20) * s;
    // headline + copy
    out += `<rect x="${x + pad}" y="${yy}" width="${210 * s}" height="${14 * s}" rx="${4 * s}" fill="${text}" opacity="0.85"/>`;
    yy += 26 * s;
    out += bars(yy, [330, 300, 250], line, 7);
    yy += 56 * s;
    // product row
    const cw = (w - pad * 2 - 16 * s) / 3;
    for (let i = 0; i < 3; i++) {
        const cx = x + pad + i * (cw + 8 * s);
        out += `<rect x="${cx}" y="${yy}" width="${cw}" height="${cw}" rx="${8 * s}" fill="${dark ? "#1e293b" : "#f1f5f9"}"/>
        <rect x="${cx + cw * 0.28}" y="${yy + cw * 0.22}" width="${cw * 0.44}" height="${cw * 0.5}" rx="${cw * 0.12}" fill="${t.productAlt[i % t.productAlt.length]}"/>
        <rect x="${cx}" y="${yy + cw + 8 * s}" width="${cw * 0.8}" height="${7 * s}" rx="${3 * s}" fill="${line}"/>`;
    }
    yy += cw + 30 * s;
    out += `<rect x="${x + w / 2 - 70 * s}" y="${yy}" width="${140 * s}" height="${28 * s}" rx="${14 * s}" fill="${t.brand}"/>`;
    yy += 46 * s;
    // Tall screens (phones): keep adding article blocks so the email fills the screen
    let k = 0;
    while (yy < y + h - 70 * s && k < 6) {
        const imgLeft = k % 2 === 0;
        const iw = 130 * s, ih = 100 * s;
        const ix = imgLeft ? x + pad : x + w - pad - iw;
        const tx = imgLeft ? x + pad + iw + 16 * s : x + pad;
        out += `<rect x="${ix}" y="${yy}" width="${iw}" height="${ih}" rx="${10 * s}" fill="${t.productAlt[k % t.productAlt.length]}" opacity="0.85"/>
          <circle cx="${ix + iw / 2}" cy="${yy + ih / 2}" r="${24 * s}" fill="#ffffff" opacity="0.6"/>
          <rect x="${tx}" y="${yy + 8 * s}" width="${150 * s}" height="${12 * s}" rx="${4 * s}" fill="${text}" opacity="0.85"/>
          <rect x="${tx}" y="${yy + 32 * s}" width="${180 * s}" height="${7 * s}" rx="${3 * s}" fill="${line}"/>
          <rect x="${tx}" y="${yy + 46 * s}" width="${160 * s}" height="${7 * s}" rx="${3 * s}" fill="${line}"/>
          <rect x="${tx}" y="${yy + 70 * s}" width="${80 * s}" height="${20 * s}" rx="${10 * s}" fill="url(#accent)"/>`;
        yy += ih + 26 * s;
        k++;
    }
    out += `<rect x="${x}" y="${yy}" width="${w}" height="${h}" fill="${dark ? "#020617" : "#f8fafc"}"/>`;
    out += [0, 1, 2].map((i) => `<circle cx="${x + w / 2 - 24 * s + i * 24 * s}" cy="${yy + 22 * s}" r="${7 * s}" fill="${line}"/>`).join("");
    out += `</g>`;
    return out;
}

/** Laptop, front view: dark bezel, screen content, metal base. */
function laptop(x, y, w, t, screen) {
    const h = w * 0.63;
    const bez = w * 0.025;
    const sx = x + bez, sy = y + bez, sw = w - bez * 2, sh = h - bez * 2.2;
    return `<g filter="url(#shadow)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.03}" fill="#1f2937"/>
    <rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h - 4}" rx="${w * 0.028}" fill="none" stroke="#475569" stroke-width="2"/>
    <circle cx="${x + w / 2}" cy="${y + bez * 0.55}" r="${bez * 0.18}" fill="#475569"/>
    ${screen(sx, sy, sw, sh)}
    <path d="M${x - w * 0.08} ${y + h} L${x + w * 1.08} ${y + h} L${x + w * 1.04} ${y + h + w * 0.035} Q${x + w / 2} ${y + h + w * 0.05} ${x - w * 0.04} ${y + h + w * 0.035} Z" fill="url(#metal)"/>
    <rect x="${x + w * 0.42}" y="${y + h}" width="${w * 0.16}" height="${w * 0.012}" rx="${w * 0.006}" fill="#94a3b8"/>
  </g>`;
}

/** Phone with notch and screen content. */
function phone(x, y, w, t, screen) {
    const h = w * 2.05;
    const b = w * 0.05;
    return `<g filter="url(#shadow)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.17}" fill="#111827"/>
    <rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" rx="${w * 0.16}" fill="none" stroke="#475569" stroke-width="2"/>
    ${screen(x + b, y + b, w - b * 2, h - b * 2)}
    <rect x="${x + w * 0.36}" y="${y + b + 6}" width="${w * 0.28}" height="${w * 0.07}" rx="${w * 0.035}" fill="#111827"/>
  </g>`;
}

/** White rounded floating card, optionally holding content. */
function card(x, y, w, h, inner = "", opt = {}) {
    return `<g filter="url(#${opt.small ? "shadowSm" : "shadow"})">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${opt.r ?? 22}" fill="${opt.fill ?? "#ffffff"}" ${opt.stroke ? `stroke="${opt.stroke}" stroke-width="2"` : ""}/>
    ${inner}
  </g>`;
}

/** Dashed connector with a small "+" node, like the flow lines in the existing images. */
function connector(d, t, nodes = []) {
    return `<path d="${d}" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="10 10" stroke-linecap="round" opacity="0.9"/>
    ${nodes.map(([x, y]) => `<g filter="url(#shadowSm)"><circle cx="${x}" cy="${y}" r="17" fill="#ffffff"/><path d="M${x - 7} ${y}h14M${x} ${y - 7}v14" stroke="${t.brand}" stroke-width="3.5" stroke-linecap="round"/></g>`).join("")}`;
}

// ── Icons (drawn in a 48x48 box, positioned with translate/scale) ──
const icon = {
    envelope: (c) => `<rect x="4" y="10" width="40" height="28" rx="5" fill="none" stroke="${c}" stroke-width="3.5"/><path d="M6 13l18 13 18-13" fill="none" stroke="${c}" stroke-width="3.5" stroke-linejoin="round"/>`,
    check: (c) => `<circle cx="24" cy="24" r="20" fill="${c}"/><path d="M14 24.5l7 7 13-14" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    cross: (c) => `<circle cx="24" cy="24" r="20" fill="${c}"/><path d="M16 16l16 16M32 16L16 32" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>`,
    moon: (c) => `<path d="M32 6a18 18 0 1 0 10 30A15 15 0 0 1 32 6z" fill="${c}"/>`,
    sun: (c) => `<circle cx="24" cy="24" r="9" fill="${c}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<rect x="22.5" y="3" width="3" height="8" rx="1.5" fill="${c}" transform="rotate(${a} 24 24)"/>`).join("")}`,
    chart: (c) => `<rect x="6" y="28" width="7" height="14" rx="2" fill="${c}"/><rect x="17" y="20" width="7" height="22" rx="2" fill="${c}"/><rect x="28" y="12" width="7" height="30" rx="2" fill="${c}"/><path d="M6 20l11-8 10 5 13-11" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    code: (c) => `<path d="M17 14L7 24l10 10M31 14l10 10-10 10M27 10l-6 28" fill="none" stroke="${c}" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/>`,
    shield: (c) => `<path d="M24 4l17 6v12c0 11-7 19-17 22C14 41 7 33 7 22V10z" fill="${c}"/><path d="M16 24l6 6 11-12" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    phone: (c) => `<rect x="14" y="4" width="20" height="40" rx="5" fill="none" stroke="${c}" stroke-width="3.5"/><rect x="21" y="37" width="6" height="3" rx="1.5" fill="${c}"/>`,
    user: (c) => `<circle cx="24" cy="17" r="9" fill="${c}"/><path d="M8 42c2-9 8-13 16-13s14 4 16 13z" fill="${c}"/>`,
    link: (c) => `<path d="M20 28l8-8M18 22l-5 5a6 6 0 0 0 8 8l5-5M30 26l5-5a6 6 0 0 0-8-8l-5 5" fill="none" stroke="${c}" stroke-width="3.8" stroke-linecap="round"/>`,
    heart: (c) => `<path d="M24 41S6 30 6 17a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 13-18 24-18 24z" fill="${c}"/>`,
    plane: (c) => `<path d="M4 22L44 6 34 42 24 30 4 22z" fill="${c}"/><path d="M24 30l20-24" stroke="#ffffff" stroke-width="2.5" opacity="0.7"/>`,
};
const place = (svg, x, y, size) => `<g transform="translate(${x} ${y}) scale(${size / 48})">${svg}</g>`;

/** Rounded pill label with text. */
function pill(x, y, text, t, opt = {}) {
    if (opt.big) {
        const w = opt.w ?? text.length * 15.5 + 70;
        return `<g filter="url(#shadowSm)"><rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="#ffffff"/>
        ${opt.dot ? `<circle cx="${x + 34}" cy="${y + 32}" r="11" fill="${opt.dot}"/>` : ""}
        <text x="${x + (opt.dot ? 56 : 28)}" y="${y + 42}" font-family="${FONT}" font-size="27" font-weight="800" fill="#0f172a">${text}</text></g>`;
    }
    const w = opt.w ?? text.length * 9.2 + 36;
    return `<g filter="url(#shadowSm)"><rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="${opt.fill ?? "#ffffff"}"/>
    ${opt.dot ? `<circle cx="${x + 22}" cy="${y + 20}" r="7" fill="${opt.dot}"/>` : ""}
    <text x="${x + (opt.dot ? 38 : 18)}" y="${y + 26}" font-family="${FONT}" font-size="16" font-weight="700" fill="${opt.color ?? "#0f172a"}">${text}</text></g>`;
}

function svgDoc(w, h, t, body) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs(t)}</defs>${background(w, h, t)}${body}</svg>`;
}

// ── Brand icons ──
// Simple Icons (CC0) paths where available; Outlook, Klaviyo and Yahoo are drawn here in their brand colours,
// because Simple Icons does not include them.
const BRANDS = require("./brand-icons.json");

/** Logo artwork only (48 x 48 box). */
function brandMark(name) {
    const si = (slug, color) => `<g transform="translate(6 6) scale(1.5)"><path d="${BRANDS[slug].path}" fill="${color || BRANDS[slug].hex}"/></g>`;
    switch (name) {
        case "gmail": return si("gmail");
        case "mailchimp": return `<rect x="2" y="2" width="44" height="44" rx="10" fill="#FFE01B"/><g transform="translate(9 9) scale(1.25)"><path d="${BRANDS.mailchimp.path}" fill="#241C15"/></g>`;
        case "hubspot": return si("hubspot");
        case "apple": return si("apple", "#111111");
        case "html5": return si("html5");
        case "css": return si("css");
        case "shopify": return si("shopify");
        case "figma": return si("figma");
        case "brevo": return si("brevo");
        case "google": return si("google");
        case "meta": return si("meta");
        case "tiktok": return si("tiktok");
        case "googleads": return si("googleads");
        case "openai": return si("openai");
        case "perplexity": return si("perplexity");
        case "googlesearchconsole": return si("googlesearchconsole");
        case "googleanalytics": return si("googleanalytics");
        case "semrush": return si("semrush");

        case "outlook": return `
            <rect x="15" y="7" width="29" height="34" rx="4" fill="#0078D4"/>
            <rect x="15" y="7" width="29" height="11" rx="4" fill="#28A8EA"/>
            <path d="M15 22l14.5 9L44 22v16a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3z" fill="#1490DF"/>
            <path d="M15 38l14.5-9L44 38" fill="none" stroke="#0A5CA8" stroke-width="1.2" opacity="0.6"/>
            <rect x="3" y="13" width="24" height="23" rx="3.5" fill="#0364B8"/>
            <ellipse cx="15" cy="24.5" rx="6" ry="7.3" fill="none" stroke="#ffffff" stroke-width="3.3"/>`;
        case "klaviyo": return `<rect x="2" y="2" width="44" height="44" rx="10" fill="#1A1A1A"/>
            <path d="M13 13h22l-5.5 7.5L35 28H13z" fill="#ffffff"/>
            <rect x="13" y="13" width="3.6" height="23" rx="1.8" fill="#ffffff"/>`;
        case "yahoo": return `<rect x="2" y="2" width="44" height="44" rx="10" fill="#6001D2"/>
            <text x="22" y="33" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="21" font-weight="900" fill="#ffffff">Y</text>
            <text x="35" y="33" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="21" font-weight="900" fill="#ffffff">!</text>`;
        default: return icon.envelope("#0f172a");
    }
}

/** White rounded app tile with a brand logo, optional caption and check badge. */
function brandTile(x, y, size, name, opt = {}) {
    const pad = size * 0.2;
    const inner = size - pad * 2;
    let out = `<g filter="url(#${opt.small ? "shadowSm" : "shadow"})">
      <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${size * 0.24}" fill="#ffffff"/>
      <g transform="translate(${x + pad} ${y + pad}) scale(${inner / 48})">${brandMark(name)}</g>
    </g>`;
    if (opt.check) out += place(icon.check("#16a34a"), x + size - size * 0.28, y - size * 0.1, size * 0.38);
    if (opt.label) out += `<text x="${x + size / 2}" y="${y + size + 24}" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="700" fill="#334155">${opt.label}</text>`;
    return out;
}

/** Dark code editor card with real HTML email code. */
function codeCard(x, y, w, lines, opt = {}) {
    const lh = opt.lh ?? 27;
    const h = 58 + lines.length * lh + 18;
    const col = { tag: "#f472b6", attr: "#fbbf24", val: "#86efac", txt: "#e2e8f0", com: "#64748b" };
    const rows = lines.map((segs, i) => `<text xml:space="preserve" x="${x + 26 + (segs.indent || 0) * 18}" y="${y + 70 + i * lh}" font-family="Consolas, 'Courier New', monospace" font-size="${opt.fs ?? 17}">${segs.parts.map(([k, t]) => `<tspan fill="${col[k]}">${t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</tspan>`).join("")}</text>`).join("");
    return `<g filter="url(#shadow)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="#0f172a"/>
      <circle cx="${x + 24}" cy="${y + 24}" r="6" fill="#f87171"/><circle cx="${x + 44}" cy="${y + 24}" r="6" fill="#fbbf24"/><circle cx="${x + 64}" cy="${y + 24}" r="6" fill="#4ade80"/>
      <text x="${x + 88}" y="${y + 29}" font-family="${FONT}" font-size="14" font-weight="600" fill="#94a3b8">${opt.file ?? "email.html"}</text>
      <rect x="${x}" y="${y + 44}" width="${w}" height="1" fill="#1e293b"/>
      ${rows}
    </g>`;
}

module.exports = { brandTile, brandMark, codeCard, FONT, defs, background, emailUI, laptop, phone, card, connector, icon, place, pill, svgDoc };
