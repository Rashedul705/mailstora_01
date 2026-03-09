const mongoose = require('mongoose');

const scheduleRequestSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    meeting_date: { type: Date, required: true },
    meeting_time: { type: String, required: true },
    topic: { type: String, default: '' },
    status: { type: String, enum: ['Pending', 'Scheduled', 'Completed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('ScheduleRequest', scheduleRequestSchema);
