const express = require('express');
const Admin = require('../models/Admin');
const SiteSetting = require('../models/SiteSetting');
const { SeoEntry } = require('../models/Seo');
const { Activity, Revision } = require('../models/Activity');

const router = express.Router();
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const isAdmin = (req, res, next) => ((req.admin?.role || 'admin') === 'admin' ? next() : res.status(403).json({ message: 'Admins only.' }));
const ROLES = ['admin', 'editor', 'seo'];

// ── Who am I (role for the admin UI) ──
router.get('/me', (req, res) => res.json({ username: req.admin?.username, role: req.admin?.role || 'admin' }));

// ── Users & roles ──
router.get('/users', isAdmin, wrap(async (req, res) => res.json(await Admin.find().select('-password').sort({ createdAt: 1 }).lean())));

router.post('/users', isAdmin, wrap(async (req, res) => {
    const { username, email, password, role } = req.body || {};
    if (!username || !email || !password || password.length < 10) return res.status(400).json({ message: 'Username, email and a password of 10+ characters are required.' });
    if (await Admin.findOne({ $or: [{ username }, { email }] })) return res.status(409).json({ message: 'Username or email already exists.' });
    const u = await Admin.create({ username, email, password, role: ROLES.includes(role) ? role : 'editor' });
    res.status(201).json({ _id: u._id, username, email, role: u.role });
}));

router.patch('/users/:id', isAdmin, wrap(async (req, res) => {
    const u = await Admin.findById(req.params.id);
    if (!u) return res.status(404).json({ message: 'Not found.' });
    if (req.body.role && ROLES.includes(req.body.role)) {
        const admins = await Admin.countDocuments({ $or: [{ role: 'admin' }, { role: { $exists: false } }] });
        if ((u.role || 'admin') === 'admin' && req.body.role !== 'admin' && admins <= 1) return res.status(400).json({ message: 'Keep at least one admin.' });
        u.role = req.body.role;
    }
    if (req.body.password) {
        if (req.body.password.length < 10) return res.status(400).json({ message: 'Password must be 10+ characters.' });
        u.password = req.body.password;
    }
    await u.save();
    res.json({ _id: u._id, username: u.username, email: u.email, role: u.role });
}));

router.delete('/users/:id', isAdmin, wrap(async (req, res) => {
    if (String(req.params.id) === String(req.admin.id)) return res.status(400).json({ message: 'You cannot delete yourself.' });
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
}));

// ── Activity log ──
router.get('/activity', isAdmin, wrap(async (req, res) => {
    const limit = Math.min(Number(req.query.limit) || 200, 1000);
    res.json(await Activity.find().sort({ createdAt: -1 }).limit(limit).lean());
}));
router.delete('/activity', isAdmin, wrap(async (req, res) => {
    await Activity.deleteMany({});
    res.json({ ok: true });
}));

// ── Site settings (contact, socials, Upwork stats...). Overrides siteConfig on the website ──
router.get('/site-settings', wrap(async (req, res) => {
    const doc = await SiteSetting.findOne({ key: 'site' }).lean();
    res.json(doc?.value || {});
}));
router.put('/site-settings', wrap(async (req, res) => {
    const doc = await SiteSetting.findOne({ key: 'site' }).lean();
    if (doc?.value) await Revision.create({ kind: 'site-settings', ref: 'site', data: doc.value, user: req.admin?.username });
    await SiteSetting.updateOne({ key: 'site' }, { $set: { value: req.body || {} } }, { upsert: true });
    res.json(req.body || {});
}));

// ── Revisions (history + restore) ──
router.get('/revisions', wrap(async (req, res) => {
    const q = {};
    if (req.query.kind) q.kind = String(req.query.kind);
    if (req.query.ref) q.ref = String(req.query.ref);
    res.json(await Revision.find(q).sort({ createdAt: -1 }).limit(50).lean());
}));
// Clear history for one page / settings key
router.delete('/revisions', wrap(async (req, res) => {
    if (!req.query.kind) return res.status(400).json({ message: 'kind is required.' });
    const q = { kind: String(req.query.kind) };
    if (req.query.ref) q.ref = String(req.query.ref);
    const r = await Revision.deleteMany(q);
    res.json({ ok: true, deleted: r.deletedCount });
}));

router.post('/revisions/:id/restore', wrap(async (req, res) => {
    const r = await Revision.findById(req.params.id).lean();
    if (!r) return res.status(404).json({ message: 'Not found.' });
    const role = req.admin?.role || 'admin';
    if (role !== 'admin' && (r.kind === 'site-settings' || (role === 'seo' && r.kind !== 'seo-entry'))) return res.status(403).json({ message: 'Your role cannot restore this.' });
    if (r.kind === 'site-settings') {
        const cur = await SiteSetting.findOne({ key: 'site' }).lean();
        if (cur?.value) await Revision.create({ kind: 'site-settings', ref: 'site', data: cur.value, user: req.admin?.username });
        await SiteSetting.updateOne({ key: 'site' }, { $set: { value: r.data } }, { upsert: true });
    } else if (r.kind === 'seo-entry') {
        const cur = await SeoEntry.findOne({ path: r.ref }).lean();
        if (cur) await Revision.create({ kind: 'seo-entry', ref: r.ref, data: cur, user: req.admin?.username });
        const { _id, __v, createdAt, updatedAt, ...data } = r.data || {};
        await SeoEntry.findOneAndUpdate({ path: r.ref }, { $set: { ...data, path: r.ref } }, { upsert: true });
    } else if (r.kind === 'page-edit') {
        const PageEdit = require('../models/PageEdit');
        const cur = await PageEdit.findOne({ path: r.ref }).lean();
        if (cur) await Revision.create({ kind: 'page-edit', ref: r.ref, data: cur.edits, user: req.admin?.username });
        await PageEdit.findOneAndUpdate({ path: r.ref }, { $set: { edits: r.data || [] } }, { upsert: true });
    } else {
        return res.status(400).json({ message: 'Unknown revision type.' });
    }
    res.json({ ok: true });
}));

// ── Broken link checker: status of up to 50 URLs per call ──
router.post('/check-links', wrap(async (req, res) => {
    const urls = (req.body?.urls || []).filter((u) => typeof u === 'string' && /^https?:\/\//.test(u)).slice(0, 50);
    const check = async (url) => {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 10000);
        try {
            let r = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': 'MailStora-LinkChecker/1.0' } });
            if (r.status === 405 || r.status === 403) r = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': 'Mozilla/5.0 MailStora-LinkChecker' } });
            return { url, status: r.status, finalUrl: r.url !== url ? r.url : undefined };
        } catch (e) {
            return { url, status: 0, error: e.name === 'AbortError' ? 'Timeout' : e.message };
        } finally {
            clearTimeout(t);
        }
    };
    res.json(await Promise.all(urls.map(check)));
}));

module.exports = router;
