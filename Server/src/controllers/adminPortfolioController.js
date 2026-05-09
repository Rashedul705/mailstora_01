const PortfolioItem = require('../models/Portfolio');
const { uploadToImgBB } = require('../services/imgbb');

exports.getAll = async (req, res) => {
    try {
        const { type, status, q } = req.query;
        let filter = {};
        if (type && type !== 'All Types') filter.type = type;
        if (status && status !== 'All Status') filter.status = status;
        if (q) {
            filter.$or = [
                { title: { $regex: q, $options: 'i' } },
                { clientName: { $regex: q, $options: 'i' } }
            ];
        }

        const items = await PortfolioItem.find(filter).sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const item = await PortfolioItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newItem = new PortfolioItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const item = await PortfolioItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const item = await PortfolioItem.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
        const imageUrl = await uploadToImgBB(req.file.buffer, req.file.originalname);
        res.json({ url: imageUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        const totalItems = await PortfolioItem.countDocuments();
        const published = await PortfolioItem.countDocuments({ status: 'published' });
        const drafts = await PortfolioItem.countDocuments({ status: 'draft' });
        const caseStudies = await PortfolioItem.countDocuments({ type: 'Case Study' });

        res.json({
            totalItems,
            published,
            drafts,
            caseStudies
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
