const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const verifyAdmin = require('../middleware/auth');

// Admin only routes
router.get('/', verifyAdmin, invoiceController.getInvoices);
router.get('/generate/:orderId', verifyAdmin, invoiceController.generateInvoice);

module.exports = router;
