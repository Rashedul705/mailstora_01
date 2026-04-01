const cron = require('node-cron');
const ScheduleRequest = require('../models/ScheduleRequest');
const { sendEmail } = require('../services/email');
const moment = require('moment-timezone');

const setupReminders = () => {
    // Run every minute
    cron.schedule('* * * * *', async () => {
        try {
            const now = moment.utc();

            // Find confirmed or pending bookings that haven't had reminders sent
            const bookings = await ScheduleRequest.find({
                status: { $in: ['Confirmed', 'Pending'] },
                $or: [
                    { 'remindersSent.before30min': false },
                    { 'remindersSent.before5min': false }
                ]
            });

            for (const booking of bookings) {
                if (!booking.utcDateTime) continue;

                const bookingTime = moment(booking.utcDateTime);
                const timeDiffMins = bookingTime.diff(now, 'minutes'); // positive means in future

                if (timeDiffMins >= 0 && timeDiffMins <= 30 && !booking.remindersSent.before30min) {
                    await sendReminderEmail(booking, '30 minutes');
                    booking.remindersSent.before30min = true;
                    await booking.save();
                } else if (timeDiffMins >= 0 && timeDiffMins <= 5 && !booking.remindersSent.before5min) {
                    await sendReminderEmail(booking, '5 minutes');
                    booking.remindersSent.before5min = true;
                    await booking.save();
                }
            }

            // Auto-update statuses
            const activeBookings = await ScheduleRequest.find({
                status: { $in: ['Confirmed', 'Pending', 'Ongoing'] }
            });

            for (const booking of activeBookings) {
                if (!booking.utcDateTime) continue;
                
                const bookingTime = moment(booking.utcDateTime);
                const pastMins = now.diff(bookingTime, 'minutes'); // positive means in the past

                if (pastMins >= 0 && pastMins < 30) {
                    if (booking.status !== 'Ongoing') {
                        booking.status = 'Ongoing';
                        await booking.save();
                    }
                } else if (pastMins >= 30) {
                    if (booking.status !== 'Completed') {
                        booking.status = 'Completed';
                        await booking.save();
                    }
                }
            }
        } catch (error) {
            console.error('Reminder Job Error:', error);
        }
    });
};

const sendReminderEmail = async (booking, timeText) => {
    const adminEmail = 'rashedul.afl@gmail.com';
    const subject = `Reminder: Consultation in ${timeText}`;
    
    const dhakaMomnt = moment.tz(booking.utcDateTime, 'Asia/Dhaka');
    const userMomnt = moment.tz(booking.utcDateTime, booking.userTimezone);

    // Client Email
    const clientContent = `
        <p>Hi <strong>${booking.name}</strong>,</p>
        <p>This is a friendly reminder that your consultation with <strong>MailStora</strong> is starting in <strong>${timeText}</strong>.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
            <tr style="background-color:#f9fafb;"><td style="padding:10px 16px;font-weight:bold;width:40%;border-bottom:1px solid #e5e7eb;">Date &amp; Time</td><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;">${userMomnt.format('YYYY-MM-DD')} at ${userMomnt.format('hh:mm A z')} (Your Time)</td></tr>
            <tr><td style="padding:10px 16px;font-weight:bold;">Method</td><td style="padding:10px 16px;">${booking.meetingMethod}</td></tr>
        </table>
        ${booking.meetingLink ? `<p style="margin-top:16px;"><strong>Meeting Link:</strong> <a href="${booking.meetingLink}" style="color:#2d287b;">${booking.meetingLink}</a></p>` : ''}
        <p style="margin-top:16px;">Please get ready a few minutes early. We look forward to speaking with you!</p>
    `;
    
    await sendEmail(
        booking.email,
        subject,
        `Your consultation starts in ${timeText}.`,
        clientContent,
        { title: `⏰ Starting in ${timeText}`, preheader: `Your MailStora consultation is starting in ${timeText}.` }
    );

    // Admin Email
    const adminContent = `
        <p>A consultation with <strong>${booking.name}</strong> is starting in <strong>${timeText}</strong>.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
            <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;width:40%;border-bottom:1px solid #e5e7eb;">Client</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${booking.name}</td></tr>
            <tr><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Email</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${booking.email}</td></tr>
            <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Date &amp; Time (Dhaka)</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${dhakaMomnt.format('YYYY-MM-DD')} at ${dhakaMomnt.format('hh:mm A z')}</td></tr>
            <tr><td style="padding:9px 16px;font-weight:bold;">Method</td><td style="padding:9px 16px;">${booking.meetingMethod}</td></tr>
        </table>
    `;
        
    await sendEmail(
        adminEmail,
        `Admin ${subject}`,
        `Consultation starts in ${timeText}.`,
        adminContent,
        { title: `⏰ Upcoming: Consultation in ${timeText}` }
    );
};

module.exports = setupReminders;
