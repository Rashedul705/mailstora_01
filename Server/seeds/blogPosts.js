const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const Post = require('../src/models/Post');

const generateSlug = (title) =>
  title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

const dummyPosts = [
  {
    title: "10 Email Marketing Mistakes That Are Killing Your Open Rates",
    category: "Email Marketing",
    tags: ["email", "open rates", "deliverability", "segmentation"],
    excerpt: "Most businesses make the same email mistakes over and over. Here's how to identify and fix them before your next campaign goes out.",
    content: `<p>Email marketing delivers <strong>$36 for every $1 spent</strong> — the highest ROI of any marketing channel. But most businesses are unknowingly sabotaging their own results with a handful of very fixable mistakes.</p>
    <blockquote class="tip-box">The biggest email mistakes are both technical and strategic. The good news? All of them are fixable in under an hour.</blockquote>
    <h2>1. Using a No-Reply Email Address</h2>
    <p>Nothing kills engagement faster than sending from "noreply@yourcompany.com". It signals to subscribers that their reply doesn't matter — and reply rate is one of the strongest deliverability signals for inbox placement.</p>
    <h2>2. Ignoring Mobile Optimization</h2>
    <p>Over 60% of emails are opened on mobile devices. If your template breaks on a phone screen, you're losing more than half your audience before they read a single word.</p>
    <ul>
      <li>Use single-column layouts for mobile screens</li>
      <li>Keep subject lines under 40 characters</li>
      <li>Use large tap-friendly buttons — minimum 44px height</li>
      <li>Always test on real devices before sending</li>
    </ul>
    <h2>3. Sending Without Segmentation</h2>
    <p>Blasting the same email to your entire list is a 2015 strategy. Modern email marketing means sending the right message to the right person at the right time.</p>
    <p>Other mistakes include bad subject lines, wrong send frequency, dirty email lists, no personalization, skipping A/B testing, weak CTA, and not tracking metrics.</p>`,
    status: "published",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    author: { name: "Rashedul Islam" },
    metaTitle: "10 Email Marketing Mistakes That Are Killing Your Open Rates",
    metaDescription: "Most businesses make the same email mistakes over and over. Here's how to identify and fix them before your next campaign goes out."
  },
  {
    title: "How to Build a Marketing Funnel That Actually Converts in 2026",
    category: "Digital Marketing",
    tags: ["funnel", "conversion", "marketing strategy", "leads"],
    excerpt: "Most marketing funnels leak at every stage. Here's how to build one that actually moves people from stranger to paying customer.",
    content: `<p>A marketing funnel isn't just a buzzword; it's the customer journey mapped out. But most funnels have massive leaks.</p>
    <h2>Awareness Stage</h2>
    <p>This is where people discover you. Content marketing, SEO, and social media are key here. But don't just ask for the sale immediately.</p>
    <h2>Interest Stage</h2>
    <p>Once they know you, you need their email. Offer a lead magnet that solves a specific problem for them. This is where your email marketing kicks in.</p>
    <h2>Decision Stage</h2>
    <p>Now they are comparing you to competitors. Send case studies, testimonials, and detailed product comparisons via email.</p>
    <h2>Action Stage</h2>
    <p>The final push. Offer a time-sensitive discount or a strong call to action to convert them into paying customers.</p>`,
    status: "published",
    publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    author: { name: "Rashedul Islam" }
  },
  {
    title: "Why Every Small Business Needs an Email List (Not Just Social Media)",
    category: "Business Growth",
    tags: ["email list", "small business", "social media", "audience"],
    excerpt: "Social media algorithms change overnight. Your email list is an asset you actually own — here's why that matters more than ever in 2026.",
    content: `<p>Relying solely on social media is like building your house on rented land. If the algorithm changes, your reach disappears.</p>
    <h2>Ownership is Key</h2>
    <p>You don't own your Instagram followers. You do own your email list. It's an asset that you can take with you, regardless of platform changes.</p>
    <h2>Direct Access</h2>
    <p>When you send an email, it lands directly in their inbox. There's no algorithm deciding if they should see it or not.</p>
    <h2>Higher Conversion Rates</h2>
    <p>Email marketing consistently outperforms social media when it comes to actual sales and conversions.</p>
    <h2>How to Start</h2>
    <ul>
      <li>Create a simple landing page.</li>
      <li>Offer a valuable freebie (lead magnet).</li>
      <li>Promote it everywhere.</li>
    </ul>`,
    status: "published",
    publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    author: { name: "Rashedul Islam" }
  },
  {
    title: "How to Write Email Subject Lines That Get Opened Every Time",
    category: "Tutorial",
    tags: ["subject lines", "copywriting", "open rates", "email tips"],
    excerpt: "The average person receives 121 emails per day. Here's how to write subject lines that stand out in a crowded inbox and actually get clicked.",
    content: `<p>Your subject line is the gatekeeper of your email. If it fails, the rest of your content doesn't matter.</p>
    <h2>The Curiosity Gap</h2>
    <p>Give them just enough information to make them curious, but not enough to satisfy that curiosity without opening the email.</p>
    <h2>Personalization</h2>
    <p>Using their name is good, but personalizing based on their past behavior or interests is even better.</p>
    <h2>Power Words</h2>
    <p>Words like "Exclusive", "Secret", "Limited", and "Now" can significantly boost open rates.</p>
    <h2>Emoji Usage</h2>
    <p>Use emojis sparingly to stand out, but don't overdo it. One well-placed emoji can increase opens by 56%.</p>`,
    status: "published",
    publishedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
    author: { name: "Rashedul Islam" }
  },
  {
    title: "Mailchimp vs Klaviyo vs HubSpot: Which ESP Should You Use in 2026?",
    category: "Tutorial",
    tags: ["Mailchimp", "Klaviyo", "HubSpot", "ESP", "email platform"],
    excerpt: "Choosing the wrong email platform wastes time and money. Here's a straight honest comparison of the top three ESPs so you can pick the right one.",
    content: `<p>Choosing an Email Service Provider (ESP) is a critical decision. Let's compare the giants.</p>
    <h2>Mailchimp</h2>
    <p>Great for beginners. It's easy to use and has a generous free tier, but automation can be clunky.</p>
    <h2>Klaviyo</h2>
    <p>The king of e-commerce. Its integration with Shopify is unmatched, and its segmentation features are incredibly powerful. It is more expensive, though.</p>
    <h2>HubSpot</h2>
    <p>More than just an ESP, it's a full CRM. If you need sales and marketing alignment, this is the way to go. However, it's the most expensive option.</p>
    <p>Conclusion: Choose Mailchimp if you're just starting, Klaviyo for e-commerce, and HubSpot for B2B/complex sales.</p>`,
    status: "published",
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    author: { name: "Rashedul Islam" }
  },
  {
    title: "Case Study: How We Helped a SaaS Brand Achieve 42% Email Open Rate",
    category: "Case Study",
    tags: ["case study", "SaaS", "open rate", "HTML email", "results"],
    excerpt: "The industry average open rate is 21%. Here's exactly how we helped one SaaS company more than double that with a redesigned HTML email template.",
    content: `<p>We recently worked with a SaaS company struggling with low engagement.</p>
    <h2>The Problem</h2>
    <p>Their emails were text-heavy, not mobile-responsive, and lacked clear calls to action. Their open rate was stuck at 18%.</p>
    <h2>The Solution</h2>
    <p>We completely redesigned their templates. We used a clean, single-column layout, large tap-friendly buttons, and optimized their subject lines using A/B testing.</p>
    <h2>The Results</h2>
    <p>Within two months, their open rate skyrocketed to 42%, and their click-through rate tripled. The key takeaway? Design and deliverability go hand-in-hand.</p>`,
    status: "published",
    publishedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    author: { name: "Rashedul Islam" }
  }
];

const seedDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mailstora'; // Replace with fallback or ensure .env is read
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');

    await Post.deleteMany({});
    console.log('Existing posts removed.');

    for (const post of dummyPosts) {
      post.slug = generateSlug(post.title);
      const newPost = new Post(post);
      await newPost.save();
    }

    console.log('Dummy posts seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
