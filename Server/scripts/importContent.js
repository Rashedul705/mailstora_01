// Load the website content from seeds/content/*.json into the database in MONGODB_URI.
// Run once on a new database:   npm run content:import
// Existing documents with the same _id are replaced; nothing else is deleted.
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { MongoClient, BSON } = require('mongodb');
const { EJSON } = BSON;

(async () => {
    if (!process.env.MONGODB_URI) throw new Error('Set MONGODB_URI in Server/.env first.');
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const dir = path.join(__dirname, '..', 'seeds', 'content');
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
        const name = file.replace(/\.json$/, '');
        const docs = EJSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'), { relaxed: false });
        if (!docs.length) continue;
        const ops = docs.map((d) => ({ replaceOne: { filter: { _id: d._id }, replacement: d, upsert: true } }));
        const r = await db.collection(name).bulkWrite(ops);
        console.log(`${name}: ${docs.length} (${r.upsertedCount} new, ${r.modifiedCount} updated)`);
    }
    await client.close();
    console.log('Done. Create the admin login with: npm run seed (set ADMIN_PASSWORD first).');
})().catch((e) => { console.error(e); process.exit(1); });
