const PDFDocument = require('pdfkit');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Invoice = require('../models/Invoice');

exports.generateInvoice = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        // Fetch Order and Customer data
        const order = await Order.findById(orderId).populate('customer_id');
        if (!order) return res.status(404).json({ message: 'Order not found' });

        const customer = order.customer_id;

        // Check if invoice record already exists, if not create one
        let invoice = await Invoice.findOne({ order_id: order._id });
        if (!invoice) {
            invoice = new Invoice({
                invoice_number: `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                order_id: order._id,
                customer_id: customer._id,
                amount: order.price,
                status: 'unpaid'
            });
            await invoice.save();
        }

        // Generate PDF
        const doc = new PDFDocument({ margin: 50 });

        // Set response headers to trigger download in browser
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Invoice-${invoice.invoice_number}.pdf`);

        doc.pipe(res);

        // Header
        doc.fontSize(20).text('MailStora Invoice', { align: 'right' });
        doc.fontSize(10).text(`Invoice Number: ${invoice.invoice_number}`, { align: 'right' });
        doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' });
        doc.moveDown();

        // Customer Info
        doc.fontSize(14).text('Billed To:');
        doc.fontSize(10).text(`Name: ${customer.name}`);
        doc.text(`Email: ${customer.email}`);
        if (customer.company_name) doc.text(`Company: ${customer.company_name}`);
        doc.moveDown();

        // Order Info
        doc.fontSize(14).text('Order Details:');
        doc.fontSize(10).text(`Order Number: ${order.order_number}`);
        doc.text(`Package: ${order.package_name}`);
        doc.text(`Status: ${order.status}`);
        doc.moveDown();

        // Line Items
        const tableTop = 330;
        doc.font('Helvetica-Bold');
        doc.text('Description', 50, tableTop);
        doc.text('Amount', 400, tableTop, { align: 'right' });

        doc.moveTo(50, tableTop + 15).lineTo(500, tableTop + 15).stroke();

        doc.font('Helvetica');
        doc.text(order.requirements || order.package_name, 50, tableTop + 30);
        doc.text(`$${order.price.toFixed(2)}`, 400, tableTop + 30, { align: 'right' });

        doc.moveTo(50, tableTop + 50).lineTo(500, tableTop + 50).stroke();

        // Total
        doc.font('Helvetica-Bold');
        doc.text('Total:', 300, tableTop + 70, { align: 'right' });
        doc.text(`$${order.price.toFixed(2)}`, 400, tableTop + 70, { align: 'right' });

        // Footer
        doc.moveDown(5);
        doc.font('Helvetica').fontSize(10).text('Thank you for choosing MailStora!', { align: 'center', width: 500 });

        doc.end();

    } catch (error) {
        console.error('Invoice Generation Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error generating invoice', error: error.message });
        }
    }
};

exports.getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('customer_id', 'name email').sort({ created_at: -1 });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching invoices', error: error.message });
    }
};
