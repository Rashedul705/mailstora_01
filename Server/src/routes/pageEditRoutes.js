const express = require('express');
const PageEdit = require('../models/PageEdit');
const { Revision } = require('../models/Activity');

const router = express.Router();
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const norm = (p) => {
    let s = String(p || '').trim().toLowerCase();
    if (s === '*') return s;
    if (!s.startsWith('/')) s = '/' + s;
    if (!s.endsWith('/')) s += '/';
    return s;
};

// Public: every page's edits (small; cached by the website for 60s)
router.get('/', wrap(async (req, res) => {
    const list = await PageEdit.find({ 'edits.0': { $exists: true } }).select('path edits -_id').lean();
    res.json(list);
}));

router.get('/page', wrap(async (req, res) => {
    const doc = await PageEdit.findOne({ path: norm(req.query.path) }).lean();
    res.json(doc || { path: norm(req.query.path), edits: [] });
}));

// Admin: replace a page's edits (keeps the previous version as a revision)
router.put('/page', wrap(async (req, res) => {
    const path = norm(req.body?.path);
    if (!path || path === '/') {
        if (req.body?.path !== '/') return res.status(400).json({ message: 'Path is required.' });
    }
    const edits = (Array.isArray(req.body?.edits) ? req.body.edits : [])
        .filter((e) => e && ['text', 'img', 'alt'].includes(e.kind) && typeof e.original === 'string' && e.original && typeof e.value === 'string' && e.value !== e.original)
        .map((e) => ({ kind: e.kind, original: e.original, value: e.value }));
    const prev = await PageEdit.findOne({ path }).lean();
    if (prev) await Revision.create({ kind: 'page-edit', ref: path, data: prev.edits, user: req.admin?.username });
    const doc = await PageEdit.findOneAndUpdate({ path }, { $set: { edits } }, { upsert: true, new: true });
    res.json(doc);
}));

module.exports = router;
