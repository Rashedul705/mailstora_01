const mongoose = require('mongoose');

const scheduleRequestSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    company: { type: String, default: '' },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    time: { type: String, required: true }, // Format: HH:mm
    duration: { type: Number, default: 30 }, // Fixed to 30 mins
    meetingMethod: { type: String, enum: ['WhatsApp Call', 'Zoom', 'Google Meet'], required: true },
    meetingLink: { type: String, default: '' },
    message: { type: String, default: '' },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Ongoing', 'Completed', 'Cancelled'], default: 'Pending' },
    utcDateTime: { type: Date, required: true },
    userTimezone: { type: String, required: true },
    remindersSent: {
        before30min: { type: Boolean, default: false },
        before5min: { type: Boolean, default: false }
    }
}, { timestamps: true });

module.exports = mongoose.model('ScheduleRequest', scheduleRequestSchema);
