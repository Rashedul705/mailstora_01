const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    sectionId: { type: String, required: true, unique: true },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    buttonText: { type: String },
    buttonLink: { type: String },
    image: { type: String } // For Hero or specific sections
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
