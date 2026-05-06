const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// @route   GET /api/blog
// @desc    Get published blog posts with pagination, filtering
router.get('/', blogController.getPublishedPosts);

// @route   POST /api/blog/subscribe
// @desc    Subscribe to blog newsletter
router.post('/subscribe', blogController.subscribeToNewsletter);

// @route   GET /api/blog/:slug
// @desc    Get single post by slug and increment views
router.get('/:slug', blogController.getSinglePost);

module.exports = router;
