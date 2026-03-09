const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image_url: { type: String, required: true },
    project_url: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
