const TrustLogo   = require('../models/TrustLogo');
const SiteSetting = require('../models/SiteSetting');
const multer      = require('multer');
const { uploadToImgBB } = require('../services/imgbb');

const upload = multer({ storage: multer.memoryStorage() });

const SETTINGS_KEY = 'trustLogoSettings';
const DEFAULT_SETTINGS = { speed: 'Normal', showStats: true };

// ─── GET /api/trust-logos ─────────────────────────────────────
// Public: return only active logos sorted by order
exports.getAll = async (req, res) => {
    try {
        const filter = req.query.all === '1' ? {} : { active: true };
        const logos  = await TrustLogo.find(filter).sort({ order: 1, createdAt: 1 });
        res.json(logos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ─── GET /api/trust-logos/settings ───────────────────────────
exports.getSettings = async (req, res) => {
    try {
        const doc = await SiteSetting.findOne({ key: SETTINGS_KEY });
        res.json(doc ? doc.value : DEFAULT_SETTINGS);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ─── PATCH /api/trust-logos/settings ─────────────────────────
exports.updateSettings = async (req, res) => {
    try {
        const { speed, showStats } = req.body;
        const doc = await SiteSetting.findOneAndUpdate(
            { key: SETTINGS_KEY },
            { $set: { value: { speed, showStats } } },
            { upsert: true, new: true }
        );
        res.json(doc.value);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ─── POST /api/trust-logos ────────────────────────────────────
// Accepts multipart/form-data with optional logo file
exports.create = [
    upload.single('logo'),
    async (req, res) => {
        try {
            const { name, url, order } = req.body;
            let logoUrl = req.body.logoUrl || '';

            if (req.file) {
                logoUrl = await uploadToImgBB(req.file.buffer, req.file.originalname);
            }

            const count = await TrustLogo.countDocuments();
            const logo  = await TrustLogo.create({
                name,
                url:    url || '',
                logoUrl,
                active: true,
                order:  order !== undefined ? Number(order) : count,
            });
            res.status(201).json(logo);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
];

// ─── PATCH /api/trust-logos/:id ──────────────────────────────
// Accepts multipart/form-data with optional logo file
exports.update = [
    upload.single('logo'),
    async (req, res) => {
        try {
            const { name, url, active, order } = req.body;
            const patch = {};

            if (name    !== undefined) patch.name   = name;
            if (url     !== undefined) patch.url    = url;
            if (active  !== undefined) patch.active = active === 'true' || active === true;
            if (order   !== undefined) patch.order  = Number(order);

            if (req.file) {
                patch.logoUrl = await uploadToImgBB(req.file.buffer, req.file.originalname);
            } else if (req.body.logoUrl !== undefined) {
                patch.logoUrl = req.body.logoUrl;
            }

            const logo = await TrustLogo.findByIdAndUpdate(
                req.params.id,
                { $set: patch },
                { new: true }
            );
            if (!logo) return res.status(404).json({ error: 'Not found' });
            res.json(logo);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
];

// ─── DELETE /api/trust-logos/:id ─────────────────────────────
exports.remove = async (req, res) => {
    try {
        const logo = await TrustLogo.findByIdAndDelete(req.params.id);
        if (!logo) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
