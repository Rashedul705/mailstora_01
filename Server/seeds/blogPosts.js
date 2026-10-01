const mongoose = require('mongoose');
require('dotenv').config();
const Post = require('../src/models/Post');

const dummyPosts = [
  {
    title: "10 Email Marketing Mistakes That Are Killing Your Open Rates",
    category: "Email Marketing",
    tags: ["email", "open rates", "deliverability", "segmentation"],
    excerpt: "Most businesses make the same email mistakes over and over. Here's how to identify and fix them before your next campaign goes out.",
    content: `<p>Most businesses make the same email mistakes over and over. Here's how to identify and fix them before your next campaign goes out.</p>
    <h2>1. Not Segmenting Your List</h2>
    <p>Sending the same email to everyone is a recipe for low engagement. Segment by interest, behavior, or demographics.</p>
    <h2>2. Ignoring Mobile Optimization</h2>
    <p>Over 50% of emails are opened on mobile. If your template isn't responsive, you're losing half your audience.</p>
    <h2>3. Using Generic Subject Lines</h2>
    <p>Your subject line is the gatekeeper. Make it personal, urgent, or curious to drive clicks.</p>
    <blockquote class="tip-box">Tip: Always A/B test your subject lines to see what resonates best with your specific audience.</blockquote>
    <h2>4. Buying Email Lists</h2>
    <p>This is the fastest way to get your domain blacklisted. Build your list organically for quality engagement.</p>`,
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    status: "published",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    author: { name: "Rashedul Islam" }
  },
  {
    title: "How to Build a Marketing Funnel That Actually Converts in 2026",
    category: "Digital Marketing",
    tags: ["funnel", "conversion", "marketing strategy", "leads"],
    excerpt: "Most marketing funnels leak at every stage. Here's how to build one that actually moves people from stranger to paying customer.",
    content: `<p>Most marketing funnels leak at every stage. Here's how to build one that actually moves people from stranger to paying customer.</p>
    <h2>The Awareness Stage</h2>
    <p>Use high-value content to attract the right people to your site.</p>
    <h2>The Consideration Stage</h2>
    <p>Nurture your leads with targeted emails and social proof.</p>
    <h2>The Decision Stage</h2>
    <p>Make a compelling offer that's hard to refuse.</p>`,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    status: "published",
    publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    author: { name: "Rashedul Islam" }
  },
  {
    title: "Why Every Small Business Needs an Email List (Not Just Social Media)",
    category: "Business Growth",
    tags: ["email list", "small business", "social media", "audience"],
    excerpt: "Social media algorithms change overnight. Your email list is an asset you actually own — here's why that matters more than ever in 2026.",
    content: `<p>Social media algorithms change overnight. Your email list is an asset you actually own — here's why that matters more than ever in 2026.</p>
    <p>Email marketing consistently outperforms social media when it comes to actual sales and conversions.</p>
    <h2>How to Start</h2>
    <ul>
      <li>Create a simple landing page.</li>
      <li>Offer a valuable freebie (lead magnet).</li>
      <li>Promote it everywhere.</li>
    </ul>`,
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
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
    coverImage: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1200&auto=format&fit=crop",
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
    coverImage: "https://images.unsplash.com/photo-1454165833767-12d9b236034e?q=80&w=1200&auto=format&fit=crop",
    status: "published",
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    author: { name: "Rashedul Islam" }
  },
  {
    title: "Case Study: How We Helped a SaaS Brand Achieve 42% Email Open Rate",
    category: "Case Study",
    tags: ["case study", "SaaS", "open rate", "HTML email", "results"],
    excerpt: "The industry average open rate is 21%. Here's exactly how we helped one SaaS company more than double that with a redesigned HTML email template.",
    content: `<p>The industry average open rate is 21%. Here's exactly how we helped one SaaS company more than double that with a redesigned HTML email template.</p>
    <h2>The Challenge</h2>
    <p>A SaaS brand was struggling with a 12% open rate. Their emails were landing in the promo tab or being ignored.</p>
    <h2>The Solution</h2>
    <p>We implemented a clean, professional HTML template and focused on personalization.</p>
    <h2>The Result</h2>
    <p>Within 30 days, their open rate jumped to 42%, and click-through rates tripled.</p>`,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    status: "published",
    publishedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    author: { name: "Rashedul Islam" }
  }
];

const seedDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in .env');
    }
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected...");
    
    await Post.deleteMany({});
    console.log("Existing posts removed.");

    // Function to generate slug from title
    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    };

    const postsToSeed = dummyPosts.map(post => ({
      ...post,
      slug: generateSlug(post.title),
      metaTitle: post.title,
      metaDescription: post.excerpt,
      readingTime: Math.ceil(post.content.split(' ').length / 200) || 1,
      views: 0
    }));

    await Post.insertMany(postsToSeed);
    console.log("Dummy posts seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding DB:", error);
    process.exit(1);
  }
};

seedDB();
