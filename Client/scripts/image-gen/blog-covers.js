// Blog featured images (1200 x 630): headline + logo on the left, a visual for the topic on the right.
// Usage: node scripts/image-gen/blog-covers.js [slug]
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const K = require("./kit");
const V = require("./scenes");
require("./services"); // extra icons
const { txt, bar } = V;

const OUT = path.join(__dirname, "..", "..", "public", "images", "media", "generated");
const W = 1200, H = 630;
const theme = (bg1, bg2, plant, brand, hero1, hero2) => ({ bg1, bg2, plant, shadow: "#1e293b", brand, hero1, hero2, product: "#fef3c7", productAlt: ["#fdba74", "#93c5fd", "#86efac"], plants: [[1150, 200, 1.1], [620, 620, 0.7]], bokeh: [[900, 70, 30], [700, 560, 18]] });
let LOGO = "";

/** Left column: logo, eyebrow, headline (wrapped) */
function left(t, eyebrow, lines) {
    return `<image x="64" y="60" width="210" height="45" href="data:image/png;base64,${LOGO}"/>
      <rect x="64" y="150" width="${eyebrow.length * 11 + 40}" height="40" rx="20" fill="#ffffff"/>
      <circle cx="86" cy="170" r="7" fill="${t.brand}"/>${txt(102, 176, eyebrow, 16, 800, t.brand, "start")}
      ${lines.map((l, i) => txt(64, 262 + i * 62, l, 50, 900, i === lines.length - 1 ? t.brand : "#0f172a", "start")).join("")}`;
}
const email = (x, y, w, h, t, copy, dark) => K.card(x, y, w, h, V.clip(x, y, w, h, 20, K.emailUI(x, y, w, h, t, { heroH: 150, r: 20, copy, dark })), { r: 20 });


/** Generic cover: headline left, a checklist card on the right with brand tiles beside it. */
function listCover(c, eyebrow, lines, head, items, brands, icon = "check") {
    const t = theme(...c);
    let b = left(t, eyebrow, lines);
    const ch = 110 + items.length * 72, cy = (H - ch) / 2;
    b += K.card(700, cy, 430, ch, `${txt(728, cy + 46, head, 24, 800, "#0f172a", "start")}
        ${items.map((l, i) => `<rect x="724" y="${cy + 72 + i * 72}" width="382" height="58" rx="14" fill="#f8fafc"/>${K.place(K.icon[icon](icon === "cross" ? "#ef4444" : t.brand), 736, cy + 83 + i * 72, 36)}${txt(786, cy + 109 + i * 72, l, 19, 700, "#334155", "start")}`).join("")}`, { r: 24 });
    brands.forEach((n, i) => { b += K.brandTile(610, H / 2 - brands.length * 55 + 13 + i * 110, 84, n, { small: true }); });
    return K.svgDoc(W, H, t, b);
}
const COVERS = {
    "gmail-clipping-102kb-limit": () => {
        const t = theme("#fff1f2", "#fcd7d9", "#a16262", "#ea4335", "#ef4444", "#f97316");
        let b = left(t, "GMAIL CLIPPING", ["Why Gmail Clips", "Your Emails (and", "the 102 KB Fix)"]);
        b += K.card(690, 60, 440, 510, V.clip(690, 60, 440, 510, 20, `<rect x="690" y="60" width="440" height="510" fill="#fff"/>
            <rect x="690" y="60" width="440" height="50" fill="#f1f5f9"/><g transform="translate(704 70) scale(${30 / 48})">${K.brandMark("gmail")}</g>${txt(746, 92, "Inbox", 16, 700, "#334155", "start")}
            ${K.emailUI(710, 124, 400, 300, t, { heroH: 150, r: 12, copy: { eyebrow: "NEW SEASON", title: "Fresh Arrivals", sub: "Shop the full collection", cta: "Shop now" } })}
            <rect x="690" y="430" width="440" height="140" fill="#fff"/>
            ${txt(712, 462, "[Message clipped]", 18, 700, "#475569", "start")}
            ${txt(712, 492, "View entire message", 18, 700, "#1a73e8", "start")}
            <rect x="712" y="512" width="170" height="2" fill="#1a73e8"/>`), { r: 20 });
        b += `<g filter="url(#shadow)"><circle cx="610" cy="500" r="72" fill="#0f172a"/></g>${txt(610, 498, "118", 38, 900, "#f87171")}${txt(610, 528, "KB", 18, 800, "#cbd5e1")}`;
        b += K.pill(930, 18, "Limit: 102 KB", t, { dot: "#ef4444", w: 180 });
        return K.svgDoc(W, H, t, b);
    },
    "klaviyo-welcome-series": () => {
        const t = theme("#e9f8ef", "#cdeedb", "#3f7d5c", "#16a34a", "#16a34a", "#2dd4bf");
        let b = left(t, "KLAVIYO FLOWS", ["Klaviyo Welcome", "Series: 5 Emails", "That Convert"]);
        const steps = [["Welcome + story", "Right away"], ["Best sellers", "Day 2"], ["Reviews", "Day 4"], ["First-order offer", "Day 6"], ["Last reminder", "Day 9"]];
        b += `<path d="M740 100 V 540" stroke="#ffffff" stroke-width="5" stroke-dasharray="10 10"/>`;
        steps.forEach(([l, d], i) => {
            const y = 70 + i * 100;
            b += K.card(700, y, 400, 80, `<rect x="716" y="${y + 14}" width="52" height="52" rx="14" fill="#dcfce7"/>${K.place(K.icon.envelope("#16a34a"), 726, y + 24, 32)}
                ${txt(786, y + 38, `${i + 1}. ${l}`, 20, 800, "#0f172a", "start")}${txt(786, y + 62, d, 16, 600, "#64748b", "start")}`, { r: 20, small: true });
        });
        b += K.brandTile(1110, 30, 70, "klaviyo", { small: true });
        return K.svgDoc(W, H, t, b);
    },
    "dark-mode-email-design": () => {
        const t = theme("#eef0fb", "#d8dcf5", "#5b5f8f", "#6366f1", "#6366f1", "#ec4899");
        let b = left(t, "DARK MODE", ["Dark Mode Email", "Design That Looks", "Right Everywhere"]);
        const copy = { eyebrow: "NEW DROP", title: "Night Edition", sub: "Limited colours, this week", cta: "Shop now" };
        b += `<g transform="rotate(-4 800 330)">${email(660, 90, 300, 470, t, copy, false)}</g>`;
        b += `<g transform="rotate(4 1000 330)">${email(860, 70, 300, 470, t, copy, true)}</g>`;
        b += `<g filter="url(#shadow)"><rect x="850" y="545" width="160" height="64" rx="32" fill="#0f172a"/></g><circle cx="978" cy="577" r="24" fill="#fbbf24"/>${K.place(K.icon.moon("#fbbf24"), 864, 559, 36)}${K.place(K.icon.sun("#0f172a"), 956, 555, 44)}`;
        return K.svgDoc(W, H, t, b);
    },
    "email-testing-checklist": () => {
        const t = theme("#e6f0ff", "#cfe0f7", "#3b6f8f", "#2563eb", "#1d4ed8", "#38bdf8");
        let b = left(t, "EMAIL QA", ["The 25-Point", "Email Testing", "Checklist"]);
        const items = ["Renders in Outlook", "Gmail under 102 KB", "Dark mode checked", "Links and UTMs work", "Alt text on images", "Mobile layout stacks"];
        b += K.card(680, 60, 450, 520, `${txt(708, 104, "Pre-send checklist", 24, 800, "#0f172a", "start")}${txt(1102, 104, "25/25", 20, 900, "#16a34a", "end")}
            ${items.map((l, i) => `<rect x="704" y="${130 + i * 70}" width="402" height="56" rx="14" fill="#f8fafc"/>${K.place(K.icon.check("#16a34a"), 716, 140 + i * 70, 36)}${txt(766, 166 + i * 70, l, 19, 700, "#334155", "start")}`).join("")}`, { r: 24 });
        ["outlook", "gmail", "apple", "yahoo"].forEach((n, i) => { b += K.brandTile(610, H / 2 - brands.length * 55 + 13 + i * 110, 84, n, { small: true, check: true }); });
        return K.svgDoc(W, H, t, b);
    },
    "white-label-email-development-agencies": () => {
        const t = theme("#eef1f6", "#d9dfea", "#566276", "#f97316", "#475569", "#f97316");
        let b = left(t, "FOR AGENCIES", ["White-Label Email", "Development for", "Growing Agencies"]);
        b += email(760, 60, 360, 510, t, { eyebrow: "YOUR CLIENT", title: "Built by Your Team", sub: "Delivered under your brand", cta: "View email" });
        b += K.card(560, 170, 250, 110, `${K.place(K.icon.user("#334155"), 580, 196, 56)}${txt(648, 222, "Your agency", 22, 800, "#0f172a", "start")}${txt(648, 250, "Client-facing", 16, 600, "#64748b", "start")}`, { r: 22 });
        b += K.card(560, 420, 250, 110, `${K.place(K.icon.shield("#16a34a"), 580, 446, 56)}${txt(648, 472, "NDA ready", 22, 800, "#0f172a", "start")}${txt(648, 500, "No MailStora logo", 16, 600, "#64748b", "start")}`, { r: 22 });
        ["klaviyo", "mailchimp", "hubspot"].forEach((n, i) => { b += K.brandTile(1120, 150 + i * 100, 64, n, { small: true }); });
        return K.svgDoc(W, H, t, b);
    },
    "import-custom-html-template-mailchimp": () => listCover(["#fff8e1", "#fdeab0", "#8a6d1f", "#d97706", "#f59e0b", "#fbbf24"], "MAILCHIMP", ["Import a Custom", "HTML Template", "Into Mailchimp"], "Upload steps", ["Code your template", "Add mc:edit regions", "Import HTML or zip", "Send a test"], ["mailchimp", "gmail", "apple"]),
    "klaviyo-custom-html-template": () => listCover(["#e9f8ef", "#cdeedb", "#3f7d5c", "#16a34a", "#16a34a", "#2dd4bf"], "KLAVIYO", ["Custom HTML", "Templates in", "Klaviyo"], "Editable setup", ["Hybrid drag-and-drop", "Editable text regions", "Dynamic product blocks", "Saved brand blocks"], ["gmail", "shopify", "apple"]),
    "email-images-not-showing": () => listCover(["#fff1f2", "#fcd7d9", "#a16262", "#e11d48", "#ef4444", "#f97316"], "TROUBLESHOOTING", ["Why Images", "Don't Show in", "Your Emails"], "Common causes", ["Images blocked", "Local file paths", "HTTP not HTTPS", "Huge file sizes", "Missing alt text"], ["gmail", "apple", "google"], "cross"),
    "why-emails-go-to-spam": () => listCover(["#eef1f6", "#d9dfea", "#566276", "#dc2626", "#475569", "#f97316"], "DELIVERABILITY", ["Why Your Emails", "Go to Spam (and", "How to Fix It)"], "Fix list", ["SPF, DKIM, DMARC", "Balanced text/image", "Clean HTML code", "Clear unsubscribe", "Engaged list only"], ["gmail", "google", "protonmail"]),
    "responsive-email-not-working-mobile": () => listCover(["#e6f0ff", "#cfe0f7", "#3b6f8f", "#2563eb", "#1d4ed8", "#38bdf8"], "MOBILE EMAIL", ["Email Not", "Responsive on", "Mobile? Fix It"], "Mobile checks", ["Viewport meta tag", "Fluid tables", "Stacking columns", "14px+ text", "44px buttons"], ["apple", "gmail", "samsung"], "phone"),
    "outlook-background-images-vml": () => listCover(["#e8f1fb", "#cfe2f6", "#3c648c", "#0f6cbd", "#0f6cbd", "#38bdf8"], "OUTLOOK", ["Background Images", "in Outlook", "With VML"], "What works", ["VML fallback", "Solid colour backup", "Live text on top", "Tested in Outlook"], ["gmail", "apple", "thunderbird"], "code"),
    "bulletproof-email-buttons": () => listCover(["#eef0fb", "#d8dcf5", "#5b5f8f", "#6366f1", "#6366f1", "#ec4899"], "EMAIL CODE", ["Bulletproof", "Email Buttons", "That Always Work"], "Button rules", ["Live text, not image", "Padding on table cell", "VML for Outlook", "44px tap height"], ["gmail", "apple", "thunderbird"], "link"),
    "customize-shopify-order-confirmation-email": () => listCover(["#eef8e6", "#d6efc3", "#5b7d3f", "#5a8f1f", "#65a30d", "#16a34a"], "SHOPIFY", ["Customize Shopify", "Order Confirmation", "Emails"], "Edit safely", ["Keep Liquid tags", "Add your branding", "Product line items", "Test with a real order"], ["shopify", "gmail", "apple"]),
    "hubspot-custom-coded-email-template": () => listCover(["#fff1ea", "#fdd9c7", "#9a5a3e", "#ea580c", "#f97316", "#fb923c"], "HUBSPOT", ["HubSpot Custom", "Coded Email", "Templates"], "Build steps", ["Create coded template", "Add HubL modules", "Drag-and-drop areas", "Test and publish"], ["hubspot", "gmail", "apple"], "code"),
    "accessible-email-design": () => listCover(["#ecfdf5", "#c9f2df", "#3f7d6a", "#0d9488", "#0d9488", "#22c55e"], "ACCESSIBILITY", ["Accessible Email", "Design: A Simple", "Guide"], "Quick wins", ["Alt text on images", "4.5:1 contrast", "Real headings", "role=presentation", "Clear link text"], ["gmail", "apple", "google"], "user"),
    "new-outlook-vs-classic-outlook-email-rendering": () => listCover(["#e8f1fb", "#cfe2f6", "#3c648c", "#0f6cbd", "#0f6cbd", "#38bdf8"], "OUTLOOK 2026", ["New Outlook vs", "Classic Outlook", "Email Rendering"], "Code for both", ["Word engine (classic)", "Web engine (new)", "Tables still safe", "Test both versions"], ["gmail", "apple", "thunderbird"], "code"),
    "new-outlook-breaking-html-email": () => listCover(["#fff1f2", "#fcd7d9", "#a16262", "#e11d48", "#ef4444", "#f97316"], "NEW OUTLOOK", ["New Outlook", "Breaking Your", "HTML Emails?"], "What breaks", ["Styles rewritten", "Class names changed", "Spacing collapses", "Dark mode shifts"], ["gmail", "apple", "google"], "cross"),
    "klaviyo-email-looks-different-in-outlook": () => listCover(["#e9f8ef", "#cdeedb", "#3f7d5c", "#16a34a", "#16a34a", "#2dd4bf"], "KLAVIYO + OUTLOOK", ["Klaviyo Email", "Looks Different", "in Outlook?"], "Fix list", ["Set image widths", "Avoid split blocks", "Web-safe fonts", "Bulletproof buttons"], ["shopify", "gmail", "apple"]),
    "dmarc-setup-klaviyo": () => listCover(["#eef1f6", "#d9dfea", "#566276", "#2563eb", "#475569", "#38bdf8"], "DELIVERABILITY", ["DMARC Setup", "for Klaviyo:", "Step by Step"], "DNS records", ["Branded sending domain", "SPF + DKIM verified", "DMARC p=none", "Monitor reports"], ["gmail", "google", "shopify"], "shield"),
    "klaviyo-sending-domain-warm-up": () => listCover(["#fff8e1", "#fdeab0", "#8a6d1f", "#d97706", "#f59e0b", "#fbbf24"], "KLAVIYO", ["Warm Up a New", "Klaviyo Sending", "Domain"], "Warm-up plan", ["Most engaged first", "Grow volume slowly", "Watch complaints", "Full list by week 6"], ["gmail", "google", "apple"], "chart"),
    "klaviyo-fake-signups-bots": () => listCover(["#fff1ea", "#fdd9c7", "#9a5a3e", "#ea580c", "#f97316", "#fb923c"], "LIST QUALITY", ["Stop Fake and", "Bot Signups in", "Klaviyo"], "Protect your list", ["Double opt-in", "Hidden form field", "Remove bad emails", "Better signup offer"], ["shopify", "gmail", "google"], "shield"),
    "email-open-rates-apple-mail-privacy": () => listCover(["#eef0fb", "#d8dcf5", "#5b5f8f", "#6366f1", "#6366f1", "#ec4899"], "EMAIL METRICS", ["Are Open Rates", "Still Reliable", "in 2026?"], "Better metrics", ["Click rate", "Placed order rate", "Revenue per email", "Unsubscribe rate"], ["apple", "gmail", "google"], "chart"),
    "klaviyo-vs-mailchimp-for-shopify": () => listCover(["#eef8e6", "#d6efc3", "#5b7d3f", "#5a8f1f", "#65a30d", "#16a34a"], "COMPARISON", ["Klaviyo vs", "Mailchimp for", "Shopify Stores"], "Compare", ["Shopify data sync", "Flows and segments", "Pricing by contacts", "Template editing"], ["shopify", "mailchimp", "gmail"]),
    "hire-email-developer-vs-agency": () => listCover(["#ecfdf5", "#c9f2df", "#3f7d6a", "#0d9488", "#0d9488", "#22c55e"], "HIRING GUIDE", ["Hire an Email", "Developer or", "an Agency?"], "Decide by", ["Volume of work", "Budget", "Platforms used", "Testing and support"], ["mailchimp", "hubspot", "shopify"], "user"),
    "ai-generated-email-templates": () => listCover(["#f3eefd", "#e2d6f8", "#6a5a8f", "#7c3aed", "#7c3aed", "#ec4899"], "AI + EMAIL", ["AI-Generated", "Email Templates:", "Do They Work?"], "Common issues", ["Div and flex layouts", "No Outlook code", "Heavy file size", "No dark mode"], ["gmail", "apple", "google"], "cross"),
};

(async () => {
    fs.mkdirSync(OUT, { recursive: true });
    const logo = path.join(__dirname, "..", "..", "public", "images", "brand", "mailstora-logo-2026.webp");
    LOGO = (await sharp(logo).resize({ width: 420 }).png().toBuffer()).toString("base64");
    const only = process.argv[2];
    for (const [slug, draw] of Object.entries(COVERS)) {
        if (only && slug !== only) continue;
        const file = path.join(OUT, `blog-${slug}.webp`);
        await sharp(Buffer.from(draw()), { density: 144 }).resize({ width: W }).webp({ quality: 86 }).toFile(file);
        console.log(`blog-${slug}.webp`, Math.round(fs.statSync(file).size / 1024) + " KB");
    }
})();
