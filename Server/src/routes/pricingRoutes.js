const express = require('express');
const router = express.Router();
const controller = require('../controllers/pricingController');

router.get('/', controller.getPublicPricing);
router.get('/settings', controller.getSettings);

module.exports = router;
