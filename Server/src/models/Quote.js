const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    quoteId: { type: String, required: true, unique: true },
    service: { type: String, required: true },
    answers: { type: mongoose.Schema.Types.Mixed, default: {} },
    deadline: { type: String, default: '' },
    budget: { type: String, default: '' },
    client: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        whatsapp: { type: String, default: '' },
        company: { type: String, default: '' } // kept for backward compatibility if needed
    },
    attachments: [{ type: String }],
    sourcePage: { type: String, default: '' },
    utm: { type: mongoose.Schema.Types.Mixed, default: {} },
    status: { type: String, enum: ['new', 'in review', 'quote sent', 'accepted', 'declined', 'closed'], default: 'new' },
    submittedAt: { type: Date, default: Date.now },
    conversation: [{
        from: { type: String, enum: ['admin', 'client'], required: true },
        message: { type: String, required: true },
        sentAt: { type: Date, default: Date.now }
    }],
    // Legacy fields to not break existing data
    services: [{ type: String }],
    serviceDetails: { type: mongoose.Schema.Types.Mixed },
    overallProjectDetails: { type: String },
    attachmentUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
