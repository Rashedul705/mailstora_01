const Quote = require('../models/Quote');
const { sendEmail } = require('../services/email');

// @route GET /api/quotes
exports.getAll = async (req, res) => {
    try {
        const quotes = await Quote.find().sort({ submittedAt: -1 });
        res.status(200).json(quotes);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// @route GET /api/quotes/:id (Note: using quoteId like QT-12345 or Mongo _id, let's support both)
exports.getOne = async (req, res) => {
    try {
        const query = req.params.id.startsWith('QT-') ? { quoteId: req.params.id } : { _id: req.params.id };
        const quote = await Quote.findOne(query);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });
        
        res.status(200).json(quote);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// @route POST /api/quotes
exports.create = async (req, res) => {
    try {
        // Generate unique QT-timestamp ID
        const quoteId = "QT-" + Date.now();

        const newQuote = await Quote.create({
            quoteId,
            status: 'new',
            submittedAt: new Date(),
            client: {
                name: req.body.name,
                email: req.body.email,
                whatsapp: req.body.whatsapp,
                company: req.body.company || ''
            },
            service: req.body.service_type,
            emailTypes: Array.isArray(req.body.email_types) ? req.body.email_types : (req.body.email_types ? JSON.parse(req.body.email_types) : []),
            esp: Array.isArray(req.body.esp) ? req.body.esp : (req.body.esp ? JSON.parse(req.body.esp) : []),
            designStatus: req.body.design_status,
            attachmentUrl: req.body.attachmentUrl || '',
            projectDetails: req.body.project_description,
            conversation: []
        });

        // Prepare template variables
        const emailTypesStr = newQuote.emailTypes.join(', ') || 'None';
        const espStr = newQuote.esp.join(', ') || 'None';
        const attachmentLink = newQuote.attachmentUrl ? `<a href="${newQuote.attachmentUrl}" target="_blank">View Attachment</a>` : 'None';
        const adminReplyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/quotes/${quoteId}`;
        const adminWhatsapp = '+8801744350705';

        // 1. Send Email to Admin
        const adminSubject = `New Quote Request — ${newQuote.client.name} — ${quoteId}`;
        const adminContent = `
            <h2>New Quote Request Received</h2>
            <p><strong>Quote ID:</strong> ${quoteId}</p>
            <p><strong>Submitted At:</strong> ${newQuote.submittedAt.toLocaleString()}</p>
            <hr />
            <h3>Client Information</h3>
            <ul>
                <li><strong>Name:</strong> ${newQuote.client.name}</li>
                <li><strong>Email:</strong> ${newQuote.client.email}</li>
                <li><strong>WhatsApp:</strong> ${newQuote.client.whatsapp}</li>
                <li><strong>Company:</strong> ${newQuote.client.company || 'N/A'}</li>
            </ul>
            <hr />
            <h3>Project Details</h3>
            <ul>
                <li><strong>Service:</strong> ${newQuote.service}</li>
                <li><strong>Email Types:</strong> ${emailTypesStr}</li>
                <li><strong>ESP:</strong> ${espStr}</li>
                <li><strong>Design Status:</strong> ${newQuote.designStatus}</li>
                <li><strong>Attachment:</strong> ${attachmentLink}</li>
            </ul>
            <h4>Description:</h4>
            <p style="background:#f3f4f6;padding:15px;border-radius:8px;">${newQuote.projectDetails}</p>
        `;

        sendEmail(
            'rashedul.afl@gmail.com',
            adminSubject,
            `New quote request from ${newQuote.client.name}.`,
            adminContent,
            { title: adminSubject, buttonText: 'View / Reply in Admin Panel', buttonUrl: adminReplyUrl }
        ).catch(e => console.error('Failed to send admin email:', e));

        // 2. Send Email to Client
        const clientSubject = `We received your quote request — MailStora`;
        const clientContent = `
            <p>Hi ${newQuote.client.name},</p>
            <p>Thank you for reaching out! We've received your quote request (<strong>${quoteId}</strong>) for <strong>${newQuote.service}</strong> and will get back to you within 2–4 hours on your email and WhatsApp.</p>
        `;

        sendEmail(
            newQuote.client.email,
            clientSubject,
            `We received your quote request (ID: ${quoteId}).`,
            clientContent,
            { title: clientSubject, buttonText: 'Message us on WhatsApp', buttonUrl: `https://wa.me/${adminWhatsapp}` }
        ).catch(e => console.error('Failed to send client email:', e));

        res.status(201).json(newQuote);
    } catch (error) { 
        console.error('Quote create error:', error);
        res.status(400).json({ error: error.message }); 
    }
};

// @route PATCH /api/quotes/:id
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['new', 'reviewed', 'replied', 'closed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const query = req.params.id.startsWith('QT-') ? { quoteId: req.params.id } : { _id: req.params.id };
        const quote = await Quote.findOneAndUpdate(query, { status }, { new: true });
        
        if (!quote) return res.status(404).json({ message: 'Quote not found' });
        res.status(200).json(quote);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// @route POST /api/quotes/:id/reply
exports.reply = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ message: 'Message is required' });

        const query = req.params.id.startsWith('QT-') ? { quoteId: req.params.id } : { _id: req.params.id };
        const quote = await Quote.findOne(query);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });

        // Add to conversation
        quote.conversation.push({
            from: 'admin',
            message: message,
            sentAt: new Date()
        });

        // Update status to replied
        quote.status = 'replied';
        await quote.save();

        // Send Email to Client
        const subject = `Re: Your Quote Request ${quote.quoteId} — MailStora`;
        const content = `
            <p>Hi ${quote.client.name},</p>
            <p>Our team has reviewed your quote request (<strong>${quote.quoteId}</strong>) and sent a reply:</p>
            <div style="background:#f3f4f6;padding:15px;border-radius:8px;margin:20px 0;">
                ${message.split('\n').join('<br/>')}
            </div>
            <p>You can reply directly to this email or message us on WhatsApp.</p>
        `;

        await sendEmail(
            quote.client.email,
            subject,
            message,
            content,
            { title: subject, buttonText: 'Chat on WhatsApp', buttonUrl: 'https://wa.me/+8801744350705' }
        );

        res.status(200).json({ message: 'Reply sent successfully', quote });
    } catch (error) {
        console.error('Quote Reply Error:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const query = req.params.id.startsWith('QT-') ? { quoteId: req.params.id } : { _id: req.params.id };
        const quote = await Quote.findOneAndDelete(query);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });
        res.status(200).json({ message: 'Quote deleted successfully' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};
