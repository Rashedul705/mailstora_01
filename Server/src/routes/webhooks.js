const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Quote = require('../models/Quote');
const QuoteMessage = require('../models/QuoteMessage');
const { sendEmail } = require('../services/email');

// @route   POST /api/webhooks/inbound-email
// @desc    Handle inbound email from SendGrid/Mailgun webhook
router.post('/inbound-email', upload.none(), async (req, res) => {
    try {
        const { from, subject, text, html } = req.body;
        
        console.log('Inbound Email Webhook Received:', { from, subject });

        // Extract quote number from subject (e.g., "Re: Quote Request #123 - MailStora")
        const match = subject.match(/#(\d+)/);
        if (!match) {
            console.log('No quote number found in subject');
            return res.status(200).send('No quote number found'); // Return 200 to acknowledge receipt
        }

        const quoteNumber = parseInt(match[1]);
        const quote = await Quote.findOne({ quote_number: quoteNumber });

        if (!quote) {
            console.log(`Quote #${quoteNumber} not found`);
            return res.status(200).send('Quote not found');
        }

        // Clean up message text (strip original email content if possible, basic version here)
        // Many email clients include the original message below a line like "On Oct 20, 2023..."
        let message = text || '';
        const replySplits = [
            'On ',
            '-----Original Message-----',
            'From: ',
            'Sent from my '
        ];
        
        for (const split of replySplits) {
            if (message.includes(split)) {
                message = message.split(split)[0].trim();
            }
        }

        if (!message) {
            console.log('Empty response after striping');
            return res.status(200).send('Empty message');
        }

        // Save reply to DB
        await QuoteMessage.create({
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
        const adminSubject = `New Email Reply - Quote #${quote.quote_number}`;
        const adminHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <p>Client <strong>${quote.name}</strong> has replied via email to Quote #${quote.quote_number}.</p>
                <br/>
                <p><strong>Message:</strong></p>
                <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
                    ${message.replace(/\n/g, '<br/>')}
                </div>
                <br/>
                <p>Check the admin panel for the full conversation.</p>
            </div>
        `;
        sendEmail('rashedul.afl@gmail.com', adminSubject, `Client email reply for #${quote.quote_number}`, adminHtml).catch(e => console.error('Failed to send admin email:', e));

        res.status(200).send('Webhook processed');
    } catch (error) {
        console.error('Inbound Email Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
