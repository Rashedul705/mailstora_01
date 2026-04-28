const mongoose = require('mongoose');

const scheduleSettingsSchema = new mongoose.Schema({
    activeHours: { 
        type: [String], 
        default: [
            "9:00 AM", "10:00 AM", "11:00 AM", 
            "12:00 PM", "1:00 PM", "2:00 PM", 
            "3:00 PM", "4:00 PM", "5:00 PM"
        ] 
    }, // 1-hour intervals e.g. "9:00 AM"
    timezone: { type: String, default: 'America/New_York' } // Locked to ET
}, { timestamps: true });

module.exports = mongoose.model('ScheduleSettings', scheduleSettingsSchema);
