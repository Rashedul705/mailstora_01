const Quote = require('../models/Quote');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

exports.getDashboardStats = async (req, res) => {
    try {
        // ─────────────────────────────────────────────
        // 1. Quotes — all statuses from DB
        // ─────────────────────────────────────────────
        const [
            totalQuotes,
            newQuotes,
            reviewedQuotes,
            repliedQuotes,
            closedQuotes,
            recentQuotes
        ] = await Promise.all([
            Quote.countDocuments(),
            Quote.countDocuments({ status: 'new' }),
            Quote.countDocuments({ status: 'reviewed' }),
            Quote.countDocuments({ status: 'replied' }),
            Quote.countDocuments({ status: 'closed' }),
            Quote.find()
                .sort({ submittedAt: -1 })
                .limit(5)
                .lean()
        ]);

        // ─────────────────────────────────────────────
        // 2. Schedules (Bookings) — date window helpers
        // ─────────────────────────────────────────────
        // All date ranges calculated in ET timezone
        const nowInET = new Date(
            new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
        );

        // Today: YYYY-MM-DD
        const todayStr = [
            nowInET.getFullYear(),
            String(nowInET.getMonth() + 1).padStart(2, '0'),
            String(nowInET.getDate()).padStart(2, '0')
        ].join('-');

        // This Month prefix: YYYY-MM
        const thisMonthStr = [
            nowInET.getFullYear(),
            String(nowInET.getMonth() + 1).padStart(2, '0')
        ].join('-');

        // This week: Monday → Sunday
        const dayOfWeek = nowInET.getDay(); // 0 = Sunday
        const diffToMonday = nowInET.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        const monday = new Date(nowInET);
        monday.setDate(diffToMonday);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const mondayStr = [
            monday.getFullYear(),
            String(monday.getMonth() + 1).padStart(2, '0'),
            String(monday.getDate()).padStart(2, '0')
        ].join('-');

        const sundayStr = [
            sunday.getFullYear(),
            String(sunday.getMonth() + 1).padStart(2, '0'),
            String(sunday.getDate()).padStart(2, '0')
        ].join('-');

        // Active = confirmed OR pending_verification (exclude only cancelled/completed)
        const activeStatuses = { status: { $in: ['confirmed', 'pending_verification'] } };

        const [
            totalSchedules,
            todayBookings,
            weekBookings,
            monthBookings,
            pendingVerification,
            confirmedCount,
            cancelledCount,
            upcomingSchedules
        ] = await Promise.all([
            // Total (all ever booked)
            Booking.countDocuments(),
            // Today — any active booking
            Booking.countDocuments({ ...activeStatuses, date: todayStr }),
            // This week — any active booking
            Booking.countDocuments({ ...activeStatuses, date: { $gte: mondayStr, $lte: sundayStr } }),
            // This month — any active booking
            Booking.countDocuments({ ...activeStatuses, date: { $regex: '^' + thisMonthStr } }),
            // Pending verification (needs OTP confirm)
            Booking.countDocuments({ status: 'pending_verification' }),
            // Confirmed count
            Booking.countDocuments({ status: 'confirmed' }),
            // Cancelled count
            Booking.countDocuments({ status: 'cancelled' }),
            // Upcoming confirmed — next 5
            Booking.find({
                status: 'confirmed',
                utcDateTime: { $gte: new Date() }
            }).sort({ utcDateTime: 1 }).limit(5).lean()
        ]);

        // ─────────────────────────────────────────────
        // 3. Business Overview
        // ─────────────────────────────────────────────
        const [
            totalCustomers,
            totalOrders,
            inProgressOrders,
            revenueOrders
        ] = await Promise.all([
            Customer.countDocuments(),
            Order.countDocuments(),
            Order.countDocuments({ status: 'In Progress' }),
            // Count Completed AND Delivered for revenue
            Order.find(
                { status: { $in: ['Completed', 'Delivered'] } },
                { amount: 1 }
            ).lean()
        ]);

        const totalRevenue = revenueOrders.reduce(
            (sum, order) => sum + (order.amount || 0),
            0
        );

        // ─────────────────────────────────────────────
        // 4. Recent table rows
        // ─────────────────────────────────────────────
        const [recentOrders, recentCustomers] = await Promise.all([
            Order.find()
                .populate('customer')
                .sort({ createdAt: -1 })
                .limit(5)
                .lean(),
            Customer.find()
                .sort({ created_at: -1 })
                .limit(5)
                .lean()
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
                total: totalSchedules,
                confirmed: confirmedCount,
                cancelled: cancelledCount,
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
