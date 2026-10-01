const mongoose = require('mongoose');

// Admin activity log and content revisions
const activitySchema = new mongoose.Schema({
    user: String,
    role: String,
    method: String,
    path: String,
    status: Number,
    ip: String,
}, { timestamps: true });
activitySchema.index({ createdAt: -1 });

const revisionSchema = new mongoose.Schema({
    kind: { type: String, required: true }, // 'seo-entry' | 'site-settings' | 'seo-settings'
    ref: { type: String, required: true },  // page path or settings key
    data: mongoose.Schema.Types.Mixed,      // the value BEFORE the change
    user: String,
}, { timestamps: true });
revisionSchema.index({ kind: 1, ref: 1, createdAt: -1 });

module.exports = {
    Activity: mongoose.model('Activity', activitySchema),
    Revision: mongoose.model('Revision', revisionSchema),
};
