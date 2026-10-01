const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, required: true, unique: true },
    status: { 
        type: String, 
        enum: ['pending_verification', 'confirmed', 'cancelled', 'completed'], 
        default: 'pending_verification' 
    },
    date: { type: String, required: true }, // "YYYY-MM-DD"
    timeSlot: { type: String, required: true }, // "10:00 AM ET"
    utcDateTime: { type: Date, required: true }, // Store UTC for calculations
    duration: { type: Number, default: 30 },
    meetingMethod: { 
        type: String, 
        enum: ['whatsapp', 'zoom', 'google_meet'], 
        required: true 
    },
    client: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        whatsapp: { type: String, required: true },
        company: { type: String, default: '' }
    },
    projectNotes: { type: String, default: '' },
    otp: { type: String }, // Hashed or plaintext depending on strictness (cleared after)
    otpExpiresAt: { type: Date },
    otpAttempts: { type: Number, default: 0 },
    reminderSent30min: { type: Boolean, default: false },
    reminderSent5min: { type: Boolean, default: false },
    conversation: [
        {
            from: { type: String, enum: ['admin', 'system'] },
            message: { type: String, required: true },
            sentAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

// Index for quickly looking up overlapping slots
bookingSchema.index({ utcDateTime: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
