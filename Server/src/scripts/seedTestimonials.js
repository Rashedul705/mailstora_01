const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Testimonial = require('../models/Testimonial');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Marketing Lead at TechFlow",
        text: "MailStora transformed our email marketing. The hand-coded templates are pixel-perfect on every device we tested. Finally, a service that understands the nuances of email client rendering!",
        rating: 5,
        platform: "upwork",
        featured: true,
        status: "published"
    },
    {
        name: "Michael Chen",
        role: "Founder of ChenMedia",
        text: "Fastest turnaround I've ever experienced. Had my complex Outlook-compatible template ready in less than 24 hours. The code is clean and incredibly well-optimized.",
        rating: 5,
        platform: "fiverr",
        featured: false,
        status: "published"
    },
    {
        name: "Elena Rodriguez",
        role: "Communications Director",
        text: "The attention to detail in the coding is top-notch. No more rendering issues in Outlook for our corporate newsletters. Their expertise in cross-client compatibility is unmatched.",
        rating: 5,
        platform: "direct",
        featured: false,
        status: "published"
    },
    {
        name: "David Smith",
        role: "Agency Owner",
        text: "Highly recommend for any agency needing reliable white-label email development. A true partner for our growth. They integrate seamlessly into our existing agency workflow.",
        rating: 5,
        platform: "direct",
        featured: false,
        status: "published"
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB...');
        
        // Clear existing (optional, but good for demo)
        // await Testimonial.deleteMany({});
        
        await Testimonial.insertMany(testimonials);
        console.log('Demo testimonials added successfully!');
        
        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seed();
