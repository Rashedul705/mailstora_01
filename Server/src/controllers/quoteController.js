const QuoteRequest = require('../models/QuoteRequest');

// Public: Submit a new quote request
exports.submitQuote = async (req, res) => {
    try {
        const newQuote = new QuoteRequest({
            customer_id: req.customer_id, // Attached by customerIntercept middleware
            name: req.body.name,
            email: req.body.email,
            company: req.body.company || '',
            project_description: req.body.project_description,
            budget: req.body.budget || '',
            timeline: req.body.timeline || ''
        });
        await newQuote.save();
        res.status(201).json({ message: 'Quote request submitted successfully', data: newQuote });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting quote request', error: error.message });
    }
};

// Admin: Get all quotes
exports.getAllQuotes = async (req, res) => {
    try {
        const quotes = await QuoteRequest.find().populate('customer_id', 'name email').sort({ created_at: -1 });
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quotes', error: error.message });
    }
};

// Admin: Update quote status
exports.updateQuoteStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const quote = await QuoteRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!quote) return res.status(404).json({ message: 'Quote not found' });
        res.json({ message: 'Quote status updated', data: quote });
    } catch (error) {
        res.status(500).json({ message: 'Error updating quote status', error: error.message });
    }
};

// Admin: Delete quote
exports.deleteQuote = async (req, res) => {
    try {
        const quote = await QuoteRequest.findByIdAndDelete(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });
        res.json({ message: 'Quote deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting quote', error: error.message });
    }
};
