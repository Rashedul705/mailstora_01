const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    billing_cycle: { type: String, default: 'monthly' },
    description: { type: String, default: '' },
    features: [{ type: String }],
    is_popular: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Pricing', pricingSchema);
