const ScheduleRequest = require('../models/ScheduleRequest');
const OTP = require('../models/OTP');
const AdminAvailability = require('../models/AdminAvailability');
const baseController = require('./baseController');
const CustomerService = require('../services/CustomerService');
const { sendEmail } = require('../services/email');
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
        const { email } = req.body;
        // Verify email through OTP
        const otpRecord = await OTP.findOne({ email, verified: true });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Email must be verified before booking' });
        }

        // Prevent double booking (same date + time)
        const { date, time } = req.body;
        const existingBooking = await ScheduleRequest.findOne({ date, time, status: { $ne: 'Cancelled' } });
        if (existingBooking) {
            return res.status(400).json({ message: 'This time slot is already booked' });
        }

        const customer = await CustomerService.handleCustomerActivity({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.whatsapp, // Map whatsapp to phone for CRM
            company_name: req.body.company,
            source: 'schedule',
            is_order: false
        });

        const schedule = await ScheduleRequest.create({ ...req.body, customer: customer._id });

        // Clean up OTP record
        await OTP.deleteOne({ email });

        // Send confirmation emails
        const adminEmail = 'rashedul.afl@gmail.com';
        const adminSubject = 'New Consultation Booking';
        const adminHtml = `<h3>New Booking Received</h3>
            <p><strong>Name:</strong> ${req.body.name}</p>
            <p><strong>Email:</strong> ${req.body.email}</p>
            <p><strong>Date & Time:</strong> ${req.body.date} at ${req.body.time}</p>
            <p><strong>Method:</strong> ${req.body.meetingMethod}</p>`;
            
        await sendEmail(adminEmail, adminSubject, 'New Booking Received', adminHtml);

        const clientSubject = 'Your Consultation is Confirmed';
        const clientHtml = `<h3>Consultation Confirmed</h3>
            <p>Hi ${req.body.name},</p>
            <p>Your consultation is confirmed for <strong>${req.body.date}</strong> at <strong>${req.body.time}</strong>.</p>
            <p><strong>Method:</strong> ${req.body.meetingMethod}</p>
            ${req.body.message ? `<p><strong>Your Message:</strong> ${req.body.message}</p>` : ''}`;

        await sendEmail(req.body.email, clientSubject, 'Consultation Confirmed', clientHtml);

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
        const { date } = req.query; // format YYYY-MM-DD
        if (!date) return res.status(400).json({ message: 'Date is required' });

        let settings = await AdminAvailability.findOne();
        if (!settings) settings = await AdminAvailability.create({});

        // Safely get day name from YYYY-MM-DD
        const parts = date.split('-');
        const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = dayNames[dateObj.getDay()];

        if (!settings.workingDays.includes(dayName)) {
            return res.status(200).json([]); // No slots on this day
        }

        const slots = [];
        let [startH, startM] = settings.startTime.split(':').map(Number);
        const [endH, endM] = settings.endTime.split(':').map(Number);

        let currentH = startH;
        let currentM = startM;

        while (currentH < endH || (currentH === endH && currentM < endM)) {
            const timeStr = `${String(currentH).padStart(2, '0')}:${String(currentM).padStart(2, '0')}`;
            slots.push(timeStr);

            currentM += 30;
            if (currentM >= 60) {
                currentH += 1;
                currentM -= 60;
            }
        }

        // Fetch booked slots for this date
        const booked = await ScheduleRequest.find({ date, status: { $ne: 'Cancelled' } });
        const bookedTimes = booked.map(b => b.time);

        const availableSlots = slots.filter(slot => !bookedTimes.includes(slot));
        res.status(200).json(availableSlots);
    } catch (err) { res.status(500).json({ error: err.message }); }
};
