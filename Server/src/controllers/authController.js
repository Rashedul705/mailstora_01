const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const payload = {
            admin: {
                id: admin._id,
                username: admin.username,
                role: admin.role || 'admin'
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });

        // Set token in HTTP-only cookie for better security
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body || {};
        if (!newPassword || newPassword.length < 10) {
            return res.status(400).json({ message: 'New password must be at least 10 characters.' });
        }
        const admin = await Admin.findById(req.admin?.id);
        if (!admin || !(await admin.comparePassword(currentPassword || ''))) {
            return res.status(401).json({ message: 'Current password is incorrect.' });
        }
        admin.password = newPassword; // hashed by the model's pre-save hook
        await admin.save();
        res.json({ message: 'Password updated.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    });
    res.json({ message: 'Logged out successfully' });
};

exports.verifyToken = (req, res) => {
    // If it passes the middleware, they are authenticated
    res.json({ isAuthenticated: true, user: req.admin });
};
