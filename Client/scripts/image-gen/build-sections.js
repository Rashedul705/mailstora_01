// Renders section images for service pages to /images/media/generated/<slug>-<section>.webp
// Usage: node scripts/image-gen/build-sections.js [slug]
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { SERVICES: BASE } = require("./services"); // also registers extra icons
const SERVICES = { ...BASE, ...require("./services-all"), ...require("./services-growth") };

const OUT = path.join(__dirname, "..", "..", "public", "images", "media", "generated");
fs.mkdirSync(OUT, { recursive: true });

(async () => {
    const only = process.argv[2];
    for (const [slug, s] of Object.entries(SERVICES)) {
        if (only && !only.split(",").includes(slug)) continue;
        for (const [section, width] of [["hero", 1000], ["intro", 1000], ["phone", 600], ["offer", 600]]) {
            if (!s[section]) continue;
            const svg = s[section](s.theme, s.copy);
            const file = path.join(OUT, `${slug}-${section}.webp`);
            await sharp(Buffer.from(svg), { density: 144 }).resize({ width }).webp({ quality: 86 }).toFile(file);
            console.log(`${slug}-${section}.webp`, Math.round(fs.statSync(file).size / 1024) + " KB");
        }
    }
})();
