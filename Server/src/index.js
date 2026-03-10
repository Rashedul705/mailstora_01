const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { connectRedis, client: redisClient } = require('./config/redis');
const mongoose = require('mongoose');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

// Connect to Redis
connectRedis();

// Import Routes
const apiRoutes = require('./routes/api');

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || true,
    credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Basic Route
app.get('/', async (req, res) => {
    const uptimeInSeconds = Math.floor(process.uptime());
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;

    res.render('index', {
        env: process.env.NODE_ENV || 'development',
        port: PORT,
        uptime: `${hours}h ${minutes}m ${seconds}s`,
        dbConnected: mongoose.connection.readyState === 1,
        redisConnected: redisClient.isOpen
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
