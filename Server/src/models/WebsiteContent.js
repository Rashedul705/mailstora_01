const mongoose = require('mongoose');

const websiteContentSchema = new mongoose.Schema({
    section: { type: String, required: true },
    content_key: { type: String, required: true, unique: true },
    content_value: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('WebsiteContent', websiteContentSchema);
