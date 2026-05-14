const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, default: '' },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    platform: { type: String, enum: ['upwork', 'fiverr', 'direct'], default: 'direct' },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'published'], default: 'pending' },
    avatarInitials: { type: String, default: '' }
}, { timestamps: true });

// Pre-save hook to generate initials from the name
testimonialSchema.pre('save', function(next) {
    if (this.isModified('name') || !this.avatarInitials) {
        if (this.name) {
            const parts = this.name.trim().split(/\s+/);
            if (parts.length >= 2) {
                this.avatarInitials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
            } else if (parts.length === 1) {
                this.avatarInitials = parts[0].substring(0, 2).toUpperCase();
            } else {
                this.avatarInitials = '?';
            }
        }
    }
    next();
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
