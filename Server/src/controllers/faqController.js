const FAQ = require('../models/FAQ');

exports.getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find().sort({ orderNumber: 1 });
        res.json(faqs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching FAQs' });
    }
};

exports.createFAQ = async (req, res) => {
    try {
        const newFAQ = new FAQ(req.body);
        const savedFAQ = await newFAQ.save();
        res.status(201).json(savedFAQ);
    } catch (error) {
        res.status(400).json({ message: 'Error creating FAQ' });
    }
};

exports.updateFAQ = async (req, res) => {
    try {
        const updatedFAQ = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFAQ) return res.status(404).json({ message: 'FAQ not found' });
        res.json(updatedFAQ);
    } catch (error) {
        res.status(400).json({ message: 'Error updating FAQ' });
    }
};

exports.deleteFAQ = async (req, res) => {
    try {
        const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id);
        if (!deletedFAQ) return res.status(404).json({ message: 'FAQ not found' });
        res.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting FAQ' });
    }
};
