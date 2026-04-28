const mongoose = require('mongoose');

const scheduleSettingsSchema = new mongoose.Schema({
    startTime:  { type: String, default: '9:00 AM' },   // ET
    endTime:    { type: String, default: '5:00 PM' },    // ET
    activeDays: { type: [Number], default: [1,2,3,4,5] }, // 0=Sun … 6=Sat, default Mon–Fri
    timezone:   { type: String, default: 'America/New_York' }
}, { timestamps: true });

module.exports = mongoose.model('ScheduleSettings', scheduleSettingsSchema);

