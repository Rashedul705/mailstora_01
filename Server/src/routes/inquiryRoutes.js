const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const authMiddleware = require('../middleware/auth');

// Public route for form submission
router.post('/', inquiryController.createInquiry);

// Protected admin routes
router.use(authMiddleware);
router.get('/', inquiryController.getAllInquiries);
router.put('/:id/read', inquiryController.markAsRead);
router.delete('/:id', inquiryController.deleteInquiry);

module.exports = router;
