const mongoose = require('mongoose');

const quoteMessageSchema = new mongoose.Schema({
    quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: true },
    sender_type: { type: String, enum: ['admin', 'client'], required: true },
    message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('QuoteMessage', quoteMessageSchema);
