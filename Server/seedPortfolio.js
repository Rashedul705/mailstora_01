require('dotenv').config();
const mongoose = require('mongoose');
const PortfolioItem = require('./src/models/Portfolio');

const seedData = [
  {
    title: "Canadian Choice Windows & Doors",
    slug: "canadian-choice-windows-doors",
    clientName: "Canadian Choice",
    type: "Email Template",
    esp: "Mailchimp",
    industry: "Home Improvement",
    year: "2024",
    shortDescription: "Fully responsive HTML email template for a seasonal campaign.",
    fullDescription: "Canadian Choice needed a responsive email template for their seasonal campaign. The old template was breaking in Outlook. We rebuilt it from scratch with hand-coded HTML and inline CSS.",
    whatWasIncluded: "Custom HTML + inline CSS\nMobile-first responsive layout\nTested in 20+ email clients",
    coverImage: "https://i.ibb.co/b3bSgWJ/email1.jpg", 
    cardBackground: "navy",
    desktopImages: ["https://i.ibb.co/b3bSgWJ/email1.jpg"],
    mobileImages: ["https://i.ibb.co/b3bSgWJ/email1.jpg"],
    angleViews: [],
    compatibility: ["Gmail", "Outlook 365", "Apple Mail", "iOS Mail"],
    results: { openRate: "38%", clickRate: "2.4x", deliveryTime: "36 hours", customMetric: "100% Outlook OK" },
    tags: ["responsive", "mailchimp", "home improvement"],
    status: "published",
    featuredOnLanding: true,
    sortOrder: 1,
    views: 342,
  },
  {
    title: "SaaS Onboarding Sequence",
    slug: "saas-onboarding-sequence",
    clientName: "TechFlow SaaS",
    type: "Case Study",
    esp: "Klaviyo",
    industry: "Software",
    year: "2023",
    shortDescription: "Increased onboarding completion by 42% through targeted email flow redesign.",
    fullDescription: "We redesigned the 5-step onboarding sequence to focus on single actions per email.",
    whatWasIncluded: "5 Email Templates\nStrategy & Copywriting\nA/B Testing Setup",
    coverImage: "https://i.ibb.co/XXV06T2/email2.jpg",
    cardBackground: "dark-navy",
    desktopImages: [],
    mobileImages: [],
    angleViews: [],
    compatibility: ["Gmail", "Apple Mail"],
    results: { openRate: "42%", clickRate: "3x", deliveryTime: "5 days", customMetric: "+121% completion" },
    tags: ["saas", "onboarding", "klaviyo"],
    status: "published",
    featuredOnLanding: true,
    sortOrder: 2,
    views: 519,
  },
  {
    title: "Corporate Email Signature",
    slug: "corporate-email-signature",
    clientName: "Apex Financial",
    type: "Email Signature",
    esp: "Other",
    industry: "Finance",
    year: "2024",
    shortDescription: "Clean, professional HTML signature with company banner.",
    fullDescription: "A standardized email signature for a team of 50+ employees.",
    whatWasIncluded: "HTML Signature\nInstallation Guide",
    coverImage: "https://i.ibb.co/QfH30p6/sig1.jpg",
    cardBackground: "dark-green",
    desktopImages: [],
    mobileImages: [],
    angleViews: [],
    compatibility: ["Outlook 365", "Gmail"],
    results: { openRate: "", clickRate: "", deliveryTime: "24 hours", customMetric: "" },
    tags: ["signature", "corporate"],
    status: "published",
    featuredOnLanding: true,
    sortOrder: 3,
    views: 198,
  },
  {
    title: "E-commerce Seasonal Promo",
    slug: "e-commerce-seasonal-promo",
    clientName: "Urban Vogue",
    type: "Email Template",
    esp: "Klaviyo",
    industry: "Fashion",
    year: "2024",
    shortDescription: "High-converting product grid template for fashion retailer.",
    fullDescription: "We created a dynamic, mobile-first product grid that gracefully degrades in older clients.",
    whatWasIncluded: "Custom HTML\nDark Mode Support\nDynamic Product Blocks",
    coverImage: "https://i.ibb.co/hKzK2n5/email3.jpg",
    cardBackground: "dark-red",
    desktopImages: [],
    mobileImages: [],
    angleViews: [],
    compatibility: ["iOS Mail", "Gmail", "Apple Mail"],
    results: { openRate: "28%", clickRate: "1.5x", deliveryTime: "48 hours", customMetric: "$6.3k Revenue" },
    tags: ["ecommerce", "promo", "dark mode"],
    status: "published",
    featuredOnLanding: true,
    sortOrder: 4,
    views: 287,
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB');
    await PortfolioItem.deleteMany({});
    await PortfolioItem.insertMany(seedData);
    console.log('Seed data inserted');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
