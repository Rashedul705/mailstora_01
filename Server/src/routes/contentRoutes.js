const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const authMiddleware = require('../middleware/auth');

// Public routes 
router.get('/', contentController.getAllContent);
router.get('/:sectionId', contentController.getContentById);

// Protected admin routes
router.put('/:sectionId', authMiddleware, contentController.updateContent);

module.exports = router;
