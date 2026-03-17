const Quote = require('../models/Quote');
const QuoteMessage = require('../models/QuoteMessage');
const baseController = require('./baseController');
const CustomerService = require('../services/CustomerService');
const { sendEmail } = require('../services/email');

exports.getAll = async (req, res) => {
    try {
        const quotes = await Quote.find().populate('customer').sort({ createdAt: -1 });
        res.status(200).json(quotes);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id).populate('customer');
        if (!quote) return res.status(404).json({ message: 'Not found' });

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

        const quote = await Quote.create({ ...req.body, customer: customer._id });

        // Send confirmation email to client
        const emailTypesStr = (quote.email_types && quote.email_types.length > 0) ? quote.email_types.join(', ') : 'N/A';
        const espStr = quote.esp === 'Custom / Other' ? (quote.esp_custom || 'Custom') : (quote.esp || 'N/A');

        const clientSubject = `Quote Request Received – MailStora`;
        const clientHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <p>Hello ${quote.name},</p>
                <p>Thank you for requesting a quote from MailStora.</p>
                <p>We have received your request and our team will review your project details shortly. We will contact you soon with more information.</p>
                <br/>
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

        const adminSubject = `New Quote Request Received`;
        const adminHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <p>A new quote request has been submitted.</p>
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
        if (quote.status === 'new') {
            quote.status = 'contacted';
            await quote.save();
        }

        // Send email to client
        const subject = `Reply to Your Quote Request – MailStora`;
        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <p>Hello ${quote.name},</p>
                <p>Our team has replied to your quote request.</p>
                <br/>
                <p><strong>Message from MailStora:</strong></p>
                <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
                    ${message.replace(/\\n/g, '<br/>')}
                </div>
                <br/>
                <p>If you have more information to add, please reply to this email.</p>
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

exports.convertToOrder = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });

        const Order = require('../models/Order');
        const newOrder = await Order.create({
            customer: quote.customer,
            details: `Order converted from Quote: ${quote.service_type}. ${quote.project_description}`,
            amount: 0, // Admin needs to manually set this later
            status: 'Pending'
        });

        quote.status = 'converted';
        await quote.save();

        res.status(200).json({ message: 'Converted to order successfully', order: newOrder });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.update = baseController.update(Quote);
exports.remove = baseController.remove(Quote);
