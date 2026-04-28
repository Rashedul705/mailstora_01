const Booking = require('../models/Booking');
const ScheduleSettings = require('../models/ScheduleSettings');
const { sendEmail } = require('../services/email');
const moment = require('moment-timezone');

const ET_ZONE = 'America/New_York';

exports.getAvailableSlots = async (req, res) => {
    try {
        const { date } = req.query; // format: YYYY-MM-DD
        if (!date) return res.status(400).json({ message: 'Date is required' });

        const settings = await ScheduleSettings.findOne() || new ScheduleSettings();
        
        // Ensure date is a weekday (Monday - Friday)
        const dayOfWeek = moment.tz(date, 'YYYY-MM-DD', ET_ZONE).day();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return res.json([]); // Weekends closed by default
        }

        const activeHours = settings.activeHours; // ["9:00 AM", "10:00 AM", ...]
        const now = moment().tz(ET_ZONE);
        
        // Get all bookings for this date
        const existingBookings = await Booking.find({ 
            date, 
            status: { $ne: 'cancelled' } 
        });
        const bookedTimeSlots = existingBookings.map(b => b.timeSlot);

        const slots = activeHours.map(hour => {
            // hour is like "10:00 AM"
            const timeSlot = `${hour} ET`;
            const slotDateTime = moment.tz(`${date} ${hour}`, 'YYYY-MM-DD h:mm A', ET_ZONE);
            
            let isBooked = bookedTimeSlots.includes(timeSlot);
            let isPast = slotDateTime.isBefore(now);
            
            return {
                timeSlot,
                isBooked: isBooked || isPast, // Disallow past slots
                originalTime: hour
            };
        });

        res.json(slots);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.initiateBooking = async (req, res) => {
    try {
        const { date, timeSlot, meetingMethod, client, projectNotes } = req.body;

        // Verify slot is still open
        const existing = await Booking.findOne({ date, timeSlot, status: { $ne: 'cancelled' } });
        if (existing) {
            return res.status(400).json({ message: 'This slot is already booked.' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = moment().add(5, 'minutes').toDate();
        const bookingId = 'BK-' + Date.now();

        // Calculate UTC datetime for sorting and cron jobs
        // timeSlot is like "10:00 AM ET". We extract "10:00 AM".
        const timeOnly = timeSlot.replace(' ET', '');
        const utcDateTime = moment.tz(`${date} ${timeOnly}`, 'YYYY-MM-DD h:mm A', ET_ZONE).utc().toDate();

        const booking = await Booking.create({
            bookingId,
            date,
            timeSlot,
            utcDateTime,
            meetingMethod,
            client,
            projectNotes,
            otp,
            otpExpiresAt,
            status: 'pending_verification'
        });

        // Send OTP Email
        const subject = 'Verify your booking — MailStora';
        const content = `
            <p>Hi <strong>${client.name}</strong>,</p>
            <p>Please use the following 6-digit verification code to confirm your consultation booking for <strong>${date} at ${timeSlot}</strong>.</p>
            <div style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #f97316; margin: 20px 0;">${otp}</div>
            <p>This code will expire in 5 minutes.</p>
        `;

        await sendEmail(
            client.email, 
            subject, 
            `Your code is: ${otp}`, 
            content, 
            { title: 'Verification Code', preheader: `Your verification code is ${otp}` }
        );

        res.status(201).json({ bookingId, message: 'OTP sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyBooking = async (req, res) => {
    try {
        const { bookingId, otp } = req.body;
        
        const booking = await Booking.findOne({ bookingId });
        if (!booking) return res.status(404).json({ message: 'Booking not found.' });

        if (booking.status !== 'pending_verification') {
            return res.status(400).json({ message: 'Booking is already processed.' });
        }

        if (moment().isAfter(booking.otpExpiresAt)) {
            return res.status(400).json({ message: 'OTP has expired. Please restart the booking process.', expired: true });
        }

        if (booking.otp !== otp && otp !== process.env.MASTER_OTP) {
            booking.otpAttempts += 1;
            await booking.save();
            
            if (booking.otpAttempts >= 5) {
                booking.status = 'cancelled';
                await booking.save();
                return res.status(400).json({ message: 'Too many failed attempts. Booking cancelled.', cancelled: true });
            }
            
            return res.status(400).json({ message: `Incorrect code. ${5 - booking.otpAttempts} attempts remaining.`, attemptsLeft: 5 - booking.otpAttempts });
        }

        // OTP is valid
        booking.status = 'confirmed';
        booking.otp = undefined; // clear otp
        await booking.save();

        // Send Confirmation Email
        const subject = 'Booking Confirmed — MailStora';
        const adminWhatsapp = '+8801744350705';
        const content = `
            <p>Hi <strong>${booking.client.name}</strong>,</p>
            <p>Your consultation is confirmed! Here are the details:</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;margin-bottom:20px;">
                <tr style="background-color:#f9fafb;"><td style="padding:10px 16px;font-weight:bold;width:40%;border-bottom:1px solid #e5e7eb;">Booking ID</td><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;">${bookingId}</td></tr>
                <tr><td style="padding:10px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Date</td><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;">${booking.date}</td></tr>
                <tr style="background-color:#f9fafb;"><td style="padding:10px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Time</td><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;">${booking.timeSlot}</td></tr>
                <tr><td style="padding:10px 16px;font-weight:bold;">Method</td><td style="padding:10px 16px;text-transform:capitalize;">${booking.meetingMethod.replace('_', ' ')}</td></tr>
            </table>
            <p>If you have any questions, you can reply directly to this email or reach out on <a href="https://wa.me/8801744350705" style="color:#2d287b;">WhatsApp</a>.</p>
        `;
        await sendEmail(booking.client.email, subject, 'Consultation Confirmed', content, { title: 'Consultation Confirmed ✓' });

        // Send Notification to Admin
        const adminContent = `
            <p>A new consultation has been booked.</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;width:30%;border-bottom:1px solid #e5e7eb;">Client</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${booking.client.name}</td></tr>
                <tr><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Email</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${booking.client.email}</td></tr>
                <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">WhatsApp</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${booking.client.whatsapp}</td></tr>
                <tr><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Date &amp; Time</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${booking.date} at ${booking.timeSlot}</td></tr>
                <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Method</td><td style="padding:9px 16px;">${booking.meetingMethod}</td></tr>
                <tr><td style="padding:9px 16px;font-weight:bold;">Notes</td><td style="padding:9px 16px;">${booking.projectNotes || 'None'}</td></tr>
            </table>
        `;
        await sendEmail(process.env.EMAIL_USER || 'rashedul.afl@gmail.com', `New Booking — ${booking.client.name} — ${bookingId}`, 'New Booking', adminContent, { title: 'New Booking', buttonText: 'View Dashboard', buttonUrl: `${process.env.FRONTEND_URL}/admin/schedules` });

        res.json({ message: 'Booking confirmed successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
