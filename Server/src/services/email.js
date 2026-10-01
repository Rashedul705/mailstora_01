const nodemailer = require('nodemailer');
require('dotenv').config();
const { buildEmail } = require('./emailTemplate');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Send an email.
 *
 * @param {string}   to          - Recipient address
 * @param {string}   subject     - Subject line
 * @param {string}   text        - Plain-text fallback
 * @param {string}   html        - HTML content snippet or full html
 * @param {Array|Object} [opts]  - Attachments array (legacy), or options object:
 *   opts.title       - Heading shown in email body card
 *   opts.preheader   - Short inbox preview text
 *   opts.buttonText  - CTA button label (omit to hide)
 *   opts.buttonUrl   - CTA button URL   (omit to hide)
 *   opts.raw         - If true, send html as-is without the template wrapper
 *   opts.attachments - Array of nodemailer attachment objects
 */
const sendEmail = async (to, subject, text, html, opts = {}) => {
    let attachments = [];
    let templateOpts = {};

    // Backward-compat: fifth arg used to be an attachments array
    if (Array.isArray(opts)) {
        attachments = opts;
    } else {
        attachments = opts.attachments || [];
        templateOpts = opts;
    }

    // Wrap html in branded template unless caller opts out
    const finalHtml = templateOpts.raw
        ? html
        : buildEmail({
            title:      templateOpts.title      || '',
            content:    html                    || '',
            preheader:  templateOpts.preheader  || text || '',
            buttonText: templateOpts.buttonText || '',
            buttonUrl:  templateOpts.buttonUrl  || ''
        });

    try {
        const mailOptions = {
            from: `"MailStora" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html: finalHtml,
            attachments
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Email Service Error:', error.message);
        throw new Error('Failed to send email');
    }
};

module.exports = { sendEmail, buildEmail };
