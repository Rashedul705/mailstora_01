const Booking = require('../models/Booking');
const ScheduleSettings = require('../models/ScheduleSettings');
const { sendEmail } = require('../services/email');
const moment = require('moment-timezone');

const ET_ZONE = 'America/New_York';

exports.getAdminSchedule = async (req, res) => {
    try {
        const now = moment().tz(ET_ZONE);
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

            if (bTime.isAfter(now.clone().subtract(24, 'hours'))) {
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
            upcomingBookings
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAvailability = async (req, res) => {
    try {
        let settings = await ScheduleSettings.findOne();
        if (!settings) settings = await ScheduleSettings.create({ availability: [] });
        res.json({ availability: settings.availability });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const bdtToEt = (timeStr) => {
    if (!timeStr) return '';
    let [h, m] = timeStr.split(':').map(Number);
    h -= 10;
    if (h < 0) h += 24;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

exports.saveAvailability = async (req, res) => {
    try {
        const { availability } = req.body;
        if (!Array.isArray(availability)) return res.status(400).json({ message: 'availability array is required' });

        const mappedAvailability = availability.map(dayObj => {
            return {
                ...dayObj,
                startET: dayObj.enabled && dayObj.startBDT ? bdtToEt(dayObj.startBDT) : '',
                endET: dayObj.enabled && dayObj.endBDT ? bdtToEt(dayObj.endBDT) : ''
            };
        });

        let settings = await ScheduleSettings.findOne();
        if (!settings) {
            settings = await ScheduleSettings.create({ availability: mappedAvailability });
        } else {
            settings.availability = mappedAvailability;
            await settings.save();
        }

        res.json({ message: 'Availability saved', availability: settings.availability });
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
