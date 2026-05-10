const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  text: String,
  included: Boolean,
  order: Number
}, { _id: false });

const pricingPackageSchema = new mongoose.Schema({
  serviceType: { type: String, enum: ['template', 'signature'], required: true },
  name: { type: String, required: true },
  label: { type: String },
  badgeText: { type: String },
  icon: { type: String },
  description: { type: String },
  price: { type: String, required: true },
  priceUnit: { type: String, default: '/project' },
  currency: { type: String, default: 'USD' },
  features: [featureSchema],
  ctaText: { type: String, default: 'Get Started →' },
  ctaStyle: { type: String, enum: ['primary', 'outline', 'custom'], default: 'primary' },
  isPopular: { type: Boolean, default: false },
  isVisible: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('PricingPackage', pricingPackageSchema);
