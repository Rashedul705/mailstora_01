const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    service: { type: String, default: '' },
    message: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Replied', 'Resolved'], default: 'Pending' },
    conversation: [{
        from: { type: String, enum: ['admin', 'client'] },
        message: String,
        sentAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
