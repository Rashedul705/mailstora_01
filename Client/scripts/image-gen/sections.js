// Section images for service pages: intro (square), floating phone (portrait) and offer box (portrait).
// Each service passes its own theme, copy and icons, so the images match the page's content.
const K = require("./kit");

/** Tall phone on a soft tinted card, used as the small image overlapping the intro image (600 x 900). */
function floatPhone(t, copy, opt = {}) {
    const W = 600, H = 900;
    // The phone fills the frame: this image is shown small (about 160px wide) over the intro image
    const draw = opt.draw || ((x, y, w, h) => K.emailUI(x, y, w, h, t, { heroH: 150, r: 46, copy, dark: opt.dark }));
    const b = K.phone(95, 18, 410, t, draw);
    return K.svgDoc(W, H, t, b);
}

/** Offer / package image: the email, a price tag and the package's key features (600 x 1000). */
function offerCard(t, copy, feats, draw) {
    const W = 600, H = 1000;
    let b = K.card(70, 50, 460, 820, "", { r: 30 });
    const screen = draw ? draw(70, 50, 460, 820) : K.emailUI(70, 50, 460, 820, t, { heroH: 165, copy, r: 30 });
    b += `<clipPath id="offerClip"><rect x="70" y="50" width="460" height="820" rx="30"/></clipPath><g clip-path="url(#offerClip)">${screen}</g>`;
    // three large feature chips overlapping the lower half of the email
    feats.forEach((f, i) => {
        const y = 560 + i * 118;
        const x = i % 2 ? 150 : 40;
        const w = 390;
        b += `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="96" rx="48" fill="#ffffff"/></g>
          ${f.brand ? `<g transform="translate(${x + 20} ${y + 20}) scale(${56 / 48})">${K.brandMark(f.brand)}</g>` : K.place(K.icon[f.icon](f.color), x + 20, y + 20, 56)}
          <text x="${x + 94}" y="${y + 60}" font-family="${K.FONT}" font-size="34" font-weight="800" fill="#0f172a">${f.text}</text>`;
    });
    return K.svgDoc(W, H, t, b);
}

module.exports = { floatPhone, offerCard };
