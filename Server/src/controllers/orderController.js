const Order = require('../models/Order');
const baseController = require('./baseController');
const CustomerService = require('../services/CustomerService');
const Customer = require('../models/Customer');

exports.getAll = async (req, res) => {
    try {
        const orders = await Order.find().populate('customer').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('customer');
        if (!order) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(order);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
    try {
        // Assume req.body contains customer details if it's a new customer
        let customerId = req.body.customer;
        if (!customerId && req.body.email) {
            const customer = await CustomerService.handleCustomerActivity({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                company_name: req.body.company_name,
                source: 'order',
                is_order: true
            });
            customerId = customer._id;
        }
        const order = await Order.create({ ...req.body, customer: customerId });
        res.status(201).json(order);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.update = baseController.update(Order);
exports.remove = baseController.remove(Order);
