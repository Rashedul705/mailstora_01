const ScheduleRequest = require('../models/ScheduleRequest');
const baseController = require('./baseController');
const CustomerService = require('../services/CustomerService');

exports.getAll = async (req, res) => {
    try {
        const schedules = await ScheduleRequest.find().populate('customer').sort({ createdAt: -1 });
        res.status(200).json(schedules);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const schedule = await ScheduleRequest.findById(req.params.id).populate('customer');
        if (!schedule) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(schedule);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const customer = await CustomerService.handleCustomerActivity({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            company_name: req.body.company,
            source: 'schedule',
            is_order: false
        });

        const schedule = await ScheduleRequest.create({ ...req.body, customer: customer._id });
        res.status(201).json(schedule);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.update = baseController.update(ScheduleRequest);
exports.remove = baseController.remove(ScheduleRequest);
