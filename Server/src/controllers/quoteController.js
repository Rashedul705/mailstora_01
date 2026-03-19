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
        const clientHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <p>Hello ${quote.name},</p>
                <p>Thank you for requesting a quote from MailStora.</p>
                <p>We have received your request (<strong>#${quote.quote_number}</strong>) and our team will review your project details shortly. We will contact you soon with more information.</p>
                <br/>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${projectStatusUrl}" style="background-color: #4338CA; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Project Status & Message History</a>
                </div>
                <h3>Project Summary:</h3>
                <ul>
                    <li><strong>Service:</strong> ${quote.service_type}</li>
                    <li><strong>Email Types:</strong> ${emailTypesStr}</li>
                    <li><strong>Templates:</strong> ${quote.template_quantity}</li>
                    <li><strong>ESP:</strong> ${espStr}</li>
                </ul>
                <p>Best regards,<br/>MailStora Team</p>
            </div>
        `;
        sendEmail(quote.email, clientSubject, 'Your quote request has been received.', clientHtml).catch(e => console.error('Failed to send client email:', e));

        // Send notification email to admin
        const attachmentLinks = (quote.attachments && quote.attachments.length > 0)
            ? quote.attachments.map((url, i) => `<li><a href="${url}">Attachment ${i + 1}</a></li>`).join('')
            : '<li>None</li>';

        const adminSubject = `New Quote Request #${quote.quote_number} Received`;
        const adminHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <p>A new quote request (<strong>#${quote.quote_number}</strong>) has been submitted.</p>
                <br/>
                <h3>Client Info</h3>
                <ul>
                    <li><strong>Name:</strong> ${quote.name}</li>
                    <li><strong>Email:</strong> ${quote.email}</li>
                    <li><strong>WhatsApp:</strong> ${quote.whatsapp}</li>
                    <li><strong>Company:</strong> ${quote.company || 'N/A'}</li>
                    <li><strong>Website:</strong> ${quote.website || 'N/A'}</li>
                </ul>
                <h3>Project Details</h3>
                <ul>
                    <li><strong>Service Type:</strong> ${quote.service_type}</li>
                    <li><strong>Email Types:</strong> ${emailTypesStr}</li>
                    <li><strong>Templates:</strong> ${quote.template_quantity}</li>
                    <li><strong>ESP:</strong> ${espStr}</li>
                    <li><strong>Design Status:</strong> ${quote.design_status === 'have_design' ? 'Has design' : 'Needs design support'}</li>
                </ul>
                ${quote.design_status === 'need_design' && quote.design_brief ? `<h3>Design Brief</h3><p>${quote.design_brief}</p>` : ''}
                <h3>Project Description</h3>
                <p>${quote.project_description}</p>
                <h3>Attachments</h3>
                <ul>${attachmentLinks}</ul>
                <br/>
                <p>Open the admin panel to review and respond.</p>
            </div>
        `;
        sendEmail('rashedul.afl@gmail.com', adminSubject, 'A new quote request has been submitted.', adminHtml).catch(e => console.error('Failed to send admin email:', e));

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

        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <p>Hello ${quote.name},</p>
                <p>Our team has replied to your quote request (<strong>#${quote.quote_number}</strong>).</p>
                <br/>
                <p><strong>Message from MailStora:</strong></p>
                <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
                    ${message.replace(/\\n/g, '<br/>')}
                </div>
                <br/>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${projectStatusUrl}" style="background-color: #4338CA; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reply on Dashboard</a>
                </div>
                <p>If you have more information to add, please reply to this email or use the dashboard link above.</p>
                <p>Best regards,<br/>MailStora Team</p>
            </div>
        `;

        await sendEmail(quote.email, subject, message, html);

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
        const adminHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <p>Client <strong>${quote.name}</strong> has replied to Quote #${quote.quote_number}.</p>
                <br/>
                <p><strong>Message:</strong></p>
                <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
                    ${message.replace(/\\n/g, '<br/>')}
                </div>
                <br/>
                <p>Open the admin panel to review and respond.</p>
            </div>
        `;
        sendEmail('rashedul.afl@gmail.com', adminSubject, `Client reply for #${quote.quote_number}`, adminHtml).catch(e => console.error('Failed to send admin email:', e));

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
