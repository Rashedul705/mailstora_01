const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    details: { type: String, required: true },
    amount: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
