const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    button_text: {
        type: String,
        default: ''
    },
    button_link: {
        type: String,
        default: ''
    },
    hero_image: {
        type: String,
        default: ''
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('HeroSection', heroSectionSchema);
