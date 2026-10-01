const Testimonial = require('../models/Testimonial');
const baseController = require('./baseController');

exports.getAll = async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};
        
        if (status === 'published') {
            query.status = 'published';
        }

        // Fetch testimonials matching the query, sorted by featured (true first) then newest first
        const testimonials = await Testimonial.find(query).sort({ featured: -1, createdAt: -1 });

        // If the query was for published only (landing page), we don't strictly need the admin stats,
        // but it doesn't hurt to return them anyway, or we can compute them on the fly.
        // For the admin panel (no status filter), we need overall stats.
        
        // Compute stats across ALL testimonials to ensure admin dashboard gets the correct numbers
        const allTestimonials = await Testimonial.find();
        
        const totalCount = allTestimonials.length;
        const publishedCount = allTestimonials.filter(t => t.status === 'published').length;
        const pendingCount = allTestimonials.filter(t => t.status === 'pending').length;
        
        // Avg rating based only on published (or all? Usually avg is shown for published)
        const publishedReviews = allTestimonials.filter(t => t.status === 'published');
        let avgRating = 5.0;
        if (publishedReviews.length > 0) {
            const sum = publishedReviews.reduce((acc, t) => acc + (t.rating || 5), 0);
            avgRating = (sum / publishedReviews.length).toFixed(1);
        }

        res.status(200).json({
            data: testimonials,
            stats: {
                totalCount,
                publishedCount,
                pendingCount,
                avgRating: parseFloat(avgRating)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const generateInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    return '?';
};

exports.create = async (req, res) => {
    try {
        const data = { ...req.body };
        if (data.name && !data.avatarInitials) {
            data.avatarInitials = generateInitials(data.name);
        }
        const newTestimonial = new Testimonial(data);
        await newTestimonial.save();
        res.status(201).json(newTestimonial);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = { ...req.body };
        if (data.name) {
            data.avatarInitials = generateInitials(data.name);
        }
        const updated = await Testimonial.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getOne = baseController.getOne(Testimonial);
exports.remove = baseController.remove(Testimonial);
