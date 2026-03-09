const Inquiry = require('../models/Inquiry');
const baseController = require('./baseController');
const CustomerService = require('../services/CustomerService');

exports.getAll = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().populate('customer').sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id).populate('customer');
        if (!inquiry) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(inquiry);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const customer = await CustomerService.handleCustomerActivity({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            company_name: req.body.company,
            source: 'inquiry',
            is_order: false
        });

        const inquiry = await Inquiry.create({ ...req.body, customer: customer._id });
        res.status(201).json(inquiry);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.update = baseController.update(Inquiry);
exports.remove = baseController.remove(Inquiry);
