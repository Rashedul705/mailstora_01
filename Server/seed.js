require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
const connectDB = require('./src/config/db');

async function seed() {
    await connectDB();
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
        await Admin.create({
            username: 'admin',
            password: 'mailstora2024',
            email: 'admin@mailstora.com'
        });
        console.log('Seed: Admin user created');
    } else {
        console.log('Seed: Admin user already exists');
    }
    process.exit(0);
}

seed();
