const verifyToken = require('./auth');
const roleCheck = require('./roles');
const activity = require('./activity');

// Logged-in admin, then role rules, then activity log
const requireAdmin = (req, res, next) => verifyToken(req, res, () => roleCheck(req, res, () => activity(req, res, next)));

// Central access rule for /api.
// - Public GETs stay open (site content), except private business data.
// - Public writes are limited to the forms visitors actually submit.
// - Everything else needs a logged-in admin (JWT cookie or Bearer token).

// GET paths that expose private data (customers, leads, orders...)
const PRIVATE_GET = [
    /^\/customers/,
    /^\/orders/,
    /^\/inquiries/,
    /^\/quotes/,
    /^\/dashboard/,
    /^\/messages/,
    /^\/file-manager/,
    /^\/admin\//,
    /^\/protected/,
    /^\/seo\/admin/,
    /^\/schedules\/?$/, // booking list
    /^\/schedules\/[a-f0-9]{24}$/, // single booking
];

// Writes a visitor is allowed to make without logging in
const PUBLIC_WRITE = [
    ['POST', /^\/auth\/(login|logout)$/],
    ['POST', /^\/inquiries\/?$/],
    ['POST', /^\/quotes\/?$/],
    ['POST', /^\/schedules\/?$/],
    ['POST', /^\/schedules\/(send-otp|verify-otp)$/],
    ['POST', /^\/bookings\/(initiate|verify)$/],
    ['POST', /^\/blog\/subscribe$/],
    ['POST', /^\/webhooks\//],
    ['POST', /^\/seo\/(404|redirect-hit)$/], // 404 logger and redirect hit counter called by the site
];

module.exports = function adminGuard(req, res, next) {
    const path = req.path;
    const method = req.method;

    if (method === 'OPTIONS') return next();

    if (method === 'GET' || method === 'HEAD') {
        if (!PRIVATE_GET.some((re) => re.test(path))) return next();
        return requireAdmin(req, res, next);
    }

    if (PUBLIC_WRITE.some(([m, re]) => m === method && re.test(path))) return next();
    return requireAdmin(req, res, next);
};
