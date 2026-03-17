const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    company: { type: String, default: '' },
    website: { type: String, default: '' },
    service_type: { type: String, required: true, enum: ['Email Template', 'Email Signature', 'Both'] },
    email_types: [{ type: String }],
    template_quantity: { type: String, required: true },
    esp: { type: String, default: '' },
    esp_custom: { type: String, default: '' },
    design_status: { type: String, enum: ['have_design', 'need_design'], default: 'have_design' },
    design_brief: { type: String, default: '' },
    attachments: [{ type: String }],
    project_description: { type: String, required: true },
    status: { type: String, enum: ['new', 'contacted', 'negotiation', 'converted', 'closed'], default: 'new' },
    quote_number: { type: Number, unique: true },
    access_token: { type: String, unique: true },
    has_unread: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
