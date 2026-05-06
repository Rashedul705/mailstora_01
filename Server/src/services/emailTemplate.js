/**
 * MailStora Reusable Email Template
 * Uses table-based layout + inline CSS for maximum email client compatibility.
 * Logo is pure HTML — no images needed, works in ALL email clients (Gmail, Outlook, Apple Mail).
 */

const BRAND_COLOR  = '#2d287b';
const ACCENT_COLOR = '#f97316';
const SITE_URL     = process.env.FRONTEND_URL || 'https://mailstora.com';
const ADMIN_EMAIL  = process.env.EMAIL_USER   || 'rashedul.afl@gmail.com';
const FACEBOOK_URL = 'https://www.facebook.com/Rashedul7050';
const PRIVACY_URL  = `${SITE_URL}/privacy`;
const YEAR         = new Date().getFullYear();

/**
 * Pure HTML logo matching the website design exactly:
 *   - Orange envelope icon (✉) + navy border box
 *   - "Mail" in orange bold + "stora" in navy bold
 * @param {'light'|'dark'} theme - 'dark' for dark backgrounds (navy header/footer)
 */
function logoHtml(theme = 'light') {
    const LOGO_URL = 'https://i.ibb.co/Wv3XJf8p/2cdac023da4e.jpg';
    return `<table role="presentation" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" valign="middle">
                <img src="${LOGO_URL}" alt="MailStora Logo" width="260" style="display:block;border:0;outline:none;text-decoration:none;width:260px;height:auto;" />
            </td>
        </tr>
    </table>`;
}

function buildEmail({ title = '', content = '', preheader = '', buttonText = '', buttonUrl = '' }) {

    const preheaderHtml = preheader
        ? `<div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>`
        : '';

    const buttonHtml = buttonText && buttonUrl
        ? `<tr>
            <td align="center" style="padding:28px 30px 8px 30px;">
                <a href="${buttonUrl}" target="_blank"
                   style="background-color:${ACCENT_COLOR};color:#ffffff;display:inline-block;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;line-height:48px;text-align:center;text-decoration:none;padding:0 28px;border-radius:6px;">
                    ${buttonText}
                </a>
            </td>
          </tr>`
        : '';

    const titleHtml = title
        ? `<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
               <tr><td style="padding-bottom:20px;border-bottom:2px solid #f0f0f0;">
                   <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:${BRAND_COLOR};line-height:1.3;">${title}</h1>
               </td></tr>
           </table>
           <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
               <tr><td style="padding-top:24px;"></td></tr>
           </table>`
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
    <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
    <![endif]-->
    <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; max-width: 100% !important; }
            .mobile-hide     { display: none !important; }
            .content-pad     { padding: 20px 16px !important; }
        }
    </style>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">

${preheaderHtml}

<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f1f5f9;">
<tr><td align="center" style="padding:32px 16px;">

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="email-container"
           style="max-width:600px;width:100%;border-radius:10px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.10);">

        <!-- ===== HEADER ===== -->
        <tr>
            <td style="background-color:${BRAND_COLOR};padding:20px 32px;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <!-- Logo -->
                        <td valign="middle">
                            <a href="${SITE_URL}" target="_blank" style="text-decoration:none;">
                                ${logoHtml('dark')}
                            </a>
                        </td>
                        <!-- Nav links (hidden on mobile) -->
                        <td align="right" valign="middle" class="mobile-hide">
                            <a href="${SITE_URL}/#services"  target="_blank" style="font-family:Arial,sans-serif;font-size:12px;color:#c7d2fe;text-decoration:none;margin-left:16px;">Services</a>
                            <a href="${SITE_URL}/pricing"    target="_blank" style="font-family:Arial,sans-serif;font-size:12px;color:#c7d2fe;text-decoration:none;margin-left:16px;">Pricing</a>
                            <a href="${SITE_URL}/#portfolio" target="_blank" style="font-family:Arial,sans-serif;font-size:12px;color:#c7d2fe;text-decoration:none;margin-left:16px;">Portfolio</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Orange accent bar -->
        <tr><td style="background-color:${ACCENT_COLOR};height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>

        <!-- ===== BODY ===== -->
        <tr>
            <td class="content-pad" style="background-color:#ffffff;padding:36px 40px 28px 40px;">

                ${titleHtml}

                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.75;color:#374151;">
                            ${content}
                        </td>
                    </tr>
                </table>

                ${buttonHtml}

                <!-- Sign-off -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding-top:28px;border-top:1px solid #f0f0f0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b7280;">
                            <p style="margin:0 0 4px 0;">Best regards,</p>
                            <p style="margin:0;font-weight:bold;color:${BRAND_COLOR};">The MailStora Team</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- ===== FOOTER ===== -->
        <tr>
            <td style="background-color:${BRAND_COLOR};padding:24px 32px;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <!-- Logo -->
                    <tr>
                        <td align="center" style="padding-bottom:14px;">
                            <a href="${SITE_URL}" target="_blank" style="text-decoration:none;">
                                ${logoHtml('dark')}
                            </a>
                        </td>
                    </tr>
                    <!-- Links -->
                    <tr>
                        <td align="center" style="padding-bottom:12px;">
                            <a href="mailto:${ADMIN_EMAIL}" style="font-family:Arial,sans-serif;font-size:12px;color:#c7d2fe;text-decoration:none;margin:0 8px;">Contact Us</a>
                            <span style="color:#6366f1;">|</span>
                            <a href="${FACEBOOK_URL}" target="_blank" style="font-family:Arial,sans-serif;font-size:12px;color:#c7d2fe;text-decoration:none;margin:0 8px;">Facebook</a>
                            <span style="color:#6366f1;">|</span>
                            <a href="${PRIVACY_URL}" target="_blank" style="font-family:Arial,sans-serif;font-size:12px;color:#c7d2fe;text-decoration:none;margin:0 8px;">Privacy Policy</a>
                        </td>
                    </tr>
                    <!-- Copyright -->
                    <tr>
                        <td align="center">
                            <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#818cf8;line-height:1.6;">
                                &copy; ${YEAR} MailStora. All rights reserved.<br>
                                Professional HTML Email Templates &amp; Signatures
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

    </table>

</td></tr>
</table>

</body>
</html>`;
}

module.exports = { buildEmail };
