const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');

// Import Content Models
const HeroSection = require('../models/HeroSection');
const Service = require('../models/Service');
const Pricing = require('../models/Pricing');
const Portfolio = require('../models/Portfolio');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for Seeding');

        // 1. Seed Hero Section
        await HeroSection.deleteMany({});
        await HeroSection.create({
            title: 'Custom HTML Email Templates That Work',
            subtitle: 'Looking for a Professional Email Developer?',
            description: 'Elevate your brand with beautifully designed, responsive HTML email templates. Crafted for perfect rendering across all devices and email clients.',
            button_text: 'View My Work',
            button_link: '#portfolio',
            hero_image: '/images/hero-image.png' // Adjust exact path if you have one
        });
        console.log('Hero Section Seeded');

        // 2. Seed Services
        await Service.deleteMany({});
        const services = [
            {
                title: 'HTML Email Template',
                description: 'Custom handcrafted HTML email templates tested across 90+ clients',
                icon: '<svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
                features: ['Responsive Design', 'Dark Mode Compatible', 'Mailchimp/Klaviyo Ready', 'Litmus Tested']
            },
            {
                title: 'Email Signature Design',
                description: 'Professional, click-generating email signatures for your team',
                icon: '<svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>',
                features: ['Clickable Social Icons', 'Clickable Contact Details', 'Company Branding', 'Multiple Layouts']
            },
            {
                title: 'Template Editing',
                description: 'Fixing or modifying your existing email templates',
                icon: '<svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
                features: ['Bug Fixing', 'Mobile Optimization', 'Design Updates', 'ESP Integration']
            }
        ];
        await Service.insertMany(services);
        console.log('Services Seeded');

        // 3. Seed Pricing
        await Pricing.deleteMany({});
        const pricing = [
            {
                package_name: 'Email Signature',
                price: '25',
                description: 'Perfect for individuals and small teams.',
                features: ['1 HTML Signature', 'Clickable Links', 'Social Media Icons', 'Installation Guide', '1 Revision'],
                button_text: 'Order Signature'
            },
            {
                package_name: 'HTML Template',
                price: '90',
                description: 'Ideal for newsletters and promotions.',
                highlight: true,
                features: ['1 Custom Template', 'Fully Responsive', 'Dark Mode Support', 'ESP Integration', '3 Revisions', 'Litmus Testing'],
                button_text: 'Order Template'
            },
            {
                package_name: 'Master Package',
                price: '150',
                description: 'Complete email branding solution.',
                features: ['2 Custom Templates', '1 Email Signature', 'Asset Hosting', 'Priority Support', 'Unlimited Revisions', 'Strategy Call'],
                button_text: 'Get The Package'
            }
        ];
        await Pricing.insertMany(pricing);
        console.log('Pricing Seeded');

        // 4. Seed Testimonials
        await Testimonial.deleteMany({});
        const testimonials = [
            {
                client_name: 'Sarah Johnson',
                client_position: 'Marketing Director',
                company_name: 'TechFlow',
                client_photo: 'https://i.ibb.co/Ltb2K25/client1.jpg',
                rating: 5,
                testimonial_text: 'Rashedul delivered exactly what we needed. The templates are flawless across every email client we tested.'
            },
            {
                client_name: 'Michael Chen',
                client_position: 'Founder',
                company_name: 'GrowthStudio',
                client_photo: 'https://i.ibb.co/q1tPq0d/client2.jpg',
                rating: 5,
                testimonial_text: 'Best email developer I have worked with. Fast communication and perfect execution.'
            }
        ];
        await Testimonial.insertMany(testimonials);
        console.log('Testimonials Seeded');

        // 5. Seed FAQ
        await FAQ.deleteMany({});
        const faqs = [
            {
                question: 'Do you provide the design or just the coding?',
                answer: 'I specialize in coding from your design files (Figma, PSD, XD). However, if you don\'t have a design, I can create a custom design based on your brand guidelines before coding.',
                sort_order: 1
            },
            {
                question: 'What email clients do you test on?',
                answer: 'I rigorously test all templates on 90+ email clients including Outlook (all versions), Gmail, Apple Mail, Yahoo, and mobile clients to ensure pixel-perfect rendering everywhere.',
                sort_order: 2
            },
            {
                question: 'Will the template work with Mailchimp/Klaviyo?',
                answer: 'Yes! Let me know which Email Service Provider (ESP) you use, and I will code the template with their specific tags so you can easily edit text and images in their builder.',
                sort_order: 3
            }
        ];
        await FAQ.insertMany(faqs);
        console.log('FAQ Seeded');

        // 6. Portfolio (Just 1 dummy for now)
        await Portfolio.deleteMany({});
        await Portfolio.create({
            project_title: 'E-commerce Newsletter',
            category: 'Newsletter',
            description: 'A highly converting monthly newsletter matching brand identity.',
            company_name: 'ShopTrend',
            main_image: 'https://i.ibb.co/D8d3wG6/portfolio1.jpg'
        });
        console.log('Portfolio Seeded');

        console.log('All Content successfully seeded! You can now view it dynamically on the website once connected.');
        process.exit();
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
