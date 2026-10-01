// One-time move: copies case studies that lived inside portfolio items (portfolioItems.caseStudy)
// into the separate caseStudies collection. Safe to re-run: existing case studies (by slug) are not overwritten.
// Usage (from the Server folder): node scripts/migrateCaseStudies.js
require('dotenv').config();
const mongoose = require('mongoose');
const PortfolioItem = require('../src/models/Portfolio');
const CaseStudy = require('../src/models/CaseStudy');

(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const items = await PortfolioItem.find({ 'caseStudy.enabled': true }).lean();
    let created = 0;
    for (const p of items) {
        if (await CaseStudy.exists({ slug: p.slug })) continue;
        const { enabled, ...cs } = p.caseStudy || {};
        await CaseStudy.create({
            ...cs,
            title: p.title, slug: p.slug, clientName: p.clientName, industry: p.industry || '', type: p.type || '',
            esp: p.esp || '', year: p.year || '', coverImage: p.coverImage || '', portfolioSlug: p.slug,
            whatWasIncluded: p.whatWasIncluded || '', compatibility: p.compatibility || [], tags: p.tags || [],
            status: p.status === 'published' ? 'published' : 'draft', sortOrder: p.sortOrder || 0,
            createdAt: p.createdAt,
        });
        created++;
    }
    console.log(`Portfolio items with a case study: ${items.length}. Case studies created: ${created}.`);
    await mongoose.disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
