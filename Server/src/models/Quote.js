const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    quoteId: { type: String, required: true, unique: true },
    status: { type: String, enum: ['new', 'in review', 'quote sent', 'accepted', 'declined', 'closed'], default: 'new' },
    submittedAt: { type: Date, default: Date.now },
    client: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        whatsapp: { type: String, required: true },
        company: { type: String, default: '' }
    },
    services: [{ type: String, required: true }],
    serviceDetails: { type: mongoose.Schema.Types.Mixed, default: {} },
    budget: { type: String, default: '' },
    timeline: { type: String, default: '' },
    overallProjectDetails: { type: String, default: '' },
    attachmentUrl: { type: String, default: '' },
    conversation: [{
        from: { type: String, enum: ['admin', 'client'], required: true },
        message: { type: String, required: true },
        sentAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
