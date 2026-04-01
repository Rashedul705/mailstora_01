const Quote = require('../models/Quote');
const Counter = require('../models/Counter');
const QuoteMessage = require('../models/QuoteMessage');
const baseController = require('./baseController');
const CustomerService = require('../services/CustomerService');
const { sendEmail } = require('../services/email');
const crypto = require('crypto');

exports.getAll = async (req, res) => {
    try {
        const quotes = await Quote.find().populate('customer').sort({ createdAt: -1 });
        res.status(200).json(quotes);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id).populate('customer');
        if (!quote) return res.status(404).json({ message: 'Quote not found' });
        
        // Mark as read when admin opens it
        if (quote.has_unread) {
            quote.has_unread = false;
            await quote.save();
        }

        // Fetch message history
        const messages = await QuoteMessage.find({ quote: quote._id }).sort({ createdAt: 1 });

        res.status(200).json({ ...quote.toObject(), messages });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const customer = await CustomerService.handleCustomerActivity({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.whatsapp,
            company_name: req.body.company,
            source: 'quote',
            is_order: false
        });

        // Generate quote number
        const counter = await Counter.findOneAndUpdate(
            { id: 'quote_number' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        // Generate access token
        const accessToken = crypto.randomBytes(32).toString('hex');

        const quote = await Quote.create({
            ...req.body,
            customer: customer._id,
            quote_number: counter.seq,
            access_token: accessToken
        });

        // Send confirmation email to client
        const emailTypesStr = (quote.email_types && quote.email_types.length > 0) ? quote.email_types.join(', ') : 'N/A';
        const espStr = quote.esp === 'Custom / Other' ? (quote.esp_custom || 'Custom') : (quote.esp || 'N/A');
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const projectStatusUrl = `${frontendUrl}/quote/view/${quote.access_token}`;

        const clientSubject = `Re: Quote Request #${quote.quote_number} - MailStora`;
        const clientContent = `
            <p>Hello <strong>${quote.name}</strong>,</p>
            <p>Thank you for requesting a quote from <strong>MailStora</strong>. We have received your request (<strong>#${quote.quote_number}</strong>) and our team will review your project details shortly. We will get back to you soon.</p>
            <h3 style="color:#2d287b;font-size:16px;margin:20px 0 10px 0;">Project Summary</h3>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                <tr style="background-color:#f9fafb;">
                    <td style="padding:10px 16px;font-weight:bold;color:#374151;width:40%;border-bottom:1px solid #e5e7eb;">Service</td>
                    <td style="padding:10px 16px;color:#555;border-bottom:1px solid #e5e7eb;">${quote.service_type}</td>
                </tr>
                <tr>
                    <td style="padding:10px 16px;font-weight:bold;color:#374151;border-bottom:1px solid #e5e7eb;">Email Types</td>
                    <td style="padding:10px 16px;color:#555;border-bottom:1px solid #e5e7eb;">${emailTypesStr}</td>
                </tr>
                <tr style="background-color:#f9fafb;">
                    <td style="padding:10px 16px;font-weight:bold;color:#374151;border-bottom:1px solid #e5e7eb;">Templates</td>
                    <td style="padding:10px 16px;color:#555;border-bottom:1px solid #e5e7eb;">${quote.template_quantity}</td>
                </tr>
                <tr>
                    <td style="padding:10px 16px;font-weight:bold;color:#374151;">ESP / Platform</td>
                    <td style="padding:10px 16px;color:#555;">${espStr}</td>
                </tr>
            </table>
            <p style="margin-top:20px;">You can track your project status and message history anytime using the button below.</p>
        `;
        sendEmail(
            quote.email,
            clientSubject,
            `Your quote request #${quote.quote_number} has been received.`,
            clientContent,
            { title: `Quote Request #${quote.quote_number} Received`, buttonText: 'View Project Status', buttonUrl: projectStatusUrl }
        ).catch(e => console.error('Failed to send client email:', e));

        // Send notification email to admin
        const attachmentLinks = (quote.attachments && quote.attachments.length > 0)
            ? quote.attachments.map((url, i) => `<li><a href="${url}">Attachment ${i + 1}</a></li>`).join('')
            : '<li>None</li>';

        const adminSubject = `New Quote Request #${quote.quote_number} Received`;
        const adminContent = `
            <p>A new quote request (<strong>#${quote.quote_number}</strong>) has been submitted.</p>
            <h3 style="color:#2d287b;font-size:16px;margin:20px 0 10px 0;">Client Info</h3>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;margin-bottom:16px;">
                <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;width:35%;border-bottom:1px solid #e5e7eb;">Name</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${quote.name}</td></tr>
                <tr><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Email</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${quote.email}</td></tr>
                <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">WhatsApp</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${quote.whatsapp}</td></tr>
                <tr><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Company</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${quote.company || 'N/A'}</td></tr>
                <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;">Website</td><td style="padding:9px 16px;">${quote.website || 'N/A'}</td></tr>
            </table>
            <h3 style="color:#2d287b;font-size:16px;margin:20px 0 10px 0;">Project Details</h3>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;margin-bottom:16px;">
                <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;width:35%;border-bottom:1px solid #e5e7eb;">Service Type</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${quote.service_type}</td></tr>
                <tr><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Email Types</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${emailTypesStr}</td></tr>
                <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">Templates</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${quote.template_quantity}</td></tr>
                <tr><td style="padding:9px 16px;font-weight:bold;border-bottom:1px solid #e5e7eb;">ESP</td><td style="padding:9px 16px;border-bottom:1px solid #e5e7eb;">${espStr}</td></tr>
                <tr style="background-color:#f9fafb;"><td style="padding:9px 16px;font-weight:bold;">Design Status</td><td style="padding:9px 16px;">${quote.design_status === 'have_design' ? 'Has design' : 'Needs design support'}</td></tr>
            </table>
            ${quote.design_status === 'need_design' && quote.design_brief ? `<h3 style="color:#2d287b;font-size:16px;">Design Brief</h3><p>${quote.design_brief}</p>` : ''}
            <h3 style="color:#2d287b;font-size:16px;margin:20px 0 10px 0;">Project Description</h3>
            <p style="background:#f9fafb;padding:14px;border-radius:6px;border-left:4px solid #2d287b;">${quote.project_description}</p>
            <h3 style="color:#2d287b;font-size:16px;">Attachments</h3>
            <p>${attachmentLinks}</p>
        `;
        sendEmail(
            'rashedul.afl@gmail.com',
            adminSubject,
            `New quote request #${quote.quote_number} has been submitted.`,
            adminContent,
            { title: `New Quote #${quote.quote_number}` }
        ).catch(e => console.error('Failed to send admin email:', e));

        res.status(201).json(quote);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.reply = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ message: 'Message is required' });

        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });

        // Save message to DB
        const quoteMessage = await QuoteMessage.create({
            quote: quote._id,
            sender_type: 'admin',
            message: message
        });

        // Update quote status
        if (['new', 'contacted', 'negotiation'].includes(quote.status)) {
            quote.status = 'replied';
        }
        quote.has_unread = false;
        await quote.save();

        // Send email to client
        const subject = `Re: Quote Request #${quote.quote_number} - MailStora`;
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const projectStatusUrl = `${frontendUrl}/quote/view/${quote.access_token}`;

        const replyContent = `
            <p>Hello <strong>${quote.name}</strong>,</p>
            <p>Our team has replied to your quote request (<strong>#${quote.quote_number}</strong>).</p>
            <h3 style="color:#2d287b;font-size:16px;margin:20px 0 10px 0;">Message from MailStora</h3>
            <div style="background:#f9fafb;padding:16px;border-radius:6px;border-left:4px solid #2d287b;font-size:15px;line-height:1.7;">
                ${message.split('\n').join('<br/>')}
            </div>
            <p style="margin-top:20px;">If you have more to add, please reply directly or use the dashboard link below.</p>
        `;

        await sendEmail(
            quote.email,
            subject,
            message,
            replyContent,
            { title: `Reply to Quote #${quote.quote_number}`, buttonText: 'Reply on Dashboard', buttonUrl: projectStatusUrl }
        );

        res.status(200).json({ message: 'Reply sent successfully', quoteMessage, quote });
    } catch (error) {
        console.error('Quote Reply Error:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.replyClient = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ message: 'Message is required' });

        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });

        // Save message to DB
        const quoteMessage = await QuoteMessage.create({
            quote: quote._id,
            sender_type: 'client',
            message: message
        });

        // Update quote status and flag
        quote.has_unread = true;
        if (quote.status === 'contacted' || quote.status === 'new') {
            quote.status = 'negotiation';
        }
        await quote.save();

        // Notify admin
        const adminSubject = `New Client Reply - Quote #${quote.quote_number}`;
        const adminClientReplyContent = `
            <p>Client <strong>${quote.name}</strong> has replied to Quote <strong>#${quote.quote_number}</strong>.</p>
            <h3 style="color:#2d287b;font-size:16px;margin:20px 0 10px 0;">Client Message</h3>
            <div style="background:#f9fafb;padding:16px;border-radius:6px;border-left:4px solid #2d287b;font-size:15px;line-height:1.7;">
                ${message.split('\n').join('<br/>')}
            </div>
            <p style="margin-top:20px;">Log in to the admin panel to review and respond.</p>
        `;
        sendEmail(
            'rashedul.afl@gmail.com',
            adminSubject,
            `Client reply for #${quote.quote_number}`,
            adminClientReplyContent,
            { title: `New Client Reply — Quote #${quote.quote_number}` }
        ).catch(e => console.error('Failed to send admin email:', e));

        res.status(200).json({ message: 'Reply sent successfully', quoteMessage, quote });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOneByToken = async (req, res) => {
    try {
        const quote = await Quote.findOne({ access_token: req.params.token }).populate('customer');
        if (!quote) return res.status(404).json({ message: 'Quote not found' });

        const messages = await QuoteMessage.find({ quote: quote._id }).sort({ createdAt: 1 });
        res.status(200).json({ ...quote.toObject(), messages });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.convertToOrder = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });

        const Order = require('../models/Order');
        const newOrder = await Order.create({
            customer: quote.customer,
            details: `Order converted from Quote: ${quote.service_type}. ${quote.project_description}`,
            amount: 0,
            status: 'Pending'
        });

        quote.status = 'converted';
        await quote.save();

        res.status(200).json({ message: 'Converted to order successfully', order: newOrder });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.update = baseController.update(Quote);
exports.remove = baseController.remove(Quote);
