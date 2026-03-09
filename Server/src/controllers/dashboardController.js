const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Quote = require('../models/Quote');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalCustomers = await Customer.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Count Quotes
        const totalQuotes = await Quote.countDocuments();
        const pendingQuotes = await Quote.countDocuments({ status: { $in: ['new', 'contacted', 'negotiation'] } });
        const newQuotes = await Quote.countDocuments({ status: 'new' });

        // Calculate Total Revenue from all orders (assuming they have amount field and are not Cancelled)
        const orders = await Order.find({ status: { $ne: 'Cancelled' } });
        const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

        // Fetch 5 Recent Orders
        const recentOrders = await Order.find()
            .populate('customer')
            .sort({ createdAt: -1 })
            .limit(5);

        // Fetch 5 Recent Quotes
        const recentQuotes = await Quote.find()
            .populate('customer')
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            totalCustomers,
            totalOrders,
            totalQuotes,
            newQuotes,
            pendingQuotes,
            totalRevenue,
            recentOrders,
            recentQuotes
        });
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ error: error.message });
    }
};
