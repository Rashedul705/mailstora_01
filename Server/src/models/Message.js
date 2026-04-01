const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    scheduleId:   { type: mongoose.Schema.Types.ObjectId, ref: 'ScheduleRequest', default: null },
    userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null },
    userEmail:    { type: String, required: true },
    userName:     { type: String, default: '' },
    subject:      { type: String, default: '' },
    message:      { type: String, required: true },
    attachments:  [{ type: String }],          // array of URLs
    sender:       { type: String, enum: ['admin', 'user'], default: 'admin' },
    isRead:       { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
