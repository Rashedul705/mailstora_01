const mongoose = require('mongoose');

const trustLogoSchema = new mongoose.Schema({
    name:     { type: String, required: true, trim: true },
    url:      { type: String, default: '' },
    logoUrl:  { type: String, default: '' },
    active:   { type: Boolean, default: true },
    order:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('TrustLogo', trustLogoSchema);
