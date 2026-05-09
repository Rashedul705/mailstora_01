const express = require('express');
const router = express.Router();
const controller = require('../controllers/portfolioController');

router.get('/', controller.getPublished);
router.get('/featured', controller.getFeatured);
router.get('/counts', controller.getCounts);
router.get('/stats', controller.getStats);
router.get('/:slug', controller.getBySlug);

module.exports = router;
