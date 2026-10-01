// Contact sheet per service page: hero, intro, phone and offer side by side (for review only).
// Usage: node scripts/image-gen/contact-sheet.js <outdir> [slug,slug]
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const GEN = path.join(__dirname, "..", "..", "public", "images", "media", "generated");
const [out, only] = process.argv.slice(2);

(async () => {
    const slugs = [...new Set(fs.readdirSync(GEN).filter((f) => /-(hero|intro|phone|offer)\.webp$/.test(f)).map((f) => f.replace(/-(hero|intro|phone|offer)\.webp$/, "")))]
        .filter((s) => !only || only.split(",").includes(s));
    for (const slug of slugs) {
        const H = 500;
        const parts = [];
        let x = 0;
        for (const sec of ["hero", "intro", "phone", "offer"]) {
            const f = path.join(GEN, `${slug}-${sec}.webp`);
            if (!fs.existsSync(f)) continue;
            const buf = await sharp(f).resize({ height: H }).png().toBuffer();
            const { width } = await sharp(buf).metadata();
            parts.push({ input: buf, left: x, top: 50 });
            x += width + 20;
        }
        const label = Buffer.from(`<svg width="${x}" height="50"><text x="10" y="34" font-family="Segoe UI, Arial" font-size="26" font-weight="700" fill="#0f172a">${slug}</text></svg>`);
        await sharp({ create: { width: x, height: H + 60, channels: 3, background: "#ffffff" } })
            .composite([{ input: label, left: 0, top: 0 }, ...parts])
            .png().toFile(path.join(out, `sheet-${slug}.png`));
        console.log(slug);
    }
})();
