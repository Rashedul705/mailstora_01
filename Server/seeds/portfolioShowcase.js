// Adds 10 showcase portfolio items that use the cropped images in Client/public/images/media/cropped.
// Safe to re-run: items are upserted by slug.
// Usage (from the Server folder): node seeds/portfolioShowcase.js
require('dotenv').config();
const mongoose = require('mongoose');
const PortfolioItem = require('../src/models/Portfolio');

const IMG = '/images/media/cropped/';

const items = [
    {
        title: 'Fashion New Collection Launch Email',
        slug: 'fashion-new-collection-launch-email',
        clientName: 'Concept Design',
        type: 'Email Template',
        esp: 'Klaviyo',
        industry: 'Fashion',
        year: '2026',
        shortDescription: 'Editorial product launch email with a lifestyle hero, product grid and trust badges.',
        fullDescription: 'A responsive new-collection announcement built for fashion ecommerce. The editorial hero leads into a three-product grid with prices, followed by shipping, returns and payment trust badges. Coded with bulletproof buttons and fluid images so it holds up in Outlook and on mobile.',
        whatWasIncluded: 'Custom HTML template\nKlaviyo editable blocks\nMobile responsive layout\nDark mode support',
        coverImage: IMG + 'mailstora-fashion-email.webp',
        cardBackground: 'dark-red',
        compatibility: ['Gmail', 'Outlook', 'Apple Mail', 'iOS Mail'],
        // Concept work: no open or click rates, only delivery time
        results: { deliveryTime: '48 hours' },
        tags: ['fashion', 'ecommerce', 'product launch'],
        sortOrder: 1,
    },
    {
        title: 'Black Friday Sale Email',
        slug: 'black-friday-sale-email',
        clientName: 'Concept Design',
        type: 'Email Template',
        esp: 'Mailchimp',
        industry: 'Electronics',
        year: '2026',
        shortDescription: 'High-contrast Black Friday promo with a bold discount badge and product highlights.',
        fullDescription: 'A dark, high-contrast Black Friday campaign designed to stand out in a crowded inbox. Features a large discount badge, glowing product photography and a clear call to action, with dark mode colours locked so the design stays on-brand in every client.',
        whatWasIncluded: 'Custom HTML template\nMailchimp merge tags\nDark mode safe colours\nMobile responsive layout',
        coverImage: IMG + 'mailstora-black-friday-email.webp',
        cardBackground: 'dark-navy',
        compatibility: ['Gmail', 'Outlook', 'Apple Mail', 'Yahoo Mail'],
        // Concept work: no open or click rates, only delivery time
        results: { deliveryTime: '24 hours' },
        tags: ['black friday', 'sale', 'promo'],
        sortOrder: 2,
    },
    {
        title: 'Christmas Holiday Greeting Email',
        slug: 'christmas-holiday-greeting-email',
        clientName: 'Concept Design',
        type: 'Email Template',
        esp: 'Klaviyo',
        industry: 'Retail',
        year: '2026',
        shortDescription: 'Festive holiday email with an illustrated hero, seasonal offer and gift categories.',
        fullDescription: 'A warm Christmas greeting and holiday offer built for retail brands. An illustrated winter hero sets the mood, followed by a seasonal message, a shop-now button and quick links to gifts, decor, offers and new arrivals.',
        whatWasIncluded: 'Custom HTML template\nKlaviyo editable blocks\nSeasonal image optimisation\nMobile responsive layout',
        coverImage: IMG + 'mailstora-christmas-email.webp',
        cardBackground: 'dark-green',
        compatibility: ['Gmail', 'Outlook', 'Apple Mail', 'iOS Mail'],
        // Concept work: no open or click rates, only delivery time
        results: { deliveryTime: '48 hours' },
        tags: ['holiday', 'christmas', 'seasonal'],
        sortOrder: 3,
    },
    {
        title: 'Abandoned Cart Recovery Email',
        slug: 'abandoned-cart-recovery-email',
        clientName: 'Concept Design',
        type: 'Email Template',
        esp: 'Klaviyo',
        industry: 'Ecommerce',
        year: '2026',
        shortDescription: 'Klaviyo abandoned cart email with dynamic product rows and a clear checkout button.',
        fullDescription: 'An abandoned cart flow email that reminds shoppers exactly what they left behind. Dynamic product rows pull item name, quantity and price from Klaviyo, and trust badges for secure checkout, free shipping and easy returns help close the sale.',
        whatWasIncluded: 'Custom HTML template\nKlaviyo dynamic product blocks\nFlow setup support\nMobile responsive layout',
        coverImage: IMG + 'mailstora-abandoned-cart-email.webp',
        cardBackground: 'navy',
        compatibility: ['Gmail', 'Outlook', 'Apple Mail', 'Samsung Email'],
        // Concept work: no open or click rates, only delivery time
        results: { deliveryTime: '48 hours' },
        tags: ['abandoned cart', 'klaviyo flow', 'automation'],
        sortOrder: 4,
    },
    {
        title: 'Weekly Marketing Newsletter Email',
        slug: 'weekly-marketing-newsletter-email',
        clientName: 'Concept Design',
        type: 'Email Template',
        esp: 'HubSpot',
        industry: 'Marketing',
        year: '2026',
        shortDescription: 'Content-led newsletter with a featured article, blog cards and social links.',
        fullDescription: 'A reusable weekly newsletter for content marketing teams. A featured article hero is followed by modular blog cards with read-more links and a social footer. Each module is editable in HubSpot, so the team can publish a new issue in minutes.',
        whatWasIncluded: 'Custom HTML template\nHubSpot editable modules\nReusable article cards\nMobile responsive layout',
        coverImage: IMG + 'mailstora-weekly-newsletter-email.webp',
        cardBackground: 'navy',
        compatibility: ['Gmail', 'Outlook', 'Apple Mail', 'Yahoo Mail'],
        // Concept work: no open or click rates, only delivery time
        results: { deliveryTime: '48 hours' },
        tags: ['newsletter', 'content', 'hubspot'],
        sortOrder: 5,
    },
    {
        title: 'Real Estate Property Listing Email',
        slug: 'real-estate-property-listing-email',
        clientName: 'Concept Design',
        type: 'Email Template',
        esp: 'Mailchimp',
        industry: 'Real Estate',
        year: '2026',
        shortDescription: 'Property showcase email with a hero listing, featured homes and quick buy, sell and rent links.',
        fullDescription: 'A listing email for real estate agencies that leads with a large property hero, then a row of featured homes with prices and quick links to buy, sell, rent or get in touch. Built with fluid images so every photo stays sharp on mobile.',
        whatWasIncluded: 'Custom HTML template\nMailchimp editable blocks\nProperty card modules\nMobile responsive layout',
        coverImage: IMG + 'mailstora-real-estate-email.webp',
        cardBackground: 'navy',
        compatibility: ['Gmail', 'Outlook', 'Apple Mail', 'iOS Mail'],
        // Concept work: no open or click rates, only delivery time
        results: { deliveryTime: '48 hours' },
        tags: ['real estate', 'listings', 'property'],
        sortOrder: 6,
    },
    {
        title: 'SaaS Welcome Onboarding Email',
        slug: 'saas-welcome-onboarding-email',
        clientName: 'Concept Design',
        type: 'Email Template',
        esp: 'HubSpot',
        industry: 'SaaS',
        year: '2026',
        shortDescription: 'Friendly welcome email with a product dashboard preview and three clear next steps.',
        fullDescription: 'A welcome email for SaaS sign-ups that greets new users, previews the product dashboard and guides them through three first steps: create, automate and grow. Designed to drive the first login and early activation.',
        whatWasIncluded: 'Custom HTML template\nHubSpot editable modules\nOnboarding step blocks\nMobile responsive layout',
        coverImage: IMG + 'mailstora-welcome-email.webp',
        cardBackground: 'navy',
        compatibility: ['Gmail', 'Outlook', 'Apple Mail', 'Yahoo Mail'],
        // Concept work: no open or click rates, only delivery time
        results: { deliveryTime: '48 hours' },
        tags: ['welcome', 'onboarding', 'saas'],
        sortOrder: 7,
    },
    {
        title: 'Order Confirmation Transactional Email',
        slug: 'order-confirmation-transactional-email',
        clientName: 'Concept Design',
        type: 'Email Template',
        esp: 'Shopify',
        industry: 'Ecommerce',
        year: '2026',
        shortDescription: 'Clean transactional email with order details, delivery date and an itemised summary.',
        fullDescription: 'A transactional order confirmation for ecommerce stores. It confirms the purchase, shows order and delivery dates, the shipping address and an itemised summary with totals, and gives a clear link to view the order.',
        whatWasIncluded: 'Custom HTML template\nShopify notification setup\nDynamic order fields\nMobile responsive layout',
        coverImage: IMG + 'mailstora-order-confirmation-email.webp',
        cardBackground: 'dark-navy',
        compatibility: ['Gmail', 'Outlook', 'Apple Mail', 'Samsung Email'],
        // Concept work: no open or click rates, only delivery time
        results: { deliveryTime: '24 hours' },
        tags: ['transactional', 'order confirmation', 'shopify'],
        sortOrder: 8,
    },
    {
        title: 'Event Invitation Email',
        slug: 'event-invitation-email',
        clientName: 'Concept Design',
        type: 'Email Template',
        esp: 'Klaviyo',
        industry: 'Events',
        year: '2026',
        shortDescription: 'Conference invitation email with event details, highlights and featured speakers.',
        fullDescription: 'An invitation email for a marketing conference with a bold event hero, date and location, a register button, event highlights and featured speaker cards. Built to drive registrations on desktop and mobile.',
        whatWasIncluded: 'Custom HTML template\nKlaviyo editable blocks\nSpeaker card modules\nMobile responsive layout',
        coverImage: IMG + 'mailstora-event-invitation-email.webp',
        cardBackground: 'dark-navy',
        compatibility: ['Gmail', 'Outlook', 'Apple Mail', 'iOS Mail'],
        // Concept work: no open or click rates, only delivery time
        results: { deliveryTime: '48 hours' },
        tags: ['event', 'invitation', 'conference'],
        sortOrder: 9,
    },
    {
        title: 'Professional HTML Email Signature',
        slug: 'professional-html-email-signature',
        clientName: 'Concept Design',
        type: 'Email Signature',
        esp: 'Gmail / Outlook',
        industry: 'Marketing',
        year: '2026',
        shortDescription: 'Clickable HTML email signature with photo, contact details, social icons and a promo banner.',
        fullDescription: 'A professional HTML email signature with a round profile photo, title, clickable phone, email and website links, social icons and a promotional banner. Works in Gmail, Outlook and Apple Mail.',
        whatWasIncluded: 'Custom HTML signature\nClickable links and social icons\nPromo banner\nInstall guide for Gmail and Outlook',
        coverImage: IMG + 'mailstora-html-email-signature.webp',
        cardBackground: 'navy',
        compatibility: ['Gmail', 'Outlook', 'Apple Mail'],
        // Concept work: no open or click rates, only delivery time
        results: { deliveryTime: '24 hours' },
        tags: ['email signature', 'branding'],
        sortOrder: 10,
    },
];

(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    for (const item of items) {
        await PortfolioItem.updateOne(
            { slug: item.slug },
            { $set: { ...item, status: 'published', featuredOnLanding: true } },
            { upsert: true }
        );
        console.log('Upserted:', item.slug);
    }
    await mongoose.disconnect();
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
