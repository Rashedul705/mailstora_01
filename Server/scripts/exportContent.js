// Export website content (not customer data) to seeds/content/*.json.
// Usage: node scripts/exportContent.js            (uses MONGODB_URI from .env)
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { MongoClient, BSON } = require('mongodb');
const { EJSON } = BSON;

// Site content only. Customer, order, lead, login and log collections are never exported.
const CONTENT = [
    'posts', 'portfolioItems', 'caseStudies', 'testimonials', 'faqs', 'services', 'trustlogos', 'partners',
    'pricings', 'pricingpackages', 'pricingsettings', 'herosections', 'websitecontents',
    'sitesettings', 'seoentries', 'redirects', 'pageedits', 'schedulesettings', 'emailtemplateimages',
];

(async () => {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const dir = path.join(__dirname, '..', 'seeds', 'content');
    fs.mkdirSync(dir, { recursive: true });
    for (const name of CONTENT) {
        const docs = await db.collection(name).find().toArray();
        fs.writeFileSync(path.join(dir, `${name}.json`), EJSON.stringify(docs, null, 2, { relaxed: false }));
        console.log(`${name}: ${docs.length}`);
    }
    await client.close();
})().catch((e) => { console.error(e); process.exit(1); });
