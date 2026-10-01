// Image definitions for every service page except HTML Email Template Development (see services.js).
// Each page: theme tint, email copy, hero, intro concept, floating phone and offer image,
// all drawn from that page's own intro and offer content.
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

const bigPill = (x, y, text, t, dot) => K.pill(x, y, text, t, { big: true, dot, w: text.length * 15.5 + 76 });
const person = { name: "Alex Morgan", role: "Marketing Director", contact: "+1 (555) 014-2290 · brightwave.co", banner: "Spring launch: 20% off this week", cta: "Shop now" };

/* shared scene helpers */
const codeLines = (rows) => rows.map((r) => ({ indent: r[0], parts: r.slice(1) }));
const smallCode = (t, file, rows) => K.codeCard(70, 110, 450, codeLines(rows), { file, fs: 16, lh: 26 });

// Email editor: a block panel next to the email (Klaviyo / Mailchimp style)
function editor(x, y, w, h, t, copy, brand, blocks) {
    const pw = w * 0.3;
    return V.clip(x, y, w, h, 22, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f8fafc"/>
      <rect x="${x}" y="${y}" width="${w}" height="54" fill="#ffffff"/>
      <g transform="translate(${x + 14} ${y + 10}) scale(${34 / 48})">${K.brandMark(brand)}</g>${txt(x + 58, y + 34, "Template editor", 17, 800)}
      <rect x="${x}" y="${y + 54}" width="${pw}" height="${h}" fill="#ffffff"/>
      ${blocks.map((bl, i) => `<g filter="url(#shadowSm)"><rect x="${x + 14}" y="${y + 74 + i * 70}" width="${pw - 28}" height="56" rx="12" fill="#ffffff" stroke="#e2e8f0"/></g>
        ${K.place(K.icon[bl[1]](t.brand), x + 26, y + 86 + i * 70, 30)}${txt(x + 66, y + 108 + i * 70, bl[0], 16, 700)}`).join("")}
      ${K.emailUI(x + pw + 20, y + 74, w - pw - 40, h - 94, t, { heroH: 150, copy, r: 12 })}
      <rect x="${x + pw + 20}" y="${y + 74}" width="${w - pw - 40}" height="${150 * (w - pw - 40) / 400 + 40}" rx="12" fill="none" stroke="${t.brand}" stroke-width="4" stroke-dasharray="10 8"/>`);
}

// Outlook window showing an email, broken or fixed
function outlookWindow(x, y, w, h, t, copy, broken) {
    const inner = broken
        ? `<g transform="rotate(4 ${x + w / 2} ${y + h / 2})">${K.emailUI(x + 20, y + 70, w - 40, h - 70, t, { heroH: 150, copy, r: 8 })}</g>
           <rect x="${x + 40}" y="${y + 250}" width="${w * 0.5}" height="60" fill="#ffffff"/><rect x="${x + w * 0.45}" y="${y + 330}" width="${w * 0.45}" height="90" fill="#fee2e2" opacity="0.9"/>`
        : K.emailUI(x + 20, y + 70, w - 40, h - 70, t, { heroH: 150, copy, r: 8 });
    return K.card(x, y, w, h, V.clip(x, y, w, h, 22, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff"/>
      <rect x="${x}" y="${y}" width="${w}" height="54" fill="#0f6cbd"/><g transform="translate(${x + 14} ${y + 10}) scale(${34 / 48})">${K.brandMark("outlook")}</g>
      ${txt(x + 60, y + 35, "Outlook", 18, 700, "#ffffff")}${broken ? "" : ""}
      ${inner}`), { r: 22 });
}

// Stacked module cards (HubSpot modules / newsletter blocks)
function modules(x, y, t, items) {
    return items.map((m, i) => K.card(x + (i % 2) * 30, y + i * 108, 330, 88, `
      <rect x="${x + (i % 2) * 30 + 18}" y="${y + i * 108 + 16}" width="56" height="56" rx="14" fill="${m.bg}"/>${K.place(K.icon[m.icon](m.color), x + (i % 2) * 30 + 28, y + i * 108 + 26, 36)}
      ${txt(x + (i % 2) * 30 + 90, y + i * 108 + 42, m.title, 21, 800)}${txt(x + (i % 2) * 30 + 90, y + i * 108 + 66, m.sub, 15, 600, "#64748b")}`, { r: 22 })).join("");
}

const T = {
    peach: theme("#fff1e6", "#fbd9c4", "#9a7b5c", "#f97316", "#f97316", "#fb7185", { shadow: "#7c2d12" }),
    rose: theme("#fff1f2", "#fbd5d8", "#a16262", "#ea4335", "#ef4444", "#f97316", { shadow: "#7f1d1d" }),
    blue: theme("#e6f0ff", "#cfe0f7", "#3b6f8f", "#0f6cbd", "#1d4ed8", "#38bdf8", { shadow: "#1e3a8a" }),
    mint: theme("#e9f8ef", "#cdeedb", "#3f7d5c", "#16a34a", "#16a34a", "#2dd4bf", { shadow: "#14532d" }),
    amber: theme("#fff8e6", "#fbe7b8", "#9a7b3c", "#d97706", "#f59e0b", "#f97316", { shadow: "#78350f" }),
    lilac: theme("#f1edff", "#ddd5fb", "#6d5b9a", "#7c3aed", "#8b5cf6", "#ec4899", { shadow: "#4c1d95" }),
    teal: theme("#e6f7f6", "#c9ebe8", "#3b7f78", "#0d9488", "#0d9488", "#22d3ee", { shadow: "#134e4a" }),
    yellow: theme("#fffbe6", "#fbeeb0", "#8c7d3c", "#241c15", "#facc15", "#fb923c", { shadow: "#713f12" }),
    coral: theme("#fff1ec", "#fcd8cb", "#a0634f", "#ff5c35", "#ff7a59", "#f59e0b", { shadow: "#7c2d12" }),
    sky: theme("#e8f7fd", "#cbe9f6", "#3d7d95", "#0284c7", "#0ea5e9", "#6366f1", { shadow: "#0c4a6e" }),
    green: theme("#eef8e8", "#d6ecc6", "#557a3f", "#5a8f2e", "#7ab55c", "#16a34a", { shadow: "#365314" }),
    slate: theme("#eef1f6", "#d9dfea", "#566276", "#334155", "#475569", "#f97316", { shadow: "#0f172a" }),
    pink: theme("#fff0f7", "#fbd3e6", "#9a5c7c", "#db2777", "#ec4899", "#f97316", { shadow: "#831843" }),
};

const SIG = (t) => (x, y, w, h) => V.mailWithSignature(x, y, w, h, t, person);
const SIG_OL = (t) => (x, y, w, h) => V.mailWithSignature(x, y, w, h, t, person, { outlook: true });

module.exports = {
    /* ── HTML email signatures ── */
    "html-email-signature-design": {
        theme: T.peach,
        copy: null,
        hero: (t) => V.hero(t, {
            context: (t) => K.card(70, 110, 450, 250, `${txt(96, 150, "One signature, whole team", 19, 800)}
              ${["Sales", "Support", "Founder"].map((r, i) => `<circle cx="112" cy="${190 + i * 52}" r="18" fill="url(#hero)"/>${bar(142, 180 + i * 52, 150, 10, "#334155")}${txt(142, 210 + i * 52, r, 14, 600, "#64748b")}${K.place(K.icon.check("#16a34a"), 460, 176 + i * 52, 28)}`).join("")}`),
            laptop: SIG(t), phone: false,
            rowTitle: "Works in every inbox", row: ["gmail", "outlook", "apple", "yahoo"],
            pills: ["Clickable links", "Retina-sharp images"],
        }),
        intro: (t) => V.concept(t, (t) => K.card(70, 170, 860, 660, V.mailWithSignature(70, 170, 860, 660, t, person, { r: 26 }), { r: 26 }) + bigPill(100, 70, "On-brand and clickable", t, t.brand) + K.brandTile(840, 60, 110, "gmail", { check: true }) + K.brandTile(840, 880 - 60, 110, "outlook", { check: true })),
        phone: (t) => S.floatPhone(t, null, { draw: SIG(t) }),
        offer: (t) => S.offerCard(t, null, [{ icon: "link", color: "#f97316", text: "Clickable" }, { brand: "outlook", text: "Outlook-safe" }, { brand: "gmail", text: "Gmail-ready" }], SIG(t)),
    },
    "gmail-email-signature": {
        theme: T.rose,
        hero: (t) => V.hero(t, {
            context: (t) => K.card(70, 110, 450, 250, `${txt(96, 150, "Gmail › Settings › Signature", 18, 800)}
              <rect x="96" y="172" width="398" height="150" rx="14" fill="#f8fafc" stroke="#e2e8f0"/>
              ${V.signature(110, 184, 370, t, person)}`),
            laptop: SIG(t), phone: false,
            rowTitle: "Gmail and Workspace ready", row: ["gmail", "google", "apple", "outlook"],
            pills: ["Gmail-safe code", "Hosted, sharp images"],
        }),
        intro: (t) => V.concept(t, (t) => K.card(70, 190, 860, 640, V.mailWithSignature(70, 190, 860, 640, t, person, { r: 26 }), { r: 26 }) + bigPill(100, 80, "Survives Gmail's editor", t, "#ea4335") + K.brandTile(830, 60, 120, "gmail", { check: true })),
        phone: (t) => S.floatPhone(t, null, { draw: SIG(t) }),
        offer: (t) => S.offerCard(t, null, [{ brand: "gmail", text: "Gmail-safe" }, { brand: "google", text: "Workspace" }, { icon: "link", color: "#ea4335", text: "Clickable" }], SIG(t)),
    },
    "outlook-email-signature": {
        theme: T.blue,
        hero: (t) => V.hero(t, {
            context: (t) => K.card(70, 110, 450, 250, `${txt(96, 150, "Every Outlook version", 19, 800)}
              ${["Classic Outlook (Windows)", "New Outlook", "Outlook on the web", "Outlook for Mac"].map((r, i) => `${K.place(K.icon.check("#16a34a"), 96, 168 + i * 44, 28)}${txt(136, 190 + i * 44, r, 17, 600, "#334155")}`).join("")}`),
            laptop: SIG_OL(t), phone: false,
            rowTitle: "Tested in", row: ["outlook", "gmail", "apple", "yahoo"],
            pills: ["Outlook-safe tables", "Microsoft 365 rollout"],
        }),
        intro: (t) => V.concept(t, (t) => K.card(70, 190, 860, 640, V.mailWithSignature(70, 190, 860, 640, t, person, { outlook: true, r: 26 }), { r: 26 }) + bigPill(100, 80, "Coded for every Outlook", t, "#0f6cbd") + K.brandTile(830, 60, 120, "outlook", { check: true })),
        phone: (t) => S.floatPhone(t, null, { draw: SIG_OL(t) }),
        offer: (t) => S.offerCard(t, null, [{ brand: "outlook", text: "Every version" }, { icon: "shield", color: "#0f6cbd", text: "Fixed-size images" }, { icon: "user", color: "#0f6cbd", text: "Team rollout" }], SIG_OL(t)),
    },

    /* ── Klaviyo ── */
    "klaviyo-flow-setup": {
        theme: T.mint,
        copy: { eyebrow: "YOU LEFT THIS BEHIND", title: "Still thinking?", sub: "Your cart is saved for 24 hours", cta: "Finish order" },
        hero: (t) => V.hero(t, {
            copy: T.mint && { eyebrow: "YOU LEFT THIS BEHIND", title: "Still thinking?", sub: "Your cart is saved for 24 hours", cta: "Finish order" },
            context: (t) => K.card(70, 110, 450, 260, `${txt(96, 150, "Abandoned cart flow", 19, 800)}
              ${[["Started checkout", "bolt", "#f59e0b"], ["Wait 4 hours", "sun", "#16a34a"], ["Send reminder email", "envelope", "#16a34a"]].map(([l, ic, c], i) => `<rect x="96" y="${170 + i * 62}" width="46" height="46" rx="12" fill="#f0fdf4"/>${K.place(K.icon[ic](c), 104, 178 + i * 62, 30)}${txt(158, 200 + i * 62, l, 18, 700, "#334155")}`).join("")}`),
            rowTitle: "Connected to your store", row: ["klaviyo", "shopify", "gmail", "apple"], rowCheck: false,
            pills: ["Welcome to win-back", "Dynamic product blocks"],
        }),
        intro: (t) => V.concept(t, (t) => V.flow(330, 170, t, [
            { label: "Started checkout", sub: "Trigger", icon: "bolt", color: "#f59e0b", bg: "#fef3c7" },
            { kind: "delay", label: "4 hours" },
            { label: "Reminder email", sub: "Your cart is waiting", icon: "envelope", color: "#16a34a", bg: "#dcfce7" },
            { kind: "delay", label: "1 day" },
            { label: "Reassurance email", sub: "Reviews and returns", icon: "envelope", color: "#16a34a", bg: "#dcfce7" },
            { kind: "delay", label: "2 days" },
        ]) + bigPill(90, 60, "Sells while you sleep", t, "#16a34a") + K.brandTile(90, 400, 120, "klaviyo") + K.brandTile(90, 560, 120, "shopify")),
        phone: (t, copy) => S.floatPhone(t, copy),
        offer: (t, copy) => S.offerCard(t, copy, [{ brand: "klaviyo", text: "Core flows" }, { icon: "bolt", color: "#f59e0b", text: "Smart triggers" }, { icon: "grid", color: "#16a34a", text: "Product blocks" }]),
    },
    "klaviyo-email-templates": {
        theme: T.teal,
        copy: { eyebrow: "NEW IN", title: "The Linen Edit", sub: "Light layers for warm days", cta: "Shop now" },
        hero: (t) => V.hero(t, {
            copy: { eyebrow: "NEW IN", title: "The Linen Edit", sub: "Light layers for warm days", cta: "Shop now" },
            context: (t) => K.card(70, 110, 450, 260, `${txt(96, 150, "Editable blocks", 19, 800)}
              ${[["Text", "code"], ["Image", "grid"], ["Product feed", "grid"], ["Button", "link"]].map(([l, ic], i) => `<rect x="${96 + (i % 2) * 206}" y="${172 + Math.floor(i / 2) * 84}" width="192" height="66" rx="14" fill="#f0fdfa" stroke="#99f6e4"/>${K.place(K.icon[ic]("#0d9488"), 110 + (i % 2) * 206, 190 + Math.floor(i / 2) * 84, 30)}${txt(150 + (i % 2) * 206, 212 + Math.floor(i / 2) * 84, l, 17, 700)}`).join("")}`),
            rowTitle: "Built for Klaviyo", row: ["klaviyo", "shopify", "gmail", "outlook"],
            pills: ["Drag-and-drop editable", "Campaign and flow ready"],
        }),
        intro: (t, copy) => V.concept(t, (t) => K.card(70, 170, 860, 700, editor(70, 170, 860, 700, t, copy, "klaviyo", [["Text", "code"], ["Image", "grid"], ["Products", "grid"], ["Button", "link"], ["Social", "user"]]), { r: 22 }) + bigPill(90, 64, "Editable in Klaviyo", t, "#0d9488")),
        phone: (t, copy) => S.floatPhone(t, copy),
        offer: (t, copy) => S.offerCard(t, copy, [{ brand: "klaviyo", text: "Editable blocks" }, { icon: "grid", color: "#0d9488", text: "Product feeds" }, { brand: "outlook", text: "Outlook-safe" }]),
    },
    "klaviyo-campaign-management": {
        theme: T.amber,
        copy: { eyebrow: "BLACK FRIDAY", title: "40% Off Everything", sub: "This weekend only", cta: "Shop the sale" },
        hero: (t) => V.hero(t, {
            copy: { eyebrow: "BLACK FRIDAY", title: "40% Off Everything", sub: "This weekend only", cta: "Shop the sale" },
            context: (t) => K.card(70, 110, 450, 260, `${txt(96, 150, "This month's campaigns", 19, 800)}
              ${[["Mon", "New arrivals", "#f59e0b"], ["Thu", "A/B subject test", "#8b5cf6"], ["Fri", "Black Friday sale", "#ef4444"]].map(([d, l, c], i) => `<rect x="96" y="${170 + i * 60}" width="60" height="46" rx="12" fill="${c}"/>${txt(126, 200 + i * 60, d, 16, 800, "#ffffff", "middle")}${txt(174, 200 + i * 60, l, 18, 700, "#334155")}`).join("")}`),
            rowTitle: "Sent from", row: ["klaviyo", "mailchimp", "gmail", "outlook"], rowCheck: false,
            pills: ["Planned and designed", "Segmented and tested"],
        }),
        intro: (t) => V.concept(t, (t) => V.calendar(80, 180, 840, t, [{ r: 0, c: 1, span: 2, color: "#f59e0b", label: "New arrivals" }, { r: 1, c: 3, span: 2, color: "#8b5cf6", label: "A/B test" }, { r: 3, c: 4, span: 3, color: "#ef4444", label: "Black Friday" }, { r: 2, c: 0, span: 2, color: "#0d9488", label: "Newsletter" }]) + bigPill(90, 70, "Planned, built and sent for you", t, "#d97706")),
        phone: (t, copy) => S.floatPhone(t, copy),
        offer: (t, copy) => S.offerCard(t, copy, [{ icon: "grid", color: "#d97706", text: "Content calendar" }, { icon: "user", color: "#8b5cf6", text: "Segmentation" }, { icon: "chart", color: "#16a34a", text: "Reports" }]),
    },

    /* ── Design to code ── */
    "figma-to-html-email": {
        theme: T.lilac,
        copy: { eyebrow: "OPEN HOUSE", title: "Your Dream Home", sub: "Tour this Saturday, 10am", cta: "Book a visit" },
        hero: (t) => V.hero(t, {
            copy: { eyebrow: "OPEN HOUSE", title: "Your Dream Home", sub: "Tour this Saturday, 10am", cta: "Book a visit" },
            context: (t) => K.card(70, 110, 450, 280, V.figmaCanvas(70, 110, 450, 280, t), { r: 18 }),
            rowTitle: "Coded exactly as approved", row: ["figma", "html5", "css", "outlook"],
            column: { title: "Ready for", tiles: ["klaviyo", "mailchimp", "hubspot", "brevo"] },
            pills: ["Pixel-perfect", "Mobile layout included"],
        }),
        intro: (t, copy) => V.concept(t, (t) => `<g transform="rotate(-4 260 560)">${K.card(50, 250, 420, 560, V.figmaCanvas(50, 250, 420, 560, t), { r: 18 })}</g>`
            + `<path d="M430 520 C 480 470, 510 470, 540 490" fill="none" stroke="${t.brand}" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 14"/><path d="M526 470 L 548 494 L 518 504" fill="none" stroke="${t.brand}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`
            + K.card(520, 170, 420, 740, V.clip(520, 170, 420, 740, 26, K.emailUI(520, 170, 420, 740, t, { heroH: 160, copy, r: 26 })), { r: 26 })
            + bigPill(60, 150, "Your Figma design", t, "#a259ff") + bigPill(560, 80, "Coded HTML email", t, "#16a34a")),
        phone: (t, copy) => S.floatPhone(t, copy),
        offer: (t, copy) => S.offerCard(t, copy, [{ brand: "figma", text: "Any design file" }, { icon: "grid", color: "#7c3aed", text: "Pixel-perfect" }, { icon: "phone", color: "#7c3aed", text: "Mobile layout" }]),
    },

    /* ── Outlook fixes ── */
    "outlook-email-rendering-fix": {
        theme: T.blue,
        copy: { eyebrow: "WEEKLY DIGEST", title: "This Week's Picks", sub: "5 stories worth your time", cta: "Read more" },
        hero: (t) => V.hero(t, {
            copy: { eyebrow: "WEEKLY DIGEST", title: "This Week's Picks", sub: "5 stories worth your time", cta: "Read more" },
            context: (t) => smallCode(t, "outlook-fix.html", [
                [0, ["com", "<!-- Outlook-only fix -->"]],
                [0, ["com", "<!--[if mso]>"]],
                [1, ["tag", "<v:roundrect "], ["attr", "arcsize="], ["val", '"12%"'], ["tag", ">"]],
                [2, ["txt", "Read more"]],
                [1, ["tag", "</v:roundrect>"]],
                [0, ["com", "<![endif]-->"]],
                [0, ["tag", "<td "], ["attr", "style="], ["val", '"mso-line-height-rule:exactly"'], ["tag", ">"]],
            ]),
            rowTitle: "Tested in 50+ clients", row: ["outlook", "gmail", "apple", "yahoo"],
            pills: ["Outlook-safe fixes", "Dark mode repairs"],
        }),
        intro: (t, copy) => V.concept(t, (t) => `<g opacity="0.95">${outlookWindow(50, 250, 420, 600, t, copy, true)}</g>` + K.place(K.icon.cross("#ef4444"), 410, 220, 70)
            + outlookWindow(520, 170, 430, 720, t, copy, false) + K.place(K.icon.check("#16a34a"), 900, 140, 76)
            + bigPill(50, 150, "Broken in Outlook", t, "#ef4444") + bigPill(560, 70, "Fixed for good", t, "#16a34a")),
        phone: (t, copy) => S.floatPhone(t, copy, { dark: true }),
        offer: (t, copy) => S.offerCard(t, copy, [{ brand: "outlook", text: "Every Outlook" }, { icon: "moon", color: "#0f172a", text: "Dark mode" }, { icon: "check", color: "#16a34a", text: "50+ clients" }]),
    },

    /* ── ESP templates ── */
    "mailchimp-email-templates": {
        theme: T.yellow,
        copy: { eyebrow: "THE WEEKLY BREW", title: "Fresh Roasts Are In", sub: "Three new single origins", cta: "Order now" },
        hero: (t) => V.hero(t, {
            copy: { eyebrow: "THE WEEKLY BREW", title: "Fresh Roasts Are In", sub: "Three new single origins", cta: "Order now" },
            context: (t) => smallCode(t, "mailchimp.html", [
                [0, ["tag", "<td "], ["attr", "mc:edit="], ["val", '"headline"'], ["tag", ">"]],
                [1, ["txt", "Fresh Roasts Are In"]],
                [0, ["tag", "</td>"]],
                [0, ["tag", "<tr "], ["attr", "mc:repeatable="], ["val", '"product"'], ["tag", ">"]],
                [0, ["tag", "<p>"], ["txt", "Hi *|FNAME|*,"], ["tag", "</p>"]],
                [0, ["tag", "<a "], ["attr", "href="], ["val", '"*|UNSUB|*"'], ["tag", ">"], ["txt", "Unsubscribe"], ["tag", "</a>"]],
            ]),
            rowTitle: "Built for Mailchimp", row: ["mailchimp", "gmail", "outlook", "apple"],
            pills: ["Editable regions", "Merge tags ready"],
        }),
        intro: (t, copy) => V.concept(t, (t) => K.card(70, 170, 860, 700, editor(70, 170, 860, 700, t, copy, "mailchimp", [["Headline", "code"], ["Image", "grid"], ["Product", "grid"], ["Button", "link"], ["Footer", "envelope"]]), { r: 22 }) + bigPill(90, 64, "Easy editing in Mailchimp", t, "#facc15")),
        phone: (t, copy) => S.floatPhone(t, copy),
        offer: (t, copy) => S.offerCard(t, copy, [{ brand: "mailchimp", text: "mc:edit regions" }, { icon: "grid", color: "#d97706", text: "Repeatable" }, { icon: "user", color: "#d97706", text: "Merge tags" }]),
    },
    "hubspot-email-templates": {
        theme: T.coral,
        copy: { eyebrow: "PRODUCT UPDATE", title: "Meet Smart Reports", sub: "Your data, explained in seconds", cta: "Try it free" },
        hero: (t) => V.hero(t, {
            copy: { eyebrow: "PRODUCT UPDATE", title: "Meet Smart Reports", sub: "Your data, explained in seconds", cta: "Try it free" },
            context: (t) => smallCode(t, "hero.module", [
                [0, ["com", "{# Reusable HubL module #}"]],
                [0, ["tag", "{% "], ["attr", "module "], ["val", '"hero"'], ["tag", " %}"]],
                [0, ["tag", "<h1>"], ["txt", "{{ module.headline }}"], ["tag", "</h1>"]],
                [0, ["tag", "<p>"], ["txt", "Hi {{ contact.firstname }}"], ["tag", "</p>"]],
                [0, ["tag", "<a "], ["attr", "href="], ["val", '"{{ module.url }}"'], ["tag", ">"]],
                [0, ["tag", "{% endmodule %}"]],
            ]),
            rowTitle: "Built for HubSpot", row: ["hubspot", "gmail", "outlook", "apple"],
            pills: ["Reusable HubL modules", "Brand-locked styling"],
        }),
        intro: (t, copy) => V.concept(t, (t) => modules(60, 250, t, [
            { title: "Hero module", sub: "Headline, image, button", icon: "grid", color: "#ff5c35", bg: "#ffedd5" },
            { title: "Feature row", sub: "Icon and text blocks", icon: "bolt", color: "#ff5c35", bg: "#ffedd5" },
            { title: "Testimonial", sub: "Quote and photo", icon: "user", color: "#ff5c35", bg: "#ffedd5" },
            { title: "CTA module", sub: "Brand-locked button", icon: "link", color: "#ff5c35", bg: "#ffedd5" },
        ]) + K.card(470, 170, 470, 740, V.clip(470, 170, 470, 740, 26, K.emailUI(470, 170, 470, 740, t, { heroH: 160, copy, r: 26 })), { r: 26 })
            + bigPill(60, 150, "Module library", t, "#ff5c35") + K.brandTile(840, 60, 110, "hubspot")),
        phone: (t, copy) => S.floatPhone(t, copy),
        offer: (t, copy) => S.offerCard(t, copy, [{ brand: "hubspot", text: "HubL modules" }, { icon: "shield", color: "#ff5c35", text: "Brand-locked" }, { icon: "user", color: "#ff5c35", text: "Personalised" }]),
    },
    "newsletter-email-templates": {
        theme: T.sky,
        copy: { eyebrow: "ISSUE #48", title: "The Monday Brief", sub: "Five stories, five minutes", cta: "Read the issue" },
        hero: (t) => V.hero(t, {
            copy: { eyebrow: "ISSUE #48", title: "The Monday Brief", sub: "Five stories, five minutes", cta: "Read the issue" },
            context: (t) => K.card(70, 110, 450, 260, `${txt(96, 150, "Reusable blocks", 19, 800)}
              ${[["Featured story", "#0ea5e9"], ["Article row", "#6366f1"], ["Event", "#f59e0b"], ["Sponsor", "#16a34a"]].map(([l, c], i) => `<rect x="${96 + (i % 2) * 206}" y="${172 + Math.floor(i / 2) * 84}" width="192" height="66" rx="14" fill="${c}" opacity="0.14"/><rect x="${108 + (i % 2) * 206}" y="${190 + Math.floor(i / 2) * 84}" width="30" height="30" rx="8" fill="${c}"/>${txt(150 + (i % 2) * 206, 212 + Math.floor(i / 2) * 84, l, 17, 700)}`).join("")}`),
            rowTitle: "Easy to read everywhere", row: ["gmail", "outlook", "apple", "yahoo"],
            pills: ["Modular blocks", "Every issue in minutes"],
        }),
        intro: (t, copy) => V.concept(t, (t) => K.card(460, 170, 480, 740, V.clip(460, 170, 480, 740, 26, K.emailUI(460, 170, 480, 740, t, { heroH: 160, copy, r: 26 })), { r: 26 }) + modules(60, 250, t, [
            { title: "Featured story", sub: "Lead article", icon: "grid", color: "#0ea5e9", bg: "#e0f2fe" },
            { title: "Article rows", sub: "Image and summary", icon: "code", color: "#6366f1", bg: "#e0e7ff" },
            { title: "Event block", sub: "Date and RSVP", icon: "sun", color: "#f59e0b", bg: "#fef3c7" },
            { title: "Sponsor block", sub: "Partner message", icon: "link", color: "#16a34a", bg: "#dcfce7" },
        ]) + bigPill(60, 150, "Build each issue from blocks", t, "#0284c7")),
        phone: (t, copy) => S.floatPhone(t, copy),
        offer: (t, copy) => S.offerCard(t, copy, [{ icon: "grid", color: "#0284c7", text: "Block library" }, { icon: "bolt", color: "#f59e0b", text: "Lean code" }, { icon: "user", color: "#0284c7", text: "Accessible" }]),
    },
    "transactional-email-templates": {
        theme: T.mint,
        hero: (t) => V.hero(t, {
            context: (t) => K.card(70, 110, 450, 250, `${txt(96, 150, "Every order update", 19, 800)}
              ${[["Order confirmed", "#16a34a"], ["Shipped", "#0ea5e9"], ["Delivered", "#8b5cf6"]].map(([l, c], i) => `<circle cx="116" cy="${190 + i * 52}" r="16" fill="${c}"/>${K.place(K.icon.check(c), 100, 174 + i * 52, 32)}${txt(148, 197 + i * 52, l, 18, 700, "#334155")}`).join("")}`),
            laptop: (x, y, w, h) => V.receipt(x, y, w, h, t, { r: 4 }),
            phone: (x, y, w, h) => V.receipt(x, y, w, h, t, { r: 20 }),
            rowTitle: "Sent from", row: ["shopify", "gmail", "outlook", "apple"], rowCheck: false,
            pills: ["One consistent system", "Every state tested"],
        }),
        intro: (t) => V.concept(t, (t) => K.phone(330, 150, 340, t, (x, y, w, h) => V.receipt(x, y, w, h, t, { r: 40 }))
            + bigPill(40, 200, "Order confirmed", t, "#16a34a") + bigPill(700, 420, "Shipped", t, "#0ea5e9") + bigPill(40, 640, "Delivered", t, "#8b5cf6")),
        phone: (t) => S.floatPhone(t, null, { draw: (x, y, w, h) => V.receipt(x, y, w, h, t, { r: 46 }) }),
        offer: (t) => S.offerCard(t, null, [{ brand: "shopify", text: "Shopify Liquid" }, { icon: "check", color: "#16a34a", text: "Every state" }, { icon: "grid", color: "#16a34a", text: "One system" }], (x, y, w, h) => V.receipt(x, y, w, h, t, { r: 30 })),
    },

    /* ── Agencies ── */
    "white-label-email-development": {
        theme: T.slate,
        copy: { eyebrow: "CLIENT CAMPAIGN", title: "Built Under Your Brand", sub: "Delivered to your client, by you", cta: "View email" },
        hero: (t) => V.hero(t, {
            copy: { eyebrow: "CLIENT CAMPAIGN", title: "Built Under Your Brand", sub: "Delivered to your client, by you", cta: "View email" },
            context: (t) => K.card(70, 110, 450, 250, `${txt(96, 150, "Your agency's delivery", 19, 800)}
              ${[["No MailStora branding", "check", "#16a34a"], ["NDA on request", "shield", "#334155"], ["QA in 50+ clients", "check", "#16a34a"]].map(([l, ic, c], i) => `${K.place(K.icon[ic](c), 96, 172 + i * 56, 32)}${txt(142, 196 + i * 56, l, 18, 700, "#334155")}`).join("")}`),
            rowTitle: "Every platform covered", row: ["klaviyo", "mailchimp", "hubspot", "brevo"], rowCheck: false,
            pills: ["Fully white-labelled", "Scales with demand"],
        }),
        intro: (t, copy) => V.concept(t, (t) => K.card(260, 170, 480, 740, V.clip(260, 170, 480, 740, 26, K.emailUI(260, 170, 480, 740, t, { heroH: 160, copy, r: 26 })), { r: 26 })
            + K.card(60, 330, 250, 130, `${K.place(K.icon.user("#334155"), 84, 360, 64)}${txt(160, 390, "Your agency", 22, 800)}${txt(160, 418, "Client-facing", 16, 600, "#64748b")}`, { r: 24 })
            + K.card(690, 620, 260, 130, `${K.place(K.icon.shield("#16a34a"), 714, 652, 64)}${txt(790, 682, "NDA ready", 22, 800)}${txt(790, 710, "No MailStora logo", 16, 600, "#64748b")}`, { r: 24 })
            + bigPill(260, 70, "Your brand, our code", t, "#f97316")),
        phone: (t, copy) => S.floatPhone(t, copy),
        offer: (t, copy) => S.offerCard(t, copy, [{ icon: "shield", color: "#334155", text: "NDA available" }, { icon: "check", color: "#16a34a", text: "QA in 50+" }, { brand: "klaviyo", text: "Every ESP" }]),
    },

    /* ── Shopify and social ── */
    "shopify-development": {
        theme: T.green,
        copy: { eyebrow: "BACK IN STOCK", title: "Linen Overshirt", sub: "Your size is available again", cta: "Shop now" },
        hero: (t) => V.hero(t, {
            copy: { eyebrow: "BACK IN STOCK", title: "Linen Overshirt", sub: "Your size is available again", cta: "Shop now" },
            context: (t) => K.card(70, 110, 450, 250, `${txt(96, 150, "Store improvements", 19, 800)}
              ${[["Theme customisation", "palette", "#5a8f2e"], ["Speed optimisation", "bolt", "#f59e0b"], ["Klaviyo integration", "link", "#16a34a"]].map(([l, ic, c], i) => `${K.place(K.icon[ic](c), 96, 170 + i * 56, 34)}${txt(146, 196 + i * 56, l, 18, 700, "#334155")}`).join("")}`),
            laptop: (x, y, w, h) => V.storePage(x, y, w, h, t),
            rowTitle: "Store and email connected", row: ["shopify", "klaviyo", "gmail", "apple"], rowCheck: false,
            pills: ["Built to convert", "Fast product pages"],
        }),
        intro: (t, copy) => V.concept(t, (t) => K.laptop(60, 250, 560, t, (x, y, w, h) => V.storePage(x, y, w, h, t)) + K.phone(700, 330, 230, t, (x, y, w, h) => K.emailUI(x, y, w, h, t, { heroH: 140, r: 26, copy }))
            + `<path d="M610 450 C 650 400, 680 400, 700 420" fill="none" stroke="${t.brand}" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 14"/>`
            + bigPill(60, 130, "Store and email, connected", t, "#5a8f2e") + K.brandTile(820, 110, 110, "shopify") + K.brandTile(820, 780, 110, "klaviyo")),
        phone: (t, copy) => S.floatPhone(t, copy),
        offer: (t) => S.offerCard(t, null, [{ brand: "shopify", text: "Theme work" }, { icon: "bolt", color: "#f59e0b", text: "Faster pages" }, { brand: "klaviyo", text: "Klaviyo setup" }], (x, y, w, h) => V.storePage(x, y, w, h, t)),
    },
    "social-media-management": {
        theme: T.pink,
        hero: (t) => V.hero(t, {
            context: (t) => K.card(70, 110, 450, 260, `${txt(96, 150, "This month's content", 19, 800)}
              ${[["Mon", "Product carousel", "#ec4899"], ["Wed", "Story: behind the scenes", "#8b5cf6"], ["Fri", "Launch post", "#f97316"]].map(([d, l, c], i) => `<rect x="96" y="${170 + i * 60}" width="60" height="46" rx="12" fill="${c}"/>${txt(126, 200 + i * 60, d, 16, 800, "#ffffff", "middle")}${txt(174, 200 + i * 60, l, 18, 700, "#334155")}`).join("")}`),
            laptop: (x, y, w, h) => V.clip(x, y, w, h, 4, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff"/>${V.calendar(x + 10, y + 10, w - 20, t, [{ r: 0, c: 0, span: 2, color: "#ec4899", label: "Carousel" }, { r: 1, c: 2, span: 2, color: "#8b5cf6", label: "Story" }, { r: 2, c: 4, span: 2, color: "#f97316", label: "Launch" }])}`),
            phone: (x, y, w, h) => V.socialFeed(x, y, w, h, t),
            rowTitle: "Aligned with your emails", row: ["klaviyo", "mailchimp", "gmail", "apple"], rowCheck: false,
            pills: ["Monthly calendar", "Branded designs"],
        }),
        intro: (t) => V.concept(t, (t) => K.phone(560, 150, 330, t, (x, y, w, h) => V.socialFeed(x, y, w, h, t)) + V.calendar(60, 300, 460, t, [{ r: 0, c: 1, span: 2, color: "#ec4899" }, { r: 1, c: 3, span: 2, color: "#8b5cf6" }, { r: 3, c: 0, span: 3, color: "#f97316" }])
            + bigPill(60, 170, "Planned with your emails", t, "#db2777")),
        phone: (t) => S.floatPhone(t, null, { draw: (x, y, w, h) => V.socialFeed(x, y, w, h, t) }),
        offer: (t) => S.offerCard(t, null, [{ icon: "grid", color: "#db2777", text: "Content calendar" }, { icon: "palette", color: "#db2777", text: "Branded posts" }, { icon: "chart", color: "#16a34a", text: "Monthly report" }], (x, y, w, h) => V.socialFeed(x, y, w, h, t)),
    },
};
