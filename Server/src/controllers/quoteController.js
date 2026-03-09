const Quote = require('../models/Quote');
const baseController = require('./baseController');
const CustomerService = require('../services/CustomerService');

exports.getAll = async (req, res) => {
    try {
        const quotes = await Quote.find().populate('customer').sort({ createdAt: -1 });
        res.status(200).json(quotes);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id).populate('customer');
        if (!quote) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(quote);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const customer = await CustomerService.handleCustomerActivity({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            company_name: req.body.company,
            source: 'quote',
            is_order: false
        });

        const quote = await Quote.create({ ...req.body, customer: customer._id });
        res.status(201).json(quote);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.update = baseController.update(Quote);
exports.remove = baseController.remove(Quote);
