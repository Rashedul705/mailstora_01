const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
    package_name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    button_text: { type: String, default: 'Get Started' },
    button_link: { type: String, default: '#contact' },
    highlight: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Pricing', pricingSchema);
