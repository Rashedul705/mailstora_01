const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const HeroSection = require('../src/models/HeroSection');
const Service = require('../src/models/Service');
const Pricing = require('../src/models/Pricing');
const Portfolio = require('../src/models/Portfolio');
const Testimonial = require('../src/models/Testimonial');
const FAQ = require('../src/models/FAQ');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding...');

        // Clean collections
        await HeroSection.deleteMany();
        await Service.deleteMany();
        await Pricing.deleteMany();
        await Portfolio.deleteMany();
        await Testimonial.deleteMany();
        await FAQ.deleteMany();

        // 1. HeroSection
        await HeroSection.create({
            title: 'Custom <span class="hero-title-highlight-orange">HTML Email Templates</span> That Work Perfectly in <span class="hero-title-highlight">Outlook, Gmail</span> & 30+ Email Clients',
            subtitle: 'Stop losing engagement due to broken formatting. Get hand-coded, pixel-perfect email templates and professional signatures tested across all major email clients, delivered in 24-48 hours.',
            cta_text: 'Get a Free Quote',
            cta_link: '#contact',
            background_image: '/consultation-photo-v2.png',
            is_active: true
        });

        // 2. Services
        await Service.create([
            {
                title: "Responsive HTML Email Templates",
                description: "Hand-coded clean HTML, no drag & drop.",
                icon: "email", // generic icon ref
                features: [
                    "Hand-coded clean HTML, no drag & drop",
                    "Pixel-perfect conversion from Figma or PSD",
                    "Fully mobile responsive design",
                    "Tested across 30+ email clients",
                    "Compatible with Mailchimp, Klaviyo & HubSpot",
                    "Fast 24–48h delivery",
                ]
            },
            {
                title: "Professional HTML Email Signatures",
                description: "Company-wide deployment ready.",
                icon: "signature",
                features: [
                    "Fully clickable links & social icons",
                    "Outlook & Gmail compatible",
                    "Company-wide deployment ready",
                    "Brand-consistent design system",
                    "Hosted images, no broken assets",
                    "Clean, minimal code structure",
                ]
            }
        ]);

        // 3. Pricing
        await Pricing.create([
            { name: "Single Template", price: 199, billing_cycle: 'project', description: "Perfect for a one-off newsletter or automated welcome email.", features: ["1 Custom HTML Email Template", "Tested in 90+ Email Clients", "Mobile Responsive Design", "1 Revision Round", "2-Day Turnaround"], is_popular: false },
            { name: "Standard Package", price: 499, billing_cycle: 'project', description: "The most popular choice for growing businesses and agencies.", features: ["3 Custom HTML Email Templates", "1 Professional HTML Signature", "Tested in 90+ Email Clients", "Platform Integration (Klaviyo/Mailchimp)", "3 Revision Rounds", "Premium Support"], is_popular: true },
            // Storing price as -1 or 0 for Custom text rendering later
            { name: "Enterprise Custom", price: 0, billing_cycle: 'project', description: "Full service email architecture for complex design systems.", features: ["Unlimited Custom Templates", "Modular Email Design Systems", "Dedicated Account Manager", "Unlimited Revisions", "24/7 Priority Support"], is_popular: false },
            { name: "Basic Signature", price: 49, billing_cycle: 'package', description: "A professional, clickable HTML signature for one person.", features: ["1 Custom HTML Signature", "Tested in major email clients", "Clickable links & social icons", "1 Revision Round", "24-Hour Turnaround"], is_popular: false },
            { name: "Team Package", price: 149, billing_cycle: 'package', description: "Standardized signatures for small to medium teams.", features: ["Up to 5 HTML Signatures", "Consistent brand styling", "Tested in major email clients", "Clickable links & social icons", "2 Revision Rounds"], is_popular: true },
            { name: "Company-Wide", price: 0, billing_cycle: 'package', description: "Scalable signature deployment for large organizations.", features: ["Unlimited HTML Signatures", "Dynamic data integration", "Company-Wide Deployment Strategy", "Dedicated Support", "Unlimited Revisions"], is_popular: false }
        ]);

        // 4. Portfolio
        await Portfolio.create([
            { title: "SaaS Welcome Email", description: "Email Template for SaaS", category: "Email Template", image_url: "/mockup.png", project_url: "#" },
            { title: "E-commerce Newsletter", description: "Email Template for E-commerce", category: "Email Template", image_url: "/mockup.png", project_url: "#" },
            { title: "Corporate Email Signature", description: "Email Signature for Corporate", category: "Email Signature", image_url: "/mockup.png", project_url: "#" },
            { title: "Event Invitation Template", description: "Email Template for Event", category: "Email Template", image_url: "/mockup.png", project_url: "#" }
        ]);

        // 5. Testimonial
        await Testimonial.create([
            { client_name: "Sarah Mitchell", company: "BrightSend Co.", role: "Marketing Manager", content: "Rashed delivered a flawless HTML email template that worked perfectly in Outlook and Gmail. The code was clean and the delivery was fast. Highly recommended!", rating: 5, image_url: "SM" },
            { client_name: "James O'Brien", company: "ShopNest", role: "E-commerce Founder", content: "Our newsletter open rates went up after switching to Rashed's templates. Everything renders perfectly across clients, even in the notoriously difficult Outlook 2016.", rating: 5, image_url: "JO" },
            { client_name: "Priya Nair", company: "LaunchStack", role: "Head of Growth", content: "The email signatures are polished and consistent across our whole team. It's made our outreach look so much more professional. Quick turnaround too!", rating: 5, image_url: "PN" }
        ]);

        // 6. FAQ
        await FAQ.create([
            { question: "Do the emails work in Outlook?", answer: "Yes. Every template is rigorously tested in Outlook 2016, 2019, 2021, and Outlook 365, the most challenging email clients to code for. We use table-based layouts and inline CSS to ensure pixel-perfect rendering.", category: "General" },
            { question: "Which email platforms do you support?", answer: "All major platforms including Mailchimp, Klaviyo, HubSpot, Campaign Monitor, ActiveCampaign, Salesforce Marketing Cloud, and more. Templates are delivered as clean HTML ready for any ESP.", category: "General" },
            { question: "How long does delivery take?", answer: "Most email templates are delivered within 24–48 hours. More complex templates or full design systems may take 3–5 business days. Turnaround time is always confirmed upfront.", category: "General" },
            { question: "Can I request revisions?", answer: "Absolutely. Each package includes revision rounds as specified. We work with you until you're 100% satisfied before final delivery.", category: "General" },
            { question: "Do you work from Figma or PSD designs?", answer: "Yes, we accept Figma, Adobe XD, PSD, or even simple PDF / image references. If you don't have a design, we can also create one based on your brand guidelines.", category: "General" },
            { question: "What file formats do you deliver?", answer: "You'll receive a clean .html file with all styles inlined, ready to import into your ESP. We also provide separate image assets and a quick-start guide for your platform.", category: "General" }
        ]);

        console.log('Database Seeded Successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
