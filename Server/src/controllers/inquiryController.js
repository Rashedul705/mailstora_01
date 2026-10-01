const Inquiry = require('../models/Inquiry');
const baseController = require('./baseController');
const CustomerService = require('../services/CustomerService');
const { sendEmail } = require('../services/email');

exports.getAll = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().populate('customer').sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id).populate('customer');
        if (!inquiry) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(inquiry);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const customer = await CustomerService.handleCustomerActivity({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            company_name: req.body.company,
            source: 'inquiry',
            is_order: false
        });

        const inquiry = await Inquiry.create({ ...req.body, customer: customer._id });
        res.status(201).json(inquiry);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.update = baseController.update(Inquiry);
exports.remove = baseController.remove(Inquiry);

exports.reply = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) return res.status(404).json({ message: 'Not found' });

        const { message } = req.body;
        if (!message) return res.status(400).json({ message: 'Message is required' });

        inquiry.conversation.push({
            from: 'admin',
            message: message,
            sentAt: new Date()
        });
        inquiry.status = 'Replied';
        await inquiry.save();

        // Build email content
        const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
        const safeMessage = String(message).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
        const emailContent = `
            <p>Hi <strong>${inquiry.name}</strong>,</p>
            <p>You have received a reply regarding your inquiry from the <strong>MailStora</strong> team.</p>
            <div style="background:#f9fafb;padding:16px;border-radius:6px;border-left:4px solid #2d287b;font-size:15px;line-height:1.7;">
                ${safeMessage.split('\n').join('<br/>')}
            </div>
            <p style="margin-top:20px;color:#666;font-size:13px;">
                If you have any further questions, please reply directly to this email.
            </p>
        `;

        await sendEmail(
            inquiry.email,
            'Reply to your inquiry from MailStora',
            safeMessage,
            emailContent,
            {
                title: 'New Message from MailStora',
                preheader: `MailStora team replied: ${safeMessage.slice(0, 80)}`,
                buttonText: 'Contact Us',
                buttonUrl: `${FRONTEND_URL}/#contact`
            }
        );

        res.status(200).json({ inquiry, message: 'Reply sent successfully' });
    } catch (error) {
        console.error('Reply Error:', error);
        res.status(500).json({ error: error.message });
    }
};
