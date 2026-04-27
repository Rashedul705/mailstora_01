const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    quoteId: { type: String, required: true, unique: true },
    status: { type: String, enum: ['new', 'reviewed', 'replied', 'closed'], default: 'new' },
    submittedAt: { type: Date, default: Date.now },
    client: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        whatsapp: { type: String, required: true },
        company: { type: String, default: '' }
    },
    service: { type: String, required: true },
    emailTypes: [{ type: String }],
    esp: [{ type: String }],
    designStatus: { type: String, required: true },
    attachmentUrl: { type: String, default: '' },
    projectDetails: { type: String, required: true },
    conversation: [{
        from: { type: String, enum: ['admin', 'client'], required: true },
        message: { type: String, required: true },
        sentAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
