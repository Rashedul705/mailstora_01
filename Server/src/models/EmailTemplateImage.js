const mongoose = require('mongoose');

const EmailTemplateImageSchema = new mongoose.Schema({
    folderName: {
        type: String,
        default: ''
    },
    fileName: {
        type: String,
        required: true
    },
    imgbbUrl: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        default: 0
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

// Create a compound index to quickly look up images by folder and file name
EmailTemplateImageSchema.index({ folderName: 1, fileName: 1 }, { unique: true });

module.exports = mongoose.model('EmailTemplateImage', EmailTemplateImageSchema);
