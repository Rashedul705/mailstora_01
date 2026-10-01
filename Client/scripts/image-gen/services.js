// Contextual section images for each service page.
// Each entry: theme + copy + an intro scene that illustrates that page's intro section.
const K = require("./kit");
const S = require("./sections");

// Extra icons used in the scenes (48 x 48 box)
Object.assign(K.icon, {
    bolt: (c) => `<path d="M27 3L9 27h13l-3 18 18-25H24z" fill="${c}"/>`,
    palette: (c) => `<path d="M24 5C13 5 5 13 5 23c0 9 7 15 14 15 3 0 4-2 4-4 0-3 2-4 5-4h5c6 0 10-4 10-10C43 11 35 5 24 5z" fill="${c}"/><circle cx="15" cy="21" r="3.2" fill="#fff"/><circle cx="22" cy="13" r="3.2" fill="#fff"/><circle cx="31" cy="14" r="3.2" fill="#fff"/><circle cx="36" cy="22" r="3.2" fill="#fff"/>`,
    grid: (c) => `<rect x="6" y="6" width="15" height="15" rx="3" fill="${c}"/><rect x="27" y="6" width="15" height="15" rx="3" fill="${c}" opacity="0.6"/><rect x="6" y="27" width="15" height="15" rx="3" fill="${c}" opacity="0.6"/><rect x="27" y="27" width="15" height="15" rx="3" fill="${c}"/>`,
});

const GREY = { bg1: "#fff", bg2: "#fff", plant: "#999", shadow: "#334155", brand: "#94a3b8", hero1: "#cbd5e1", hero2: "#94a3b8", product: "#e2e8f0", productAlt: ["#e2e8f0", "#cbd5e1", "#e2e8f0"], plants: [], bokeh: [] };

/** Two emails side by side: a generic "before" and the branded "after", with labels and an arrow. */
function beforeAfter(t, { before, after, copy }) {
    const W = 1000, H = 1000;
    let b = "";
    // before: generic builder email, greyed out and tilted back
    b += `<g transform="rotate(-5 250 600)" opacity="0.95">${K.card(60, 300, 360, 600, "", { r: 24 })}<clipPath id="baL"><rect x="60" y="300" width="360" height="600" rx="24"/></clipPath><g clip-path="url(#baL)" filter="url(#gray)">${K.emailUI(60, 300, 360, 600, GREY, { heroH: 140, r: 24 })}</g></g>`;
    b += K.pill(50, 196, before.label, t, { big: true, dot: "#ef4444", w: before.w });
    b += K.place(K.icon.cross("#ef4444"), 356, 258, 64);
    // after: the branded email, larger and in front
    b += K.card(460, 150, 470, 790, "", { r: 28 });
    b += `<clipPath id="baR"><rect x="460" y="150" width="470" height="790" rx="28"/></clipPath><g clip-path="url(#baR)">${K.emailUI(460, 150, 470, 790, t, { heroH: 165, r: 28, copy })}</g>`;
    b += K.pill(470, 50, after.label, t, { big: true, dot: "#16a34a", w: after.w });
    b += K.place(K.icon.check("#16a34a"), 880, 112, 72);
    return K.svgDoc(W, H, t, b);
}

const SERVICES = {
    "html-email-template-development": {
        theme: {
            bg1: "#fff1e6", bg2: "#fbd9c4", plant: "#9a7b5c", shadow: "#7c2d12", brand: "#f97316",
            hero1: "#f97316", hero2: "#fb7185", product: "#fef3c7", productAlt: ["#fdba74", "#93c5fd", "#86efac"],
            plants: [[70, 330, 1.25], [960, 250, 1.1], [900, 820, 0.8]], bokeh: [[260, 110, 34], [700, 70, 26], [120, 760, 20]],
        },
        copy: { eyebrow: "SUMMER DROP", title: "Up to 40% Off", sub: "New arrivals, free shipping", cta: "Shop now" },
        intro: (t, copy) => beforeAfter(t, {
            copy,
            before: { label: "Builder template", w: 300 },
            after: { label: "Your custom email", w: 330 },
        }),
        phone: (t, copy) => S.floatPhone(t, copy, { dark: true, badge: { text: "Dark mode ready", dot: "#0f172a", w: 200 } }),
        offer: (t, copy) => S.offerCard(t, copy, [
            { icon: "code", color: "#f97316", text: "Hand-coded" },
            { brand: "outlook", text: "Outlook-safe" },
            { brand: "klaviyo", text: "ESP-ready" },
        ]),
    },
};

module.exports = { SERVICES };
