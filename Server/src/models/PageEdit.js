const mongoose = require('mongoose');

// Text and image changes made in Admin > Page Editor.
// path '*' holds edits applied on every page (header, footer).
const editSchema = new mongoose.Schema({
    kind: { type: String, enum: ['text', 'img', 'alt'], required: true },
    original: { type: String, required: true },
    value: { type: String, default: '' },
}, { _id: false });

const pageEditSchema = new mongoose.Schema({
    path: { type: String, required: true, unique: true },
    edits: [editSchema],
}, { timestamps: true });

module.exports = mongoose.model('PageEdit', pageEditSchema);
