const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const verifyAdmin = require('../middleware/auth');
const customerIntercept = require('../middlewares/customerIntercept');

// Public Route (Requires global interceptor to create/update CRM profile)
router.post('/', customerIntercept, scheduleController.submitSchedule);

// Admin Routes
router.get('/', verifyAdmin, scheduleController.getAllSchedules);
router.patch('/:id/status', verifyAdmin, scheduleController.updateScheduleStatus);
router.delete('/:id', verifyAdmin, scheduleController.deleteSchedule);

module.exports = router;
