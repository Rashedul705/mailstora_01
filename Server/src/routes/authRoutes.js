const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/verify', authMiddleware, authController.verifyToken);
router.post('/change-password', authMiddleware, authController.changePassword);

module.exports = router;
