const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    cta_text: { type: String, default: 'Get Started' },
    cta_link: { type: String, default: '/contact' },
    background_image: { type: String, default: '' },
    is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('HeroSection', heroSectionSchema);
