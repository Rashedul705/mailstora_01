const mongoose = require('mongoose');

// Per-URL SEO overrides. `path` is the site path, e.g. "/pricing/" or "/blog/my-post/".
const seoEntrySchema = new mongoose.Schema({
    path: { type: String, required: true, unique: true, trim: true },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' }, // comma separated meta keywords
    focusKeyword: { type: String, default: '' },
    canonical: { type: String, default: '' },
    noindex: { type: Boolean, default: false },
    nofollow: { type: Boolean, default: false },
    noarchive: { type: Boolean, default: false },
    nosnippet: { type: Boolean, default: false },
    noimageindex: { type: Boolean, default: false },
    twitterTitle: { type: String, default: '' },
    twitterDescription: { type: String, default: '' },
    ogTitle: { type: String, default: '' },
    ogDescription: { type: String, default: '' },
    ogImage: { type: String, default: '' },
    schema: { type: String, default: '' }, // custom JSON-LD, stored as text
}, { timestamps: true });

// URL redirects managed from the admin (applied by the site's middleware)
const redirectSchema = new mongoose.Schema({
    source: { type: String, required: true, unique: true, trim: true }, // "/old-page/"
    target: { type: String, default: '' }, // "/new-page/" or full URL; empty for 410
    type: { type: Number, enum: [301, 302, 307, 308, 410], default: 301 },
    active: { type: Boolean, default: true },
    hits: { type: Number, default: 0 },
    lastHit: { type: Date },
    note: { type: String, default: '' },
}, { timestamps: true });

// Pages visitors requested that do not exist
const notFoundSchema = new mongoose.Schema({
    path: { type: String, required: true, unique: true },
    hits: { type: Number, default: 1 },
    referrer: { type: String, default: '' },
    lastSeen: { type: Date, default: Date.now },
    ignored: { type: Boolean, default: false },
}, { timestamps: true });

// One site-wide SEO audit run (from Admin › SEO › Pages & Posts)
const auditRunSchema = new mongoose.Schema({
    average: Number,
    pages: Number,
    issues: Number,
    results: [{ _id: false, path: String, score: Number, issues: Number, words: Number }],
    user: String,
}, { timestamps: true });
auditRunSchema.index({ createdAt: -1 });
const AuditRun = mongoose.models.AuditRun || mongoose.model('AuditRun', auditRunSchema);

module.exports = {
    SeoEntry: mongoose.models.SeoEntry || mongoose.model('SeoEntry', seoEntrySchema),
    Redirect: mongoose.models.Redirect || mongoose.model('Redirect', redirectSchema),
    NotFound: mongoose.models.NotFound || mongoose.model('NotFound', notFoundSchema),
    AuditRun,
};
