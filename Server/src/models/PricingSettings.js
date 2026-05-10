const mongoose = require('mongoose');

const pricingSettingsSchema = new mongoose.Schema({
  showTemplateTab: { type: Boolean, default: true },
  showSignatureTab: { type: Boolean, default: true },
  currency: { type: String, default: 'USD' },
  defaultTab: { type: String, enum: ['template', 'signature'], default: 'template' },
  sectionTitle: { type: String, default: 'Simple, Transparent Pricing' },
  sectionSubtitle: { type: String, default: 'One-time project pricing. No subscriptions, no hidden fees. Pay per project and get a pixel-perfect result every time.' }
}, { timestamps: true });

module.exports = mongoose.model('PricingSettings', pricingSettingsSchema);
