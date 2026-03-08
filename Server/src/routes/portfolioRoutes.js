const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/auth');

// Public routes for landing page
router.get('/', portfolioController.getAllProjects);
router.get('/:id', portfolioController.getProjectById);

// Protected admin routes
router.use(authMiddleware);
router.post('/', portfolioController.createProject);
router.put('/:id', portfolioController.updateProject);
router.delete('/:id', portfolioController.deleteProject);

module.exports = router;
