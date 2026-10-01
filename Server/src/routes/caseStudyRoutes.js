const express = require('express');
const router = express.Router();
const CaseStudy = require('../models/CaseStudy');

// Published case studies, in admin order then newest first
router.get('/', async (req, res) => {
    try {
        res.json(await CaseStudy.find({ status: 'published' }).sort({ sortOrder: 1, createdAt: -1 }).lean());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:slug', async (req, res) => {
    try {
        const item = await CaseStudy.findOne({ slug: req.params.slug, status: 'published' }).lean();
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
