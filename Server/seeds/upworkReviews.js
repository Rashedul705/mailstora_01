// Adds real client feedback copied from the Upwork profile (upwork.com/freelancers/rashedul705).
// The Testimonial model has no project-title or date field, so the project title goes in `role`
// and the review date is stored as `createdAt`. Safe to re-run: upserts by name + text.
// Usage (from the Server folder): node seeds/upworkReviews.js
require('dotenv').config();
const mongoose = require('mongoose');
const Testimonial = require('../src/models/Testimonial');

const reviews = [
    { name: 'Amit B.', role: 'HTML Email Signature Developer – Project-Based', date: '2026-03-23', text: 'Job well done on time and as per expectations!' },
    { name: 'Ryan H.', role: 'Email Template Responsiveness Improvement', date: '2025-09-04', text: 'Email templates were done very quickly and to a very high standard.' },
    { name: 'Newton H.', role: 'Need individual for email signatures', date: '2025-07-24', text: 'MD did an exceptional job, was able to follow all directions. Very pleased with work. Well done, look forward to working with again. Very pleased with work quality. Cheers' },
    { name: 'Rebecca S.', role: 'Instagram Account Growth', date: '2024-02-02', text: "I had a pretty good experience. He's very professional, transparent and honest. I ended up get more followers" },
    { name: 'Upwork Client', role: 'Instagram Marketing & Management', date: '2023-11-24', text: 'MD is capable, informative, responsive, hardworking, quick learning, and respectful. I have every confidence in him and his abilities. I also enjoyed working with him.' },
    { name: 'Vince L.', role: 'Instagram Expert 5K organic followers - Long-Term', date: '2021-09-13', text: 'Great job! We reached our organic growth goal of 10K+ followers. Thanks!' },
    { name: 'Tabesteph M.', role: 'Advertising contracting company over the internet', date: '2021-09-07', text: 'Responds on time, does great work, great with communication! Gets the task done as asked! Great person to work with!' },
];

(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const col = Testimonial.collection;
    for (const r of reviews) {
        await col.updateOne(
            { name: r.name, text: r.text },
            {
                $set: { role: r.role, rating: 5, platform: 'upwork', status: 'published', featured: true, createdAt: new Date(r.date), updatedAt: new Date() },
                $setOnInsert: { name: r.name, text: r.text, avatarInitials: r.name.slice(0, 2).toUpperCase(), __v: 0 },
            },
            { upsert: true }
        );
        console.log('Upserted:', r.name);
    }
    await mongoose.disconnect();
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
