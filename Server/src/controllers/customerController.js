const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Inquiry = require('../models/Inquiry');
const QuoteRequest = require('../models/QuoteRequest');
const ScheduleRequest = require('../models/ScheduleRequest');

// Get all customers (For CRM List)
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().sort({ last_activity: -1 });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error: error.message });
    }
};

// Get single customer with deep relation population (For CRM Profile)
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });

        // Fetch related entities concurrently
        const [orders, inquiries, quotes, schedules] = await Promise.all([
            Order.find({ customer_id: customer._id }).sort({ created_at: -1 }),
            Inquiry.find({ customer_id: customer._id }).sort({ created_at: -1 }),
            QuoteRequest.find({ customer_id: customer._id }).sort({ created_at: -1 }),
            ScheduleRequest.find({ customer_id: customer._id }).sort({ created_at: -1 })
        ]);

        res.json({
            profile: customer,
            history: {
                orders,
                inquiries,
                quotes,
                schedules
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customer relationships', error: error.message });
    }
};

// Delete customer and optionally cascade delete their history
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });

        // Optional Cascade Delete Strategy based on query param
        if (req.query.cascade === 'true') {
            await Promise.all([
                Order.deleteMany({ customer_id: customer._id }),
                Inquiry.deleteMany({ customer_id: customer._id }),
                QuoteRequest.deleteMany({ customer_id: customer._id }),
                ScheduleRequest.deleteMany({ customer_id: customer._id })
            ]);
        }

        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error: error.message });
    }
};
