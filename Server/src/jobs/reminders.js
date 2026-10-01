const cron = require('node-cron');
const Booking = require('../models/Booking');
const { sendEmail } = require('../services/email');
const moment = require('moment-timezone');

const ET_ZONE = 'America/New_York';

const setupReminders = () => {
    // Run every minute
    cron.schedule('* * * * *', async () => {
        try {
            const now = moment().tz(ET_ZONE);

            // Find confirmed bookings that haven't had reminders sent
            const bookings = await Booking.find({
                status: 'confirmed',
                $or: [
                    { reminderSent30min: false },
                    { reminderSent5min: false }
                ]
            });

            for (const booking of bookings) {
                if (!booking.utcDateTime) continue;

                const bookingTime = moment(booking.utcDateTime).tz(ET_ZONE);
                const timeDiffMins = bookingTime.diff(now, 'minutes'); // positive means in future

                if (timeDiffMins >= 0 && timeDiffMins <= 30 && !booking.reminderSent30min) {
                    await sendReminderEmail(booking, '30 minutes');
                    booking.reminderSent30min = true;
                    await booking.save();
                } else if (timeDiffMins >= 0 && timeDiffMins <= 5 && !booking.reminderSent5min) {
                    await sendReminderEmail(booking, '5 minutes');
                    booking.reminderSent5min = true;
                    await booking.save();
                }
            }

            // Auto-update statuses
            const activeBookings = await Booking.find({
                status: { $in: ['confirmed'] }
            });

            for (const booking of activeBookings) {
                if (!booking.utcDateTime) continue;
                
                const bookingTime = moment(booking.utcDateTime).tz(ET_ZONE);
                const pastMins = now.diff(bookingTime, 'minutes'); // positive means in the past

                if (pastMins >= 30) {
                    booking.status = 'completed';
                    await booking.save();
                }
            }
        } catch (error) {
            console.error('Reminder Job Error:', error);
        }
    });
};

const sendReminderEmail = async (booking, timeText) => {
    const adminEmail = process.env.EMAIL_USER || 'rashedul.afl@gmail.com';
    const subject = `Your consultation starts in ${timeText} — MailStora`;
    
    // Client Email
    const clientContent = `
        <p>Hi <strong>${booking.client.name}</strong>,</p>
        <p>This is a friendly reminder that your consultation with <strong>MailStora</strong> is starting in <strong>${timeText}</strong>.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
            <tr style="background-color:#f9fafb;"><td style="padding:10px 16px;font-weight:bold;width:40%;border-bottom:1px solid #e5e7eb;">Date &amp; Time</td><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;">${booking.date} at ${booking.timeSlot}</td></tr>
            <tr><td style="padding:10px 16px;font-weight:bold;">Method</td><td style="padding:10px 16px;text-transform:capitalize;">${booking.meetingMethod.replace('_', ' ')}</td></tr>
        </table>
        <p style="margin-top:16px;">Please get ready a few minutes early. We look forward to speaking with you! If you need to contact us urgently, please reply to this email or reach out on <a href="https://wa.me/8801744350705" style="color:#2d287b;">WhatsApp</a>.</p>
    `;
    
    await sendEmail(
        booking.client.email,
        subject,
        `Your consultation starts in ${timeText}.`,
        clientContent,
        { title: `⏰ Starting in ${timeText}`, preheader: `Your MailStora consultation is starting in ${timeText}.` }
    );
};

module.exports = setupReminders;
