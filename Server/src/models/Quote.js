const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, default: '' },
    phone: { type: String, default: '' },
    service_type: { type: String, required: true },
    template_count: { type: String, default: '' },
    timeline: { type: String, default: '' },
    budget: { type: String, default: '' },
    project_description: { type: String, required: true },
    attachment: { type: String, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'negotiation', 'converted', 'closed'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
