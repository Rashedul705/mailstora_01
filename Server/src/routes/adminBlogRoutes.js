const express = require('express');
const router = express.Router();
const adminBlogController = require('../controllers/adminBlogController');
const verifyToken = require('../middleware/auth');
const multer = require('multer');

// Memory storage for ImgBB upload since we need the buffer
const upload = multer({ storage: multer.memoryStorage() });

// Apply auth middleware to all admin blog routes
router.use(verifyToken);

// @route   GET /api/admin/blog
// @desc    Get all posts (including drafts/scheduled)
router.get('/', adminBlogController.getAllPosts);

// @route   POST /api/admin/blog
// @desc    Create new post
router.post('/', adminBlogController.createPost);

// @route   POST /api/admin/blog/upload-image
// @desc    Upload image to ImgBB
router.post('/upload-image', upload.single('image'), adminBlogController.uploadImage);

// @route   GET /api/admin/blog/:id
// @desc    Get post for editing
router.get('/:id', adminBlogController.getPostForEditing);

// @route   PUT /api/admin/blog/:id
// @desc    Update post
router.put('/:id', adminBlogController.updatePost);

// @route   DELETE /api/admin/blog/:id
// @desc    Delete post
router.delete('/:id', adminBlogController.deletePost);

module.exports = router;
