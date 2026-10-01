require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
const connectDB = require('./src/config/db');

async function resetAdmin() {
    await connectDB();
    
    // Find the admin user
    const admin = await Admin.findOne({ username: 'admin' });
    
    if (admin) {
        admin.password = 'admin123';
        await admin.save();
        console.log('Admin password successfully reset to: admin123');
    } else {
        console.log('Admin user not found. Run seed script first.');
    }
    
    process.exit(0);
}

resetAdmin();
