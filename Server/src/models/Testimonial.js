const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    client_name: { type: String, required: true },
    company: { type: String, default: '' },
    role: { type: String, default: '' },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    image_url: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
