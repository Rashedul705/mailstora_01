const Inquiry = require('../models/Inquiry');

// Get all inquiries for admin
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inquiries' });
    }
};

// Create new inquiry from public website contact form
exports.createInquiry = async (req, res) => {
    try {
        const newInquiry = new Inquiry(req.body);
        const savedInquiry = await newInquiry.save();
        res.status(201).json({ message: 'Inquiry sent successfully', data: savedInquiry });
    } catch (error) {
        res.status(400).json({ message: 'Error sending inquiry', error });
    }
};

// Mark inquiry as read
exports.markAsRead = async (req, res) => {
    try {
        const updatedInquiry = await Inquiry.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        if (!updatedInquiry) return res.status(404).json({ message: 'Inquiry not found' });
        res.json(updatedInquiry);
    } catch (error) {
        res.status(400).json({ message: 'Error updating inquiry' });
    }
};

// Delete inquiry
exports.deleteInquiry = async (req, res) => {
    try {
        const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);
        if (!deletedInquiry) return res.status(404).json({ message: 'Inquiry not found' });
        res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting inquiry' });
    }
};
