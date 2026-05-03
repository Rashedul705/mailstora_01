const mongoose = require('mongoose');

const scheduleSettingsSchema = new mongoose.Schema({
    availability: [{
        day: { type: String },
        enabled: { type: Boolean, default: false },
        startBDT: { type: String },
        endBDT: { type: String },
        startET: { type: String },
        endET: { type: String }
    }],
    timezone:   { type: String, default: 'America/New_York' }
}, { timestamps: true });

module.exports = mongoose.model('ScheduleSettings', scheduleSettingsSchema);

