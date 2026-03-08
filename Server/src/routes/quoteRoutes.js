const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const verifyAdmin = require('../middleware/auth');
const customerIntercept = require('../middlewares/customerIntercept');

// Public Route (Requires global interceptor to create/update CRM profile)
router.post('/', customerIntercept, quoteController.submitQuote);

// Admin Routes
router.get('/', verifyAdmin, quoteController.getAllQuotes);
router.patch('/:id/status', verifyAdmin, quoteController.updateQuoteStatus);
router.delete('/:id', verifyAdmin, quoteController.deleteQuote);

module.exports = router;
