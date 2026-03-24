const mongoose = require('mongoose');

const adminAvailabilitySchema = new mongoose.Schema({
    workingDays: { 
        type: [String], 
        default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: { type: String, default: '09:00' }, // 24-hour format HH:mm
    endTime: { type: String, default: '17:00' } // 24-hour format HH:mm
}, { timestamps: true });

module.exports = mongoose.model('AdminAvailability', adminAvailabilitySchema);
