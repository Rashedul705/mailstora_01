const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, default: '' },
    phone: { type: String, default: '' },
    service_required: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Replied', 'Converted'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
