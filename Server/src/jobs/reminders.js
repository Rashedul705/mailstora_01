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
    const clientHtml = `<h3>Consultation Reminder</h3>
        <p>Hi ${booking.name},</p>
        <p>Your consultation is starting in <strong>${timeText}</strong>.</p>
        <p><strong>Date & Time:</strong> ${userMomnt.format('YYYY-MM-DD')} at ${userMomnt.format('hh:mm A z')} (Your Time)</p>
        <p><strong>Method:</strong> ${booking.meetingMethod}</p>
        ${booking.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${booking.meetingLink}">${booking.meetingLink}</a></p>` : ''}`;
    
    await sendEmail(booking.email, subject, `Your consultation starts in ${timeText}.`, clientHtml);

    // Admin Email
    const adminHtml = `<h3>Consultation Reminder</h3>
        <p>Consultation with ${booking.name} is starting in <strong>${timeText}</strong>.</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Date & Time (Dhaka):</strong> ${dhakaMomnt.format('YYYY-MM-DD')} at ${dhakaMomnt.format('hh:mm A z')}</p>
        <p><strong>Method:</strong> ${booking.meetingMethod}</p>`;
        
    await sendEmail(adminEmail, `Admin ${subject}`, `Consultation starts in ${timeText}.`, adminHtml);
};

module.exports = setupReminders;
