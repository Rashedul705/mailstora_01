const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storeFile, getFile } = require('../services/fileStore');
const { uploadToImgBB } = require('../services/imgbb');
const { sendEmail } = require('../services/email');
const verifyToken = require('../middleware/auth');

// Multer setup for in-memory storage
const upload = multer({ storage: multer.memoryStorage() });

// @route   POST /api/upload-file
// @desc    Upload file to MongoDB as Buffer
router.post('/upload-file', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const fileId = await storeFile(req.file.originalname, req.file.mimetype, req.file.buffer);
        res.json({ message: 'File uploaded successfully to MongoDB', fileId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const { client } = require('../config/redis');

// @route   GET /api/file/:id
// @desc    Get file from MongoDB and serve it (with Redis caching)
router.get('/file/:id', async (req, res) => {
    try {
        const fileId = req.params.id;

        // Check Redis cache
        const cachedFile = await client.get(`file:${fileId}`);
        if (cachedFile) {
            const fileData = JSON.parse(cachedFile);
            res.set('Content-Type', fileData.contentType);
            return res.send(Buffer.from(fileData.data, 'base64'));
        }

        const file = await getFile(fileId);

        // Cache the file in Redis (expires in 1 hour)
        await client.set(`file:${fileId}`, JSON.stringify({
            contentType: file.contentType,
            data: file.data.toString('base64')
        }), {
            EX: 3600
        });

        res.set('Content-Type', file.contentType);
        res.send(file.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @route   POST /api/upload-imgbb
// @desc    Upload image to ImgBB
router.post('/upload-imgbb', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

        const imageUrl = await uploadToImgBB(req.file.buffer, req.file.originalname);
        res.json({ message: 'Image uploaded to ImgBB', imageUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @route   POST /api/send-email
// @desc    Send email with optional attachment
router.post('/send-email', upload.single('attachment'), async (req, res) => {
    const { to, subject, text, html } = req.body;
    try {
        let attachments = [];
        if (req.file) {
            attachments.push({
                filename: req.file.originalname,
                content: req.file.buffer
            });
        }

        await sendEmail(to, subject, text, html, attachments);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @route   GET /api/protected
// @desc    Test protected route
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Welcome to protected route', user: req.user });
});

// Admin Dashboard & CRM Routes
router.use('/auth', require('./authRoutes'));
router.use('/customers', require('./customerRoutes'));
router.use('/orders', require('./orderRoutes'));
router.use('/quotes', require('./quoteRoutes'));
router.use('/inquiries', require('./inquiryRoutes'));
router.use('/schedules', require('./scheduleRoutes'));
router.use('/portfolio', require('./portfolioRoutes'));
router.use('/pricing', require('./pricingRoutes'));
router.use('/testimonials', require('./testimonialRoutes'));
router.use('/faq', require('./faqRoutes'));
router.use('/services', require('./serviceRoutes'));
router.use('/dashboard', require('./dashboardRoutes'));
router.use('/content', require('./contentRoutes'));

module.exports = router;
