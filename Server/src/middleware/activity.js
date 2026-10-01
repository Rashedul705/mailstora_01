const { Activity } = require('../models/Activity');

// Record every admin change (non-GET) once the response is sent
module.exports = function activity(req, res, next) {
    if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS' || !req.admin) return next();
    res.on('finish', () => {
        Activity.create({
            user: req.admin.username,
            role: req.admin.role || 'admin',
            method: req.method,
            path: req.originalUrl.replace(/^\/api/, '').split('?')[0],
            status: res.statusCode,
            ip: req.ip,
        }).catch(() => {});
    });
    next();
};
