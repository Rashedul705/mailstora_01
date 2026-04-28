const express = require('express');
const router = express.Router();
const adminScheduleController = require('../controllers/adminScheduleController');
const verifyToken = require('../middleware/auth');

// Protect all admin routes
router.use(verifyToken);

router.get('/', adminScheduleController.getAdminSchedule);
router.patch('/hours', adminScheduleController.saveActiveHours);
router.patch('/:bookingId/status', adminScheduleController.updateBookingStatus);
router.post('/:bookingId/message', adminScheduleController.sendMessage);

module.exports = router;
