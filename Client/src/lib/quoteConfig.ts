import React from 'react';

export const ICONS: Record<string, string> = {
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    trend: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    tick: '<polyline points="20 6 9 17 4 12"/>',
    clip: '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>'
};

export const SERVICES = [
    { id: 'html-email-templates', group: 'Email development', name: 'HTML email templates', desc: 'Hand-coded, responsive, ready for any ESP', icon: 'code' },
    { id: 'figma-psd-to-html', group: 'Email development', name: 'Figma and PSD to HTML', desc: 'Your design, converted to HTML email', icon: 'layers' },
    { id: 'email-testing', group: 'Email development', name: 'Email testing and Outlook fixes', desc: 'Tested in 50+ email clients', icon: 'check' },
    { id: 'klaviyo-flows', group: 'Klaviyo and ESP', name: 'Klaviyo flow setup', desc: 'Welcome, cart and post-purchase flows', icon: 'zap' },
    { id: 'campaigns', group: 'Klaviyo and ESP', name: 'Klaviyo and Mailchimp campaigns', desc: 'Campaigns designed and scheduled', icon: 'send' },
    { id: 'esp-templates', group: 'Klaviyo and ESP', name: 'Templates for your ESP', desc: 'Klaviyo, Mailchimp or HubSpot templates', icon: 'layout' },
    { id: 'signatures', group: 'Signatures and more', name: 'HTML email signatures', desc: 'Gmail, Outlook and Apple Mail', icon: 'pen' },
    { id: 'white-label', group: 'Signatures and more', name: 'White-label for agencies', desc: 'Email development under your brand', icon: 'users' },
    { id: 'shopify', group: 'Signatures and more', name: 'Shopify development', desc: 'New stores, redesigns and fixes', icon: 'bag' },
    { id: 'social-media', group: 'Signatures and more', name: 'Social media management', desc: 'Instagram, Pinterest, X, TikTok', icon: 'heart' },
    { id: 'seo', group: 'Signatures and more', name: 'SEO, AEO and GEO', desc: 'Be found in search and AI answers', icon: 'search' },
    { id: 'performance-marketing', group: 'Signatures and more', name: 'Performance marketing', desc: 'Meta ads and server-side tracking', icon: 'trend' }
];

const PLAT = ['Klaviyo', 'Mailchimp', 'HubSpot', 'Brevo', 'Other'];
const DESIGN = ['Figma', 'PSD', 'PDF or image', 'Brief only', 'Not sure'];
const COUNT = ['1 email', '2 to 5', '6 to 10', 'More than 10'];
const NOTES = { key: 'notes', label: 'Anything else we should know?', type: 'long', ph: 'Brand, audience, examples you like, deadlines.', opt: true };

export const QS: Record<string, any[]> = {
    'html-email-templates': [
        { key: 'design', label: 'Do you have a design?', type: 'single', opts: DESIGN },
        { key: 'count', label: 'How many emails?', type: 'single', opts: COUNT },
        { key: 'platform', label: 'Which platform will you send from?', type: 'single', opts: PLAT },
        { key: 'dark', label: 'Do you need dark mode support?', type: 'single', opts: ['Yes', 'No', 'Not sure'] },
        { key: 'link', label: 'Design link or reference', type: 'link', ph: 'Figma, Dropbox or Google Drive link', opt: true, attach: true },
        NOTES
    ],
    'figma-psd-to-html': [
        { key: 'design', label: 'What is your design file?', type: 'single', opts: ['Figma', 'PSD', 'Sketch or XD', 'Image or PDF'] },
        { key: 'count', label: 'How many emails?', type: 'single', opts: COUNT },
        { key: 'platform', label: 'Which platform will you send from?', type: 'single', opts: PLAT },
        { key: 'link', label: 'Link to the design', type: 'link', ph: 'Figma or file link', opt: true, attach: true },
        NOTES
    ],
    'email-testing': [
        { key: 'problem', label: 'What is going wrong?', type: 'multi', opts: ['Broken layout in Outlook', 'Dark mode issues', 'Mobile issues', 'Gmail clipping', 'Images not loading', 'Not sure'] },
        { key: 'platform', label: 'Which platform do you send from?', type: 'single', opts: PLAT },
        { key: 'link', label: 'Link to the email or HTML file', type: 'link', ph: 'Link to the email, or attach the HTML', opt: true, attach: true },
        NOTES
    ],
    'klaviyo-flows': [
        { key: 'flows', label: 'Which flows do you need?', type: 'multi', opts: ['Welcome', 'Abandoned cart', 'Browse abandonment', 'Post-purchase', 'Win-back', 'Other'] },
        { key: 'store', label: 'Which store platform?', type: 'single', opts: ['Shopify', 'WooCommerce', 'BigCommerce', 'Other'] },
        { key: 'scope', label: 'What do you need from us?', type: 'single', opts: ['Build only', 'Design and build', 'Copy, design and build'] },
        { key: 'link', label: 'Store link', type: 'link', ph: 'https://yourstore.com', opt: true },
        NOTES
    ],
    'campaigns': [
        { key: 'platform', label: 'Which platform?', type: 'single', opts: ['Klaviyo', 'Mailchimp', 'Both', 'Other'] },
        { key: 'volume', label: 'How many campaigns?', type: 'single', opts: ['One-off', '1 to 2 a month', '3 to 4 a month', 'Weekly or more'] },
        { key: 'scope', label: 'What do you need from us?', type: 'single', opts: ['Design and build', 'Build only', 'Build and scheduling'] },
        { key: 'link', label: 'Brand or store link', type: 'link', ph: 'https://yourbrand.com', opt: true },
        NOTES
    ],
    'esp-templates': [
        { key: 'platform', label: 'Which platform?', type: 'single', opts: ['Klaviyo', 'Mailchimp', 'HubSpot', 'Other'] },
        { key: 'type', label: 'What kind of templates?', type: 'single', opts: ['Newsletter', 'Promotional', 'Transactional', 'A mix'] },
        { key: 'count', label: 'How many templates?', type: 'single', opts: ['1', '2 to 5', '6 to 10', 'More than 10'] },
        { key: 'design', label: 'Do you have a design?', type: 'single', opts: DESIGN },
        { key: 'link', label: 'Design link or reference', type: 'link', ph: 'Figma, Dropbox or Google Drive link', opt: true, attach: true },
        NOTES
    ],
    'signatures': [
        { key: 'client', label: 'Where will it be used?', type: 'multi', opts: ['Gmail', 'Outlook', 'Apple Mail', 'Not sure'] },
        { key: 'people', label: 'How many people need one?', type: 'single', opts: ['Just me', '2 to 10', 'More than 10'] },
        { key: 'brand', label: 'Do you have a brand guide?', type: 'single', opts: ['Yes', 'Logo only', 'No'] },
        { key: 'link', label: 'Logo or brand guide link', type: 'link', ph: 'Link to your logo or brand guide', opt: true, attach: true },
        NOTES
    ],
    'white-label': [
        { key: 'volume', label: 'Expected monthly volume', type: 'single', opts: ['1 to 5 emails', '6 to 20 emails', 'More than 20', 'Not sure'] },
        { key: 'platforms', label: 'Which platforms do your clients use?', type: 'multi', opts: ['Klaviyo', 'Mailchimp', 'HubSpot', 'Other'] },
        { key: 'link', label: 'Agency website', type: 'link', ph: 'https://youragency.com', opt: true },
        NOTES
    ],
    'shopify': [
        { key: 'type', label: 'What do you need?', type: 'single', opts: ['New store', 'Redesign', 'Fixes and custom features', 'Not sure'] },
        { key: 'link', label: 'Store link, if you have one', type: 'link', ph: 'https://yourstore.com', opt: true },
        { key: 'goal', label: 'What is your main goal?', type: 'long', ph: 'For example: launch in 3 weeks, improve checkout, change the theme.', opt: true }
    ],
    'social-media': [
        { key: 'platforms', label: 'Which platforms?', type: 'multi', opts: ['Instagram', 'Pinterest', 'Facebook', 'X or Twitter', 'TikTok'] },
        { key: 'scope', label: 'What do you need?', type: 'single', opts: ['Content and posting', 'Growth and engagement', 'Both'] },
        { key: 'link', label: 'Your profile or brand link', type: 'link', ph: 'https://instagram.com/yourbrand', opt: true },
        NOTES
    ],
    'seo': [
        { key: 'link', label: 'Website link', type: 'link', ph: 'https://yoursite.com', opt: true },
        { key: 'goal', label: 'Main goal', type: 'single', opts: ['More traffic', 'Rank locally', 'Show up in AI answers', 'Not sure'] },
        NOTES
    ],
    'performance-marketing': [
        { key: 'platforms', label: 'Which ad platforms?', type: 'multi', opts: ['Meta ads', 'Google ads', 'Pinterest ads', 'Not sure'] },
        { key: 'spend', label: 'Monthly ad spend', type: 'single', opts: ['Under $500', '$500 to $2,000', 'Over $2,000', 'Not sure'] },
        { key: 'tracking', label: 'Do you need tracking set up?', type: 'single', opts: ['Yes, server-side tracking', 'Yes, basic tracking', 'No', 'Not sure'] },
        { key: 'link', label: 'Website or store link', type: 'link', ph: 'https://yoursite.com', opt: true },
        NOTES
    ]
};

export const DEADLINE = ['As soon as possible', 'Within a week', 'Within a month', 'Flexible'];
export const BUDGET = ['Under $100', '$100 to $300', '$300 to $1,000', 'Over $1,000', 'Not sure yet'];
