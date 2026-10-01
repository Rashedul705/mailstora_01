const { Revision } = require('../models/Activity');
const express = require('express');
const router = express.Router();
const SiteSetting = require('../models/SiteSetting');
const { SeoEntry, Redirect, NotFound, AuditRun } = require('../models/Seo');

// Access control is handled by middleware/adminGuard.js:
// everything under /seo/admin needs a login; the rest is read by the public site.

const SETTINGS_KEY = 'seo';

const DEFAULT_SETTINGS = {
    webmaster: { google: '', bing: '', yandex: '', pinterest: '' },
    analytics: { ga4: '', gtm: '', clarity: '', metaPixel: '' },
    robots: [
        'User-agent: *',
        'Allow: /',
        'Disallow: /admin/',
        'Disallow: /api/',
        'Disallow: /Email_Template/',
        'Disallow: /Email_Template_Index/',
        '',
        'Sitemap: https://mailstora.com/sitemap.xml',
    ].join('\n'),
    titleSeparator: '|',
    // Title and description patterns for content without its own SEO fields.
    // Variables: %title% %sitename% %sep% %category% %client% %platform% %excerpt% %year%
    templates: {
        blog: { title: '%title% %sep% %sitename%', description: '%excerpt%' },
        portfolio: { title: '%title%: HTML Email Example %sep% %sitename%', description: '%title%: a custom %platform% email built by %sitename% for %client%, hand-coded and tested in 50+ email clients.' },
        caseStudy: { title: '%client% Case Study %sep% %sitename%', description: '%excerpt%' },
    },
    siteName: 'MailStora',
    defaultOgImage: '/images/media/cropped/service-html-email-templates.webp',
    twitterHandle: '',
    // Knowledge graph / site-wide schema (Organization + founder + WebSite)
    organization: {
        type: 'ProfessionalService',
        name: 'MailStora',
        url: 'https://mailstora.com/',
        logo: 'https://mailstora.com/images/brand/mailstora-logo-2026.png',
        description: 'Founder-led HTML email development agency: hand-coded, Outlook-tested HTML email templates, Klaviyo automation flows and HTML email signatures, plus SEO, AEO, GEO and performance marketing for brands and agencies.',
        email: 'rashedulmr@gmail.com',
        phone: '',
        street: '',
        city: '',
        region: '',
        postalCode: '',
        country: 'BD',
        priceRange: '$$',
        sameAs: [
            'https://www.upwork.com/freelancers/rashedul705',
            'https://www.linkedin.com/in/rislam05/',
            'https://www.facebook.com/Rashedul7050',
            'https://pro.fiverr.com/freelancers/rashedul_mr',
        ],
        founderName: 'Rashedul Islam',
        founderTitle: 'Founder & Lead Email Developer',
        founderImage: 'https://mailstora.com/images/brand/rashedul-islam-founder.webp',
        ratingValue: '4.8',
        ratingCount: '152',
    },
    indexNowKey: '',
};

async function getSettings() {
    const doc = await SiteSetting.findOne({ key: SETTINGS_KEY }).lean();
    const v = doc?.value || {};
    return {
        ...DEFAULT_SETTINGS,
        ...v,
        webmaster: { ...DEFAULT_SETTINGS.webmaster, ...(v.webmaster || {}) },
        analytics: { ...DEFAULT_SETTINGS.analytics, ...(v.analytics || {}) },
        organization: { ...DEFAULT_SETTINGS.organization, ...(v.organization || {}) },
        templates: {
            blog: { ...DEFAULT_SETTINGS.templates.blog, ...(v.templates?.blog || {}) },
            portfolio: { ...DEFAULT_SETTINGS.templates.portfolio, ...(v.templates?.portfolio || {}) },
            caseStudy: { ...DEFAULT_SETTINGS.templates.caseStudy, ...(v.templates?.caseStudy || {}) },
        },
    };
}

const normPath = (p = '') => {
    let s = String(p).trim();
    if (!s) return '';
    if (/^https?:\/\//i.test(s)) {
        try { s = new URL(s).pathname; } catch { return ''; }
    }
    if (!s.startsWith('/')) s = '/' + s;
    s = s.split('?')[0].split('#')[0];
    if (!s.endsWith('/') && !/\.[a-z0-9]+$/i.test(s)) s += '/';
    return s.toLowerCase();
};

const wrap = (fn) => (req, res) => fn(req, res).catch((e) => res.status(500).json({ error: e.message }));

/* ───────────── Public ───────────── */

router.get('/settings', wrap(async (req, res) => {
    const s = await getSettings();
    // Only what the site needs to render
    res.json({ templates: s.templates, webmaster: s.webmaster, analytics: s.analytics, robots: s.robots, titleSeparator: s.titleSeparator, siteName: s.siteName, defaultOgImage: s.defaultOgImage, twitterHandle: s.twitterHandle, organization: s.organization, indexNowKey: s.indexNowKey });
}));

router.get('/redirects', wrap(async (req, res) => {
    const list = await Redirect.find({ active: true }).select('source target type').lean();
    res.json(list);
}));

router.get('/entry', wrap(async (req, res) => {
    const entry = await SeoEntry.findOne({ path: normPath(req.query.path) }).lean();
    res.json(entry || null);
}));

router.get('/noindex', wrap(async (req, res) => {
    const list = await SeoEntry.find({ noindex: true }).select('path').lean();
    res.json(list.map((e) => e.path));
}));

// Called by the site's middleware when a redirect fires, and by the 404 page
router.post('/404', wrap(async (req, res) => {
    const path = normPath(req.body?.path);
    if (!path || path.length > 300 || path.startsWith('/admin') || path.startsWith('/_next')) return res.json({ ok: false });
    await NotFound.updateOne(
        { path },
        { $inc: { hits: 1 }, $set: { lastSeen: new Date(), referrer: String(req.body?.referrer || '').slice(0, 300) } },
        { upsert: true }
    );
    res.json({ ok: true });
}));

router.post('/redirect-hit', wrap(async (req, res) => {
    const source = normPath(req.body?.source);
    if (source) await Redirect.updateOne({ source }, { $inc: { hits: 1 }, $set: { lastHit: new Date() } });
    res.json({ ok: true });
}));

/* ───────────── Admin ───────────── */

router.get('/admin/overview', wrap(async (req, res) => {
    const [entries, noindex, redirects, activeRedirects, notFound, s] = await Promise.all([
        SeoEntry.countDocuments(),
        SeoEntry.countDocuments({ noindex: true }),
        Redirect.countDocuments(),
        Redirect.countDocuments({ active: true }),
        NotFound.countDocuments({ ignored: false }),
        getSettings(),
    ]);
    const topNotFound = await NotFound.find({ ignored: false }).sort({ hits: -1 }).limit(5).lean();
    res.json({
        entries, noindex, redirects, activeRedirects, notFound, topNotFound,
        webmasterConnected: Object.entries(s.webmaster).filter(([, v]) => v).map(([k]) => k),
        analyticsConnected: Object.entries(s.analytics).filter(([, v]) => v).map(([k]) => k),
    });
}));

router.get('/admin/settings', wrap(async (req, res) => res.json(await getSettings())));

router.put('/admin/settings', wrap(async (req, res) => {
    const current = await getSettings();
    const b = req.body || {};
    const clean = (o = {}, keys) => Object.fromEntries(keys.map((k) => [k, String(o[k] ?? '').trim()]));
    const next = {
        ...current,
        webmaster: clean({ ...current.webmaster, ...b.webmaster }, ['google', 'bing', 'yandex', 'pinterest']),
        analytics: clean({ ...current.analytics, ...b.analytics }, ['ga4', 'gtm', 'clarity', 'metaPixel']),
        robots: typeof b.robots === 'string' ? b.robots.slice(0, 5000) : current.robots,
        titleSeparator: b.titleSeparator ?? current.titleSeparator,
        siteName: b.siteName ?? current.siteName,
        defaultOgImage: b.defaultOgImage ?? current.defaultOgImage,
        twitterHandle: b.twitterHandle ?? current.twitterHandle,
        templates: b.templates ? {
            blog: { ...current.templates?.blog, ...b.templates.blog },
            portfolio: { ...current.templates?.portfolio, ...b.templates.portfolio },
            caseStudy: { ...current.templates?.caseStudy, ...b.templates.caseStudy },
        } : current.templates,
        organization: b.organization ? { ...current.organization, ...b.organization } : current.organization,
        indexNowKey: current.indexNowKey || require('crypto').randomBytes(16).toString('hex'),
    };
    await SiteSetting.updateOne({ key: SETTINGS_KEY }, { $set: { value: next } }, { upsert: true });
    res.json(next);
}));

// Audit history: each full "Run SEO Audit" is stored so the dashboard can show the trend
router.get('/admin/audits', wrap(async (req, res) => res.json(await AuditRun.find().sort({ createdAt: -1 }).limit(30).lean())));
router.post('/admin/audits', wrap(async (req, res) => {
    const results = (Array.isArray(req.body?.results) ? req.body.results : []).slice(0, 1000).map((r) => ({
        path: String(r.path || '').slice(0, 300), score: Number(r.score) || 0, issues: Number(r.issues) || 0, words: Number(r.words) || 0,
    }));
    if (!results.length) return res.status(400).json({ error: 'No results.' });
    const average = Math.round(results.reduce((n, r) => n + r.score, 0) / results.length);
    const run = await AuditRun.create({ average, pages: results.length, issues: results.reduce((n, r) => n + r.issues, 0), results, user: req.admin?.username });
    // Keep the last 60 runs
    const old = await AuditRun.find().sort({ createdAt: -1 }).skip(60).select('_id').lean();
    if (old.length) await AuditRun.deleteMany({ _id: { $in: old.map((o) => o._id) } });
    res.json(run);
}));

// Redirects
router.get('/admin/redirects', wrap(async (req, res) => res.json(await Redirect.find().sort({ updatedAt: -1 }).lean())));

router.post('/admin/redirects', wrap(async (req, res) => {
    const source = normPath(req.body?.source);
    const type = Number(req.body?.type) || 301;
    const target = type === 410 ? '' : String(req.body?.target || '').trim();
    if (!source) return res.status(400).json({ error: 'Source path is required.' });
    if (type !== 410 && !target) return res.status(400).json({ error: 'Target is required.' });
    if (normPath(target) === source) return res.status(400).json({ error: 'Source and target cannot be the same.' });
    const doc = await Redirect.findOneAndUpdate(
        { source },
        { $set: { source, target, type, active: req.body?.active !== false, note: String(req.body?.note || '') } },
        { upsert: true, new: true }
    );
    // A redirect fixes the 404, so stop listing it
    await NotFound.deleteOne({ path: source });
    res.json(doc);
}));

router.put('/admin/redirects/:id', wrap(async (req, res) => {
    const b = req.body || {};
    const update = {};
    if (b.source !== undefined) update.source = normPath(b.source);
    if (b.target !== undefined) update.target = String(b.target).trim();
    if (b.type !== undefined) update.type = Number(b.type);
    if (b.active !== undefined) update.active = Boolean(b.active);
    if (b.note !== undefined) update.note = String(b.note);
    res.json(await Redirect.findByIdAndUpdate(req.params.id, { $set: update }, { new: true }));
}));

router.delete('/admin/redirects/:id', wrap(async (req, res) => {
    await Redirect.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
}));

// 404 monitor
router.get('/admin/404', wrap(async (req, res) => res.json(await NotFound.find().sort({ hits: -1 }).limit(500).lean())));

router.patch('/admin/404/:id', wrap(async (req, res) => {
    res.json(await NotFound.findByIdAndUpdate(req.params.id, { $set: { ignored: Boolean(req.body?.ignored) } }, { new: true }));
}));

router.delete('/admin/404/:id', wrap(async (req, res) => {
    await NotFound.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
}));

router.delete('/admin/404', wrap(async (req, res) => {
    await NotFound.deleteMany({});
    res.json({ ok: true });
}));

// Public: site-wide business details for the website (Admin > Site Settings)
router.get('/site', wrap(async (req, res) => {
    const doc = await SiteSetting.findOne({ key: 'site' }).lean();
    res.json(doc?.value || {});
}));

// Per-page SEO entries (used by the page SEO editor in the next batch)
router.get('/admin/entries', wrap(async (req, res) => res.json(await SeoEntry.find().sort({ path: 1 }).lean())));

router.put('/admin/entries', wrap(async (req, res) => {
    const path = normPath(req.body?.path);
    if (!path) return res.status(400).json({ error: 'Path is required.' });
    const allowed = ['title', 'description', 'keywords', 'focusKeyword', 'canonical', 'noindex', 'nofollow', 'noarchive', 'nosnippet', 'noimageindex', 'ogTitle', 'ogDescription', 'ogImage', 'twitterTitle', 'twitterDescription', 'schema'];
    const set = { path };
    for (const k of allowed) if (req.body[k] !== undefined) set[k] = req.body[k];
    if (set.schema) {
        try { JSON.parse(set.schema); } catch { return res.status(400).json({ error: 'Schema must be valid JSON.' }); }
    }
    const prev = await SeoEntry.findOne({ path }).lean();
    if (prev) await Revision.create({ kind: 'seo-entry', ref: path, data: prev, user: req.admin?.username });
    res.json(await SeoEntry.findOneAndUpdate({ path }, { $set: set }, { upsert: true, new: true }));
}));

router.delete('/admin/entries/:id', wrap(async (req, res) => {
    await SeoEntry.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
}));

// Instant indexing (IndexNow: Bing, Yandex, Seznam, Naver). Google does not support IndexNow.
router.post('/admin/indexnow', wrap(async (req, res) => {
    const s = await getSettings();
    let key = s.indexNowKey;
    if (!key) {
        key = require('crypto').randomBytes(16).toString('hex');
        await SiteSetting.updateOne({ key: SETTINGS_KEY }, { $set: { value: { ...s, indexNowKey: key } } }, { upsert: true });
    }
    const host = 'mailstora.com';
    const urls = (req.body?.urls || []).filter((u) => typeof u === 'string' && u.startsWith(`https://${host}/`)).slice(0, 1000);
    if (!urls.length) return res.status(400).json({ error: 'Add at least one https://mailstora.com URL.' });
    const r = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host, key, keyLocation: `https://${host}/indexnow-key.txt`, urlList: urls }),
    });
    res.status(r.ok ? 200 : 502).json({ ok: r.ok, status: r.status, submitted: urls.length });
}));

module.exports = router;
