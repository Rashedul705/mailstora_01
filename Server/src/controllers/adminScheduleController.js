const Booking = require('../models/Booking');
const ScheduleSettings = require('../models/ScheduleSettings');
const { sendEmail } = require('../services/email');
const moment = require('moment-timezone');

const ET_ZONE = 'America/New_York';

exports.getAdminSchedule = async (req, res) => {
    try {
        const now = moment().tz(ET_ZONE);
        
        // Settings for active hours grid
        const settings = await ScheduleSettings.findOne() || await ScheduleSettings.create({});

        // All bookings sorted
        const bookings = await Booking.find().sort({ utcDateTime: 1 });

        let todayCount = 0;
        let weekCount = 0;
        let confirmedCount = 0;
        let pendingCount = 0;

        const upcomingBookings = [];

        bookings.forEach(b => {
            if (b.status === 'confirmed') confirmedCount++;
            if (b.status === 'pending_verification') pendingCount++;

            if (!b.utcDateTime) return;
            const bTime = moment(b.utcDateTime).tz(ET_ZONE);

            if (bTime.isSame(now, 'day')) todayCount++;
            if (bTime.isSame(now, 'week')) weekCount++;

            // Only return upcoming or ongoing (within last hour) bookings for the list
            if (bTime.isAfter(now.clone().subtract(1, 'hours'))) {
                upcomingBookings.push(b);
            }
        });

        res.json({
            stats: {
                today: todayCount,
                thisWeek: weekCount,
                confirmed: confirmedCount,
                pending: pendingCount
            },
            activeHours: settings.activeHours,
            upcomingBookings
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.saveActiveHours = async (req, res) => {
    try {
        const { activeHours } = req.body;
        if (!Array.isArray(activeHours)) return res.status(400).json({ message: 'activeHours must be an array' });

        let settings = await ScheduleSettings.findOne();
        if (!settings) {
            settings = await ScheduleSettings.create({ activeHours });
        } else {
            settings.activeHours = activeHours;
            await settings.save();
        }

        res.json({ message: 'Active hours saved successfully', activeHours: settings.activeHours });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;

        const booking = await Booking.findOne({ bookingId });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.status = status;
        await booking.save();

        if (status === 'cancelled') {
            const content = `
                <p>Hi <strong>${booking.client.name}</strong>,</p>
                <p>Your consultation booking scheduled for <strong>${booking.date} at ${booking.timeSlot}</strong> has been cancelled.</p>
                <p>If you have any questions or would like to reschedule, please feel free to reach out to us.</p>
            `;
            await sendEmail(booking.client.email, 'Booking Cancelled — MailStora', 'Consultation Cancelled', content, { title: 'Booking Cancelled' });
        }

        res.json({ message: 'Booking status updated successfully', booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { message } = req.body;

        if (!message) return res.status(400).json({ message: 'Message is required' });

        const booking = await Booking.findOne({ bookingId });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.conversation.push({
            from: 'admin',
            message,
            sentAt: new Date()
        });
        await booking.save();

        const content = `
            <p>Hi <strong>${booking.client.name}</strong>,</p>
            <p>You have a new message from MailStora regarding your consultation:</p>
            <blockquote style="border-left: 4px solid #f97316; padding-left: 16px; margin-left: 0; font-style: italic; color: #4b5563;">
                ${message}
            </blockquote>
            <p>You can reply directly to this email to continue the conversation.</p>
        `;
        await sendEmail(booking.client.email, 'New Message regarding your Consultation', 'New Message', content, { title: 'New Message from MailStora' });

        res.json({ message: 'Message sent successfully', conversation: booking.conversation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
