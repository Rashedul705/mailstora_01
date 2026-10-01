// Replaces post content with the expanded versions in seeds/expanded/<slug>.html.
// Safe to re-run. Usage (from the Server folder): node seeds/applyExpanded.js [slug]
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Post = require('../src/models/Post');

const DIR = path.join(__dirname, 'expanded');

(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const only = process.argv[2];
    for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.html'))) {
        const slug = file.replace(/\.html$/, '');
        if (only && slug !== only) continue;
        const content = fs.readFileSync(path.join(DIR, file), 'utf8');
        const words = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
        const r = await Post.updateOne({ slug }, { $set: { content, readingTime: Math.ceil(words / 200) } });
        console.log(`${r.matchedCount ? 'updated' : 'NOT FOUND'} ${slug}: ${words} words`);
    }
    await mongoose.disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
