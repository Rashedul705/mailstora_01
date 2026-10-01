const express = require('express');
const router  = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/settings', bookingController.getSettings);
router.get('/available', bookingController.getAvailableSlots);
router.post('/initiate', bookingController.initiateBooking);
router.post('/verify',   bookingController.verifyBooking);

module.exports = router;
