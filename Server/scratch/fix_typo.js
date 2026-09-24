const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const HeroSection = require('../src/models/HeroSection');
const Service = require('../src/models/Service');
const Pricing = require('../src/models/Pricing');
const Portfolio = require('../src/models/Portfolio');
const Testimonial = require('../src/models/Testimonial');
const FAQ = require('../src/models/FAQ');

const fixTypo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const collections = [HeroSection, Service, Pricing, Portfolio, Testimonial, FAQ];
        let found = false;

        for (const model of collections) {
            const docs = await model.find({});
            for (const doc of docs) {
                let modified = false;
                const docObj = doc.toObject();
                for (const key in docObj) {
                    if (typeof docObj[key] === 'string' && docObj[key].includes('Investment Programs')) {
                        console.log(`Found in ${model.modelName} (ID: ${doc._id}), field: ${key}`);
                        console.log(`Original: ${docObj[key]}`);
                        // Fix it based on context, maybe it's just "Investment Programs"?
                        // If it's a typo, what should it be? Maybe the user just said "Investment Programs typo".
                        // Wait, maybe the typo is IN the string "Investment Programs", e.g., "Invesment Programs" or "Investment Programms"?
                        // The user said: "Identify and fix the 'Investment Programs' typo located in the production database."
                        // This implies the string itself IS the typo, or the string contains the typo. Let me just log it first.
                        found = true;
                    }
                    if (typeof docObj[key] === 'string' && docObj[key].toLowerCase().includes('investment')) {
                        console.log(`Also found 'investment' in ${model.modelName} (ID: ${doc._id}), field: ${key}`);
                        console.log(`Content: ${docObj[key]}`);
                    }
                }
            }
        }

        if (!found) console.log('Not found');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixTypo();
