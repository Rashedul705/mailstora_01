const ScheduleRequest = require('../models/ScheduleRequest');

// Public: Submit a new schedule request
exports.submitSchedule = async (req, res) => {
    try {
        const newSchedule = new ScheduleRequest({
            customer_id: req.customer_id, // Attached by customerIntercept middleware
            name: req.body.name,
            email: req.body.email,
            meeting_type: req.body.meeting_type,
            preferred_date: req.body.preferred_date,
            preferred_time: req.body.preferred_time,
            message: req.body.message || ''
        });
        await newSchedule.save();
        res.status(201).json({ message: 'Meeting scheduled successfully', data: newSchedule });
    } catch (error) {
        res.status(500).json({ message: 'Error scheduling meeting', error: error.message });
    }
};

// Admin: Get all schedules
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await ScheduleRequest.find().populate('customer_id', 'name email').sort({ created_at: -1 });
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedules', error: error.message });
    }
};

// Admin: Update schedule status
exports.updateScheduleStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const schedule = await ScheduleRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        res.json({ message: 'Schedule status updated', data: schedule });
    } catch (error) {
        res.status(500).json({ message: 'Error updating schedule status', error: error.message });
    }
};

// Admin: Delete schedule
exports.deleteSchedule = async (req, res) => {
    try {
        const schedule = await ScheduleRequest.findByIdAndDelete(req.params.id);
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        res.json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting schedule', error: error.message });
    }
};
