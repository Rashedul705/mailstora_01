const express = require('express');
const router = express.Router();
const CaseStudy = require('../models/CaseStudy');
const verifyToken = require('../middleware/auth');

router.use(verifyToken);

router.get('/', async (req, res) => {
    try {
        const { status, q } = req.query;
        const filter = {};
        if (status && status !== 'all') filter.status = status;
        if (q) filter.$or = [{ title: { $regex: q, $options: 'i' } }, { clientName: { $regex: q, $options: 'i' } }];
        res.json(await CaseStudy.find(filter).sort({ sortOrder: 1, createdAt: -1 }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await CaseStudy.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        res.status(201).json(await new CaseStudy(req.body).save());
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const item = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const item = await CaseStudy.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
