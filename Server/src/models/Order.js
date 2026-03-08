const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    order_number: { type: String, required: true, unique: true },
    package_name: { type: String, required: true },
    price: { type: Number, required: true },
    requirements: { type: String, required: true },
    deadline: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Order', orderSchema);
