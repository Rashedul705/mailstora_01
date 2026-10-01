const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// @route GET /api/dashboard
router.get('/', dashboardController.getDashboardStats);

module.exports = router;
