const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('File', FileSchema);
