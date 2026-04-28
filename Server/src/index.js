process.env.TZ = 'Asia/Dhaka';

const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
const morgan       = require('morgan');
const dotenv       = require('dotenv');
const connectDB    = require('./config/db');
const { connectRedis, client: redisClient } = require('./config/redis');
const mongoose     = require('mongoose');
const path         = require('path');

// Load env vars (only in non-production; Render/Netlify inject via dashboard)
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Connect to Database
connectDB();

// Connect to Redis
connectRedis();

// Import Routes
const apiRoutes = require('./routes/api');

const app = express();
const setupReminders = require('./jobs/reminders');
setupReminders();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── CORS ────────────────────────────────────────────────────
// In production, only allow requests from your Netlify frontend.
// Set FRONTEND_URL env var in Render dashboard, e.g.:
//   https://your-site.netlify.app
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
];
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}
// Also support comma-separated list: FRONTEND_URL=https://a.netlify.app,https://b.com
if (process.env.EXTRA_ORIGINS) {
    process.env.EXTRA_ORIGINS.split(',').forEach(o => allowedOrigins.push(o.trim()));
}

app.use(cors({
    origin: (origin, callback) => {
        // Allow server-to-server (no origin) and known origins
        if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
            callback(null, true);
        } else {
            callback(new Error(`CORS: origin not allowed — ${origin}`));
        }
    },
    credentials: true,
}));

// ── Core Middleware ──────────────────────────────────────────
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ── API Routes ───────────────────────────────────────────────
app.use('/api', apiRoutes);

// ── Health Check (required by Render) ───────────────────────
app.get('/api/health', (req, res) => {
    res.json({
        status:       'ok',
        env:          process.env.NODE_ENV || 'development',
        db:           mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        redis:        redisClient.isOpen ? 'connected' : 'disconnected',
        uptime:       Math.floor(process.uptime()),
        timestamp:    new Date().toISOString(),
    });
});

// ── Root (status page) ──────────────────────────────────────
app.get('/', async (req, res) => {
    const uptimeInSeconds = Math.floor(process.uptime());
    const hours   = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;

    res.render('index', {
        env:          process.env.NODE_ENV || 'development',
        port:         PORT,
        uptime:       `${hours}h ${minutes}m ${seconds}s`,
        dbConnected:  mongoose.connection.readyState === 1,
        redisConnected: redisClient.isOpen,
    });
});

// ── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error:   process.env.NODE_ENV === 'development' ? err : {},
    });
});

// ── Start ────────────────────────────────────────────────────
const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
