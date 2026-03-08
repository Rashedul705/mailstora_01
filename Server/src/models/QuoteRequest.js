const mongoose = require('mongoose');

const quoteRequestSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    company: {
        type: String,
        default: ''
    },
    project_description: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        default: ''
    },
    timeline: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['new', 'reviewed', 'quoted', 'accepted', 'rejected'],
        default: 'new'
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('QuoteRequest', quoteRequestSchema);
