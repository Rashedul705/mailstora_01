const cron = require('node-cron');
const ScheduleRequest = require('../models/ScheduleRequest');
const { sendEmail } = require('../services/email');

const setupReminders = () => {
    // Run every minute
    cron.schedule('* * * * *', async () => {
        try {
            const now = new Date();
            const nowTime = now.getTime();

            // Find confirmed or pending bookings that haven't had reminders sent
            const bookings = await ScheduleRequest.find({
                status: { $in: ['Confirmed', 'Pending'] },
                $or: [
                    { 'remindersSent.before30min': false },
                    { 'remindersSent.before5min': false }
                ]
            });

            for (const booking of bookings) {
                const parts = booking.date.split('-');
                const timeParts = booking.time.split(':');
                const bookingDateTime = new Date(parts[0], parts[1] - 1, parts[2], timeParts[0], timeParts[1]);
                
                const timeDiffMs = bookingDateTime.getTime() - nowTime;
                const timeDiffMins = Math.floor(timeDiffMs / (1000 * 60));

                if (timeDiffMins > 0 && timeDiffMins <= 30 && !booking.remindersSent.before30min) {
                    await sendReminderEmail(booking, '30 minutes');
                    booking.remindersSent.before30min = true;
                    await booking.save();
                } else if (timeDiffMins > 0 && timeDiffMins <= 5 && !booking.remindersSent.before5min) {
                    await sendReminderEmail(booking, '5 minutes');
                    booking.remindersSent.before5min = true;
                    await booking.save();
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
    
    // Client Email
    const clientHtml = `<h3>Consultation Reminder</h3>
        <p>Hi ${booking.name},</p>
        <p>Your consultation is starting in <strong>${timeText}</strong>.</p>
        <p><strong>Date & Time:</strong> ${booking.date} at ${booking.time}</p>
        <p><strong>Method:</strong> ${booking.meetingMethod}</p>
        ${booking.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${booking.meetingLink}">${booking.meetingLink}</a></p>` : ''}`;
    
    await sendEmail(booking.email, subject, `Your consultation starts in ${timeText}.`, clientHtml);

    // Admin Email
    const adminHtml = `<h3>Consultation Reminder</h3>
        <p>Consultation with ${booking.name} is starting in <strong>${timeText}</strong>.</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Method:</strong> ${booking.meetingMethod}</p>`;
        
    await sendEmail(adminEmail, `Admin ${subject}`, `Consultation starts in ${timeText}.`, adminHtml);
};

module.exports = setupReminders;
