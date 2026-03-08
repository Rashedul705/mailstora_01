const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    client_name: { type: String, required: true },
    client_position: { type: String, default: '' },
    company_name: { type: String, default: '' },
    client_photo: { type: String, default: '' },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    testimonial_text: { type: String, required: true },
    is_active: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Testimonial', testimonialSchema);
