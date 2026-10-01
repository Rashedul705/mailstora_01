const Customer = require('../models/Customer');

/**
 * Middleware to intercept incoming form requests (Orders, Inquiries, Quotes, Schedules).
 * It checks if a customer with the provided email exists.
 * If yes: Updates their last_activity timestamp.
 * If no: Creates a new Customer profile.
 * Ultimately attaches `req.customer_id` so the next controller can reference it.
 */
const customerIntercept = async (req, res, next) => {
    try {
        const { email, name, phone, company_name, companyName, company, source } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required for CRM tracking.' });
        }

        const normalizedName = name || req.body.clientName || 'Unknown Name';
        const normalizedCompany = company_name || companyName || company || '';
        const interactionSource = source || determineSource(req.originalUrl);

        let customer = await Customer.findOne({ email });

        if (customer) {
            // Update last activity and potentially fill in missing data
            customer.last_activity = Date.now();
            if (!customer.phone && phone) customer.phone = phone;
            if (!customer.company_name && normalizedCompany) customer.company_name = normalizedCompany;
            if (interactionSource === 'order') {
                customer.total_orders += 1;
            }
            await customer.save();
        } else {
            // Create a brand new customer profile
            customer = new Customer({
                name: normalizedName,
                email,
                phone: phone || '',
                company_name: normalizedCompany,
                source: interactionSource,
                total_orders: interactionSource === 'order' ? 1 : 0
            });
            await customer.save();
        }

        // Expose the internal CRM ID to the downstream controller
        req.customer_id = customer._id;
        next();
    } catch (error) {
        console.error('CRM Intercept Error:', error);
        res.status(500).json({ message: 'Internal server error during CRM processing.' });
    }
};

const determineSource = (url) => {
    if (url.includes('/orders')) return 'order';
    if (url.includes('/inquiries')) return 'inquiry';
    if (url.includes('/quotes')) return 'quote';
    if (url.includes('/schedule')) return 'schedule';
    return 'signup';
};

module.exports = customerIntercept;
