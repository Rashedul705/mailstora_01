require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
const connectDB = require('./src/config/db');

async function seed() {
    await connectDB();
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
        // Password comes from ADMIN_PASSWORD; otherwise a random one is generated and printed once
        const password = process.env.ADMIN_PASSWORD || require('crypto').randomBytes(9).toString('base64url');
        await Admin.create({
            username: 'admin',
            password,
            email: 'admin@mailstora.com'
        });
        console.log('Seed: Admin user created. Username: admin  Password:', process.env.ADMIN_PASSWORD ? '(from ADMIN_PASSWORD)' : password);
    } else {
        console.log('Seed: Admin user already exists');
    }
    process.exit(0);
}

seed();
