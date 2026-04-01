const Message = require('../models/Message');
const { sendEmail } = require('../services/email');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const ADMIN_EMAIL  = process.env.EMAIL_USER   || 'rashedul.afl@gmail.com';

/**
 * POST /api/messages/send
 * Admin sends a message directly to a scheduled user.
 */
exports.send = async (req, res) => {
    try {
        const { scheduleId, userId, userName, userEmail, subject, message, attachments } = req.body;

        if (!userEmail || !message) {
            return res.status(400).json({ message: 'Recipient email and message are required.' });
        }

        // Basic sanitisation — strip dangerous script tags
        const safeMessage = String(message).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
        const safeSubject = String(subject || 'Message from MailStora').replace(/<[^>]*>/g, '').trim();

        const record = await Message.create({
            scheduleId: scheduleId || null,
            userId:     userId     || null,
            userEmail,
            userName:   userName   || '',
            subject:    safeSubject,
            message:    safeMessage,
            attachments: Array.isArray(attachments) ? attachments : [],
            sender: 'admin'
        });

        // Build email content
        const emailContent = `
            <p>Hi <strong>${userName || 'there'}</strong>,</p>
            <p>You have received a new message from the <strong>MailStora</strong> team.</p>
            ${safeSubject ? `<h3 style="color:#2d287b;font-size:16px;margin:20px 0 10px 0;">Subject: ${safeSubject}</h3>` : ''}
            <div style="background:#f9fafb;padding:16px;border-radius:6px;border-left:4px solid #2d287b;font-size:15px;line-height:1.7;">
                ${safeMessage.split('\n').join('<br/>')}
            </div>
            ${attachments && attachments.length > 0 ? `
            <h3 style="color:#2d287b;font-size:15px;margin:20px 0 8px 0;">Attachments</h3>
            <ul style="margin:0;padding-left:20px;">
                ${attachments.map((url, i) => `<li><a href="${url}" style="color:#2d287b;" target="_blank">Attachment ${i + 1}</a></li>`).join('')}
            </ul>` : ''}
            <p style="margin-top:20px;color:#666;font-size:13px;">
                If you have any questions, please reply to this email or contact us directly.
            </p>
        `;

        await sendEmail(
            userEmail,
            safeSubject || 'Message from MailStora',
            safeMessage,
            emailContent,
            {
                title:      safeSubject || 'New Message from MailStora',
                preheader:  `MailStora team sent you a message: ${safeMessage.slice(0, 80)}`,
                buttonText: 'Contact Us',
                buttonUrl:  `${FRONTEND_URL}/#contact`
            }
        );

        res.status(201).json({ message: 'Message sent successfully.', record });
    } catch (error) {
        console.error('Message Send Error:', error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * GET /api/messages
 * Admin — list all messages (newest first).
 */
exports.getAll = async (req, res) => {
    try {
        const messages = await Message.find()
            .populate('scheduleId', 'name email date time')
            .sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * GET /api/messages/schedule/:scheduleId
 * Admin — fetch all messages for a specific schedule booking.
 */
exports.getBySchedule = async (req, res) => {
    try {
        const messages = await Message.find({ scheduleId: req.params.scheduleId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * DELETE /api/messages/:id
 * Admin — delete a message record.
 */
exports.remove = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Message deleted.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
