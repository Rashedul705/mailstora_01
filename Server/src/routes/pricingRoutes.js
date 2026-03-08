const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');
const authMiddleware = require('../middleware/auth');

// Public route for landing page
router.get('/', pricingController.getAllPackages);

// Protected admin routes
router.use(authMiddleware);
router.post('/', pricingController.createPackage);
router.put('/:id', pricingController.updatePackage);
router.delete('/:id', pricingController.deletePackage);

module.exports = router;
