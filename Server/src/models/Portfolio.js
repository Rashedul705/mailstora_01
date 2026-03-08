const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    project_title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    company_name: { type: String, default: '' },
    client_name: { type: String, default: '' },
    client_position: { type: String, default: '' },
    main_image: { type: String, required: true },
    desktop_image: { type: String, default: '' },
    tablet_image: { type: String, default: '' },
    mobile_image: { type: String, default: '' }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Portfolio', portfolioSchema);
