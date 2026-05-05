require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Portfolio = require('../models/Portfolio');
const { storeFile } = require('../services/fileStore');

const addDraftlockPortfolio = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Connected to MongoDB');

        // Read the HTML file
        const htmlPath = path.join(__dirname, '../../uploads/draftlock-email.html');
        const buffer = fs.readFileSync(htmlPath);

        // Store the file and get the file ID
        const fileId = await storeFile('draftlock-email.html', 'text/html', buffer);
        console.log(`File saved with ID: ${fileId}`);

        // Construct the preview url
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const previewUrl = `${API_BASE}/api/file/${fileId}`;

        // Create the Portfolio item
        // Setting createdAt to be a bit in the future so it appears first when sorting descending
        const newPortfolio = new Portfolio({
            title: 'Understanding DraftLOCK-Flow',
            description: 'A beautiful, responsive HTML email template designed for Canadian Choice Windows & Doors.',
            category: 'Email Template',
            image_url: 'https://myccwd.com/wp-content/uploads/2026/03/top_banner_left.png', // Using an image from the template
            preview_html_url: previewUrl,
            createdAt: new Date(Date.now() + 1000 * 60) // 1 minute in the future
        });

        await newPortfolio.save();
        console.log('Portfolio item created successfully!');

    } catch (error) {
        console.error('Error adding portfolio item:', error);
    } finally {
        mongoose.connection.close();
    }
};

addDraftlockPortfolio();
