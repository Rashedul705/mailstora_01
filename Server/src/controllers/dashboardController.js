const Quote = require('../models/Quote');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

exports.getDashboardStats = async (req, res) => {
    try {
        // --- 1. Quotes ---
        const [totalQuotes, newQuotes, reviewedQuotes, repliedQuotes, closedQuotes, recentQuotes] = await Promise.all([
            Quote.countDocuments(),
            Quote.countDocuments({ status: 'new' }),
            Quote.countDocuments({ status: 'reviewed' }),
            Quote.countDocuments({ status: 'replied' }),
            Quote.countDocuments({ status: 'closed' }),
            Quote.find().sort({ submittedAt: -1 }).limit(5).lean()
        ]);

        // --- 2. Schedules (Bookings) ---
        // Calculate dates in ET
        const nowInET = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
        
        // Today string: YYYY-MM-DD
        const todayStr = nowInET.getFullYear() + '-' + String(nowInET.getMonth() + 1).padStart(2, '0') + '-' + String(nowInET.getDate()).padStart(2, '0');
        
        // This Month string: YYYY-MM
        const thisMonthStr = nowInET.getFullYear() + '-' + String(nowInET.getMonth() + 1).padStart(2, '0');
        
        // This week calculation (Monday to Sunday)
        const dayOfWeek = nowInET.getDay(); // 0 is Sunday
        const diffToMonday = nowInET.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        const monday = new Date(nowInET);
        monday.setDate(diffToMonday);
        
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        
        const mondayStr = monday.getFullYear() + '-' + String(monday.getMonth() + 1).padStart(2, '0') + '-' + String(monday.getDate()).padStart(2, '0');
        const sundayStr = sunday.getFullYear() + '-' + String(sunday.getMonth() + 1).padStart(2, '0') + '-' + String(sunday.getDate()).padStart(2, '0');

        const [todayBookings, weekBookings, monthBookings, pendingVerification, upcomingSchedules] = await Promise.all([
            Booking.countDocuments({ status: 'confirmed', date: todayStr }),
            Booking.countDocuments({ status: 'confirmed', date: { $gte: mondayStr, $lte: sundayStr } }),
            Booking.countDocuments({ status: 'confirmed', date: { $regex: '^' + thisMonthStr } }),
            Booking.countDocuments({ status: 'pending_verification' }),
            Booking.find({ status: 'confirmed', utcDateTime: { $gte: new Date() } }).sort({ utcDateTime: 1 }).limit(5).lean()
        ]);

        // --- 3. Business Overview ---
        // Orders: status can be 'Pending', 'In Progress', 'Completed', 'Delivered', 'Cancelled'
        const [totalCustomers, totalOrders, inProgressOrders, completedOrdersList] = await Promise.all([
            Customer.countDocuments(),
            Order.countDocuments(),
            Order.countDocuments({ status: 'In Progress' }),
            Order.find({ status: 'Completed' }, { amount: 1 }).lean()
        ]);

        const totalRevenue = completedOrdersList.reduce((sum, order) => sum + (order.amount || 0), 0);

        // --- 4. Recent Tables ---
        const [recentOrders, recentCustomers] = await Promise.all([
            Order.find().populate('customer').sort({ createdAt: -1 }).limit(5).lean(),
            Customer.find().sort({ created_at: -1 }).limit(5).lean()
        ]);

        res.json({
            quotes: {
                total: totalQuotes,
                new: newQuotes,
                reviewed: reviewedQuotes,
                replied: repliedQuotes,
                closed: closedQuotes,
                recent: recentQuotes
            },
            schedules: {
                today: todayBookings,
                thisWeek: weekBookings,
                thisMonth: monthBookings,
                pendingVerification: pendingVerification,
                upcoming: upcomingSchedules
            },
            business: {
                totalCustomers,
                totalRevenue,
                totalOrders,
                inProgress: inProgressOrders
            },
            recentOrders,
            recentCustomers
        });

    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
};
