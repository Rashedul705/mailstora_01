const PortfolioItem = require('../models/Portfolio');

exports.getPublished = async (req, res) => {
    try {
        const { type, esp, page = 1, limit = 9, sort, q } = req.query;
        
        const filter = { status: 'published' };
        if (type) filter.type = type;
        if (esp) filter.esp = esp;
        if (q) {
            filter.$or = [
                { title: { $regex: q, $options: 'i' } },
                { clientName: { $regex: q, $options: 'i' } }
            ];
        }

        let sortOption = { createdAt: -1 }; // latest
        if (sort === 'popular') {
            sortOption = { views: -1 };
        } else if (sort === 'order') {
            sortOption = { sortOrder: 1 };
        }

        const skip = (page - 1) * limit;

        const items = await PortfolioItem.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await PortfolioItem.countDocuments(filter);

        res.json({
            items,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFeatured = async (req, res) => {
    try {
        const items = await PortfolioItem.find({ status: 'published', featuredOnLanding: true })
            .sort({ sortOrder: 1 })
            .limit(6);
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBySlug = async (req, res) => {
    try {
        const item = await PortfolioItem.findOneAndUpdate(
            { slug: req.params.slug, status: 'published' },
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!item) return res.status(404).json({ message: 'Portfolio item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCounts = async (req, res) => {
    try {
        const totalCount = await PortfolioItem.countDocuments({ status: 'published' });
        const emailTemplatesCount = await PortfolioItem.countDocuments({ status: 'published', type: 'Email Template' });
        const emailSignaturesCount = await PortfolioItem.countDocuments({ status: 'published', type: 'Email Signature' });
        const caseStudiesCount = await PortfolioItem.countDocuments({ status: 'published', type: 'Case Study' });
        
        res.json({
            total: totalCount,
            emailTemplates: emailTemplatesCount,
            emailSignatures: emailSignaturesCount,
            caseStudies: caseStudiesCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getStats = async (req, res) => {
    try {
        const totalTemplates = await PortfolioItem.countDocuments({ status: 'published', type: 'Email Template' });
        res.json({ totalTemplates });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
