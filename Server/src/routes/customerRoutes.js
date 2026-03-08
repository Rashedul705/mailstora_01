const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const verifyAdmin = require('../middleware/auth');

// CRM Routes (Admin Only)
router.get('/', verifyAdmin, customerController.getAllCustomers);
router.get('/:id', verifyAdmin, customerController.getCustomerById);
router.delete('/:id', verifyAdmin, customerController.deleteCustomer);

module.exports = router;
