/**
 * MailStora Reusable Email Template System
 * =========================================
 * Provides a consistent, branded HTML email layout for all outgoing emails.
 * Uses table-based layout with inline CSS for maximum email client compatibility.
 *
 * Usage:
 *   const { buildEmail } = require('./emailTemplate');
 *   const html = buildEmail({ title, content, buttonText, buttonUrl, preheader });
 */

const BRAND_COLOR = '#2d287b';
const SITE_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const ADMIN_EMAIL = process.env.EMAIL_USER || 'rashedul.afl@gmail.com';
const FACEBOOK_URL = 'https://www.facebook.com/Rashedul7050';
const PRIVACY_URL = `${SITE_URL}/privacy`;
const YEAR = new Date().getFullYear();

/**
 * Build a fully-styled HTML email.
 *
 * @param {Object} opts
 * @param {string}  opts.title      - Email heading shown inside the body card
 * @param {string}  opts.content    - Main HTML content (paragraphs, lists, etc.)
 * @param {string}  [opts.preheader]- Short preview text hidden in inbox list
 * @param {string}  [opts.buttonText] - CTA button label (omit to hide button)
 * @param {string}  [opts.buttonUrl]  - CTA button URL  (omit to hide button)
 * @returns {string} Complete HTML email string
 */
function buildEmail({ title = '', content = '', preheader = '', buttonText = '', buttonUrl = '' }) {
    const preheaderHtml = preheader
        ? `<div style="display:none;font-size:1px;color:#f5f5f5;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>`
        : '';

    const buttonHtml = buttonText && buttonUrl
        ? `
        <tr>
            <td align="center" style="padding:30px 30px 10px 30px;">
                <!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${buttonUrl}" style="height:46px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="${BRAND_COLOR}">
                    <w:anchorlock/>
                    <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">${buttonText}</center>
                </v:roundrect>
                <![endif]-->
                <!--[if !mso]><!-->
                <a href="${buttonUrl}" target="_blank"
                   style="background-color:${BRAND_COLOR};color:#ffffff;display:inline-block;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;line-height:46px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;border-radius:4px;mso-hide:all;">
                    ${buttonText}
                </a>
                <!--<![endif]-->
            </td>
        </tr>`
        : '';

    return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>${title ? title + ' | MailStora' : 'MailStora'}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Reset */
        body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
        table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
        img { -ms-interpolation-mode:bicubic; border:0; height:auto; line-height:100%; outline:none; text-decoration:none; }
        /* Outlook link override */
        a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; }
        /* Mobile */
        @media only screen and (max-width:600px) {
            .email-wrapper { width:100% !important; max-width:100% !important; }
            .email-container { width:100% !important; }
            .nav-link { display:none !important; }
            .mobile-hide { display:none !important; }
            .content-td { padding:20px 16px !important; }
        }
    </style>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

${preheaderHtml}

<!-- Outer wrapper -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f5f5f5;">
    <tr>
        <td align="center" style="padding:24px 16px;">

            <!-- Email container — max 600px -->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="email-container"
                   style="max-width:600px;width:600px;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

                <!-- ===================== HEADER ===================== -->
                <tr>
                    <td style="background-color:${BRAND_COLOR};padding:0;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <!-- Logo -->
                                <td style="padding:20px 30px;" valign="middle">
                                    <a href="${SITE_URL}" target="_blank" style="text-decoration:none;">
                                        <span style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:#ffffff;letter-spacing:0.5px;">
                                            Mail<span style="color:#a5b4fc;">Stora</span>
                                        </span>
                                    </a>
                                </td>
                                <!-- Nav links (hidden on mobile) -->
                                <td align="right" style="padding:20px 30px;" valign="middle" class="mobile-hide">
                                    <a href="${SITE_URL}/#services" target="_blank"
                                       style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#c7d2fe;text-decoration:none;margin-left:20px;">Services</a>
                                    <a href="${SITE_URL}/#prices" target="_blank"
                                       style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#c7d2fe;text-decoration:none;margin-left:20px;">Pricing</a>
                                    <a href="${SITE_URL}/#portfolio" target="_blank"
                                       style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#c7d2fe;text-decoration:none;margin-left:20px;">Portfolio</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- Accent bar -->
                <tr>
                    <td style="background-color:#4f46e5;height:4px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>

                <!-- ===================== BODY ===================== -->
                <tr>
                    <td style="background-color:#ffffff;padding:40px 40px 30px 40px;" class="content-td">

                        ${title ? `
                        <!-- Title -->
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td style="padding-bottom:24px;border-bottom:2px solid #f0f0f0;">
                                    <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:${BRAND_COLOR};line-height:1.3;">${title}</h1>
                                </td>
                            </tr>
                        </table>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr><td style="padding-top:24px;"></td></tr>
                        </table>
                        ` : ''}

                        <!-- Dynamic content injected here -->
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#444444;">
                                    ${content}
                                </td>
                            </tr>
                        </table>

                        ${buttonHtml}

                        <!-- Divider -->
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td style="padding-top:30px;border-top:1px solid #f0f0f0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#888888;">
                                    <p style="margin:0 0 4px 0;">Best regards,</p>
                                    <p style="margin:0;font-weight:bold;color:${BRAND_COLOR};">The MailStora Team</p>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>

                <!-- ===================== FOOTER ===================== -->
                <tr>
                    <td style="background-color:${BRAND_COLOR};padding:28px 30px;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">

                            <!-- Logo row -->
                            <tr>
                                <td align="center" style="padding-bottom:16px;">
                                    <a href="${SITE_URL}" target="_blank" style="text-decoration:none;">
                                        <span style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:#ffffff;">
                                            Mail<span style="color:#a5b4fc;">Stora</span>
                                        </span>
                                    </a>
                                </td>
                            </tr>

                            <!-- Links row -->
                            <tr>
                                <td align="center" style="padding-bottom:16px;">
                                    <a href="mailto:${ADMIN_EMAIL}" target="_blank"
                                       style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#c7d2fe;text-decoration:none;margin:0 10px;">Contact Us</a>
                                    <span style="color:#6366f1;font-size:12px;">|</span>
                                    <a href="${FACEBOOK_URL}" target="_blank"
                                       style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#c7d2fe;text-decoration:none;margin:0 10px;">Facebook</a>
                                    <span style="color:#6366f1;font-size:12px;">|</span>
                                    <a href="${PRIVACY_URL}" target="_blank"
                                       style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#c7d2fe;text-decoration:none;margin:0 10px;">Privacy Policy</a>
                                </td>
                            </tr>

                            <!-- Copyright -->
                            <tr>
                                <td align="center">
                                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#818cf8;line-height:1.5;">
                                        &copy; ${YEAR} MailStora. All rights reserved.<br>
                                        Professional HTML Email Templates &amp; Signatures
                                    </p>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>

            </table>
            <!-- /Email container -->

        </td>
    </tr>
</table>
<!-- /Outer wrapper -->

</body>
</html>`;
}

module.exports = { buildEmail };
