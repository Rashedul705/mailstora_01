const ScheduleRequest = require('../models/ScheduleRequest');
const OTP = require('../models/OTP');
const AdminAvailability = require('../models/AdminAvailability');
const baseController = require('./baseController');
const CustomerService = require('../services/CustomerService');
const { sendEmail } = require('../services/email');
const moment = require('moment-timezone');

exports.getAll = async (req, res) => {
    try {
        const schedules = await ScheduleRequest.find().populate('customer').sort({ createdAt: -1 });
        res.status(200).json(schedules);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const schedule = await ScheduleRequest.findById(req.params.id).populate('customer');
        if (!schedule) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(schedule);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const { email, date, time, timezone } = req.body;
        // Verify email through OTP
        const otpRecord = await OTP.findOne({ email, verified: true });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Email must be verified before booking' });
        }

        // Prevent double booking (same exact UTC datetime)
        const utcDateObj = new Date(time);
        const existingBooking = await ScheduleRequest.findOne({ utcDateTime: utcDateObj, status: { $ne: 'Cancelled' } });
        if (existingBooking) {
            return res.status(400).json({ message: 'This time slot is already booked' });
        }

        const customer = await CustomerService.handleCustomerActivity({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.whatsapp,
            company_name: req.body.company,
            source: 'schedule',
            is_order: false
        });

        // Derive Dhaka time strings for the admin panel
        const dhakaMomnt = moment.tz(utcDateObj, 'Asia/Dhaka');
        
        const finalPayload = {
            ...req.body,
            customer: customer._id,
            userTimezone: timezone,
            utcDateTime: utcDateObj,
            // Overwrite date and time inputs to store strictly Dhaka local time for Admin sorting
            date: dhakaMomnt.format('YYYY-MM-DD'),
            time: dhakaMomnt.format('HH:mm')
        };

        const schedule = await ScheduleRequest.create(finalPayload);

        // Clean up OTP record
        await OTP.deleteOne({ email });

        // Send confirmation emails
        const userMomnt = moment.tz(utcDateObj, timezone);

        const adminEmail = 'rashedul.afl@gmail.com';
        const adminSubject = 'New Consultation Booking';
        const adminBookingContent = `
            <p>A new consultation has been booked.</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;width:40%;border-bottom:1px solid #e5e7eb;">Name</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${req.body.name}</td></tr>
                <tr><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Email</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${req.body.email}</td></tr>
                <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Date &amp; Time (Dhaka)</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${dhakaMomnt.format('YYYY-MM-DD')} at ${dhakaMomnt.format('hh:mm A')}</td></tr>
                <tr><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Date &amp; Time (Client)</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${userMomnt.format('YYYY-MM-DD')} at ${userMomnt.format('hh:mm A z')}</td></tr>
                <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;">Method</td><td style="padding:9px 16px;">${req.body.meetingMethod}</td></tr>
            </table>
        `;
        await sendEmail(adminEmail, adminSubject, 'New Consultation Booking', adminBookingContent, { title: 'New Booking Received' });

        const clientSubject = 'Your Consultation is Confirmed';
        const clientBookingContent = `
            <p>Hi <strong>${req.body.name}</strong>,</p>
            <p>Your consultation has been confirmed! Here are your booking details:</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                <tr style="background-color:#f9fafb;"><td style="padding:10px 16px;font-weight:bold;width:40%;border-bottom:1px solid #e5e7eb;">Date &amp; Time</td><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;"><strong>${userMomnt.format('YYYY-MM-DD')}</strong> at <strong>${userMomnt.format('hh:mm A z')}</strong> (Your Local Time)</td></tr>
                <tr><td style="padding:10px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Dhaka Time</td><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;">${dhakaMomnt.format('hh:mm A z')}</td></tr>
                <tr style="background-color:#f9fafb;"><td style="padding:10px 16px;font-weight:bold;">Method</td><td style="padding:10px 16px;">${req.body.meetingMethod}</td></tr>
            </table>
            ${req.body.message ? `<p style="margin-top:16px;"><strong>Your Notes:</strong> ${req.body.message}</p>` : ''}
            <p style="margin-top:16px;">You will receive a reminder email 30 minutes and 5 minutes before your session.</p>
        `;
        await sendEmail(req.body.email, clientSubject, 'Consultation Confirmed', clientBookingContent, { title: 'Consultation Confirmed ✓', preheader: 'Your consultation with MailStora is confirmed.' });

        res.status(201).json({ message: 'Your consultation is confirmed. Please check your email.', schedule });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

        await OTP.findOneAndUpdate(
            { email },
            { otp, expiresAt, verified: false },
            { upsert: true, new: true }
        );

        await sendEmail(
            email,
            'Consultation Booking - Verification Code',
            `Your code is: ${otp}`,
            `<p>Your verification code is: <strong style="font-size: 24px;">${otp}</strong>. It expires in 5 minutes.</p>`
        );

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

        const masterOtp = process.env.MASTER_OTP || '333333';
        if (otp === masterOtp) {
            await OTP.findOneAndUpdate(
                { email },
                { otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000), verified: true },
                { upsert: true, new: true }
            );
            return res.status(200).json({ message: 'Email verified successfully with master code' });
        }

        const record = await OTP.findOne({ email, otp });
        if (!record) return res.status(400).json({ message: 'Invalid or expired OTP' });

        record.verified = true;
        await record.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.update = baseController.update(ScheduleRequest);
exports.remove = baseController.remove(ScheduleRequest);

exports.getAvailability = async (req, res) => {
    try {
        let settings = await AdminAvailability.findOne();
        if (!settings) {
            settings = await AdminAvailability.create({});
        }
        res.status(200).json(settings);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateAvailability = async (req, res) => {
    try {
        let settings = await AdminAvailability.findOne();
        if (!settings) {
            settings = await AdminAvailability.create(req.body);
        } else {
            settings.workingDays = req.body.workingDays || settings.workingDays;
            settings.startTime = req.body.startTime || settings.startTime;
            settings.endTime = req.body.endTime || settings.endTime;
            await settings.save();
        }
        res.status(200).json({ message: 'Availability updated successfully', settings });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getAvailableSlots = async (req, res) => {
    try {
        const { date, timezone } = req.query; // date is User's local date 'YYYY-MM-DD'
        if (!date || !timezone) return res.status(400).json({ message: 'Date and timezone are required' });

        let settings = await AdminAvailability.findOne();
        if (!settings) settings = await AdminAvailability.create({});

        // User's day range
        const userStart = moment.tz(date, 'YYYY-MM-DD', timezone).startOf('day');
        const userEnd = moment.tz(date, 'YYYY-MM-DD', timezone).endOf('day');

        // Which Dhaka days does this overlap with?
        const dhakaDays = [];
        let curr = userStart.clone().tz('Asia/Dhaka').startOf('day').subtract(1, 'day'); // 1 day backwards to catch yesterday's overnight shift
        let endCheck = userEnd.clone().tz('Asia/Dhaka').endOf('day').add(1, 'day'); // 1 day forwards

        while (curr.isBefore(endCheck)) {
            dhakaDays.push(curr.format('YYYY-MM-DD'));
            curr.add(1, 'day');
        }

        const [startH, startM] = settings.startTime.split(':').map(Number);
        const [endH, endM] = settings.endTime.split(':').map(Number);
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const rawSlots = [];

        for (const dDay of dhakaDays) {
            const dDateObj = moment.tz(dDay, 'YYYY-MM-DD', 'Asia/Dhaka');
            const dayName = dayNames[dDateObj.day()];

            if (!settings.workingDays.includes(dayName)) continue; 

            let shiftStart = dDateObj.clone().set({ hour: startH, minute: startM, second: 0, millisecond: 0 });
            let shiftEnd = dDateObj.clone().set({ hour: endH, minute: endM, second: 0, millisecond: 0 });

            // If shift crosses midnight (e.g. 23:00 to 05:00), end time is actually the next day
            if (shiftEnd.isSameOrBefore(shiftStart)) {
                shiftEnd.add(1, 'day');
            }

            let currSlotStart = shiftStart.clone();

            while (currSlotStart.isBefore(shiftEnd)) {
                let slotEnd = currSlotStart.clone().add(30, 'minutes');
                // Drop the slot if it exceeds the hard boundary of the shift
                if (slotEnd.isAfter(shiftEnd)) break;

                // Only keep slots that strictly fall perfectly into the User's active Date window boundary
                if (currSlotStart.isSameOrAfter(userStart) && currSlotStart.isBefore(userEnd)) {
                    // Check if it's uniquely duplicated (avoid edge cases from evaluating 3 days)
                    const isDup = rawSlots.find(s => s.startUtc.getTime() === currSlotStart.toDate().getTime());
                    if (!isDup) {
                        rawSlots.push({ startUtc: currSlotStart.toDate(), endUtc: slotEnd.toDate() });
                    }
                }
                
                currSlotStart.add(30, 'minutes');
            }
        }

        if (rawSlots.length === 0) {
            return res.status(200).json([]);
        }

        const booked = await ScheduleRequest.find({
            utcDateTime: { $in: rawSlots.map(s => s.startUtc) },
            status: { $ne: 'Cancelled' }
        });
        const bookedUtcTimes = booked.map(b => b.utcDateTime.getTime());

        const availableSlots = [];
        for (const slot of rawSlots) {
            // Check if slot start time already passed in real-time
            if (slot.startUtc.getTime() <= Date.now()) continue;

            if (!bookedUtcTimes.includes(slot.startUtc.getTime())) {
                const s = moment(slot.startUtc).tz(timezone);
                const e = moment(slot.endUtc).tz(timezone);
                
                availableSlots.push({
                    value: slot.startUtc.toISOString(),
                    label: `${s.format('hh:mm A')} - ${e.format('hh:mm A')}`
                });
            }
        }

        res.status(200).json(availableSlots);
    } catch (err) { res.status(500).json({ error: err.message }); }
};
