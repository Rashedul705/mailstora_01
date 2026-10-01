const Customer = require('../models/Customer');

/**
 * Handles automatic customer creation or update.
 * @param {Object} data - { name, email, phone, company_name, source, is_order }
 */
exports.handleCustomerActivity = async (data) => {
    try {
        const { name, email, phone, company_name, source, is_order } = data;
        let customer = await Customer.findOne({ email });

        if (customer) {
            // Update existing customer
            customer.name = name || customer.name;
            customer.phone = phone || customer.phone;
            customer.company_name = company_name || customer.company_name;
            customer.last_activity = Date.now();
            if (is_order) {
                customer.total_orders += 1;
            }
            // Do not overwrite original source if it already exists, or maybe update? We'll keep original source.
            await customer.save();
        } else {
            // Create new customer
            customer = new Customer({
                name,
                email,
                phone: phone || '',
                company_name: company_name || '',
                source,
                total_orders: is_order ? 1 : 0,
                last_activity: Date.now()
            });
            await customer.save();
        }
        return customer;
    } catch (error) {
        console.error('Error in handleCustomerActivity:', error);
        throw error;
    }
};
