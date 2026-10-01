const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: '' },
    company_name: { type: String, default: '' },
    source: { type: String, enum: ['order', 'quote', 'inquiry', 'schedule'], required: true },
    total_orders: { type: Number, default: 0 },
    last_activity: { type: Date, default: Date.now }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Customer', customerSchema);
