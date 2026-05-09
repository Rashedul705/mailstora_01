const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  type: { type: String },
  esp: { type: String },
  industry: { type: String },
  year: { type: String },
  shortDescription: { type: String },
  fullDescription: { type: String },
  whatWasIncluded: { type: String },
  coverImage: { type: String, required: true },
  cardBackground: { type: String },
  desktopImages: [{ type: String }],
  mobileImages: [{ type: String }],
  angleViews: [{
    label: { type: String },
    device: { type: String },
    imageUrl: { type: String }
  }],
  compatibility: [{ type: String }],
  results: {
    openRate: { type: String },
    clickRate: { type: String },
    deliveryTime: { type: String },
    customMetric: { type: String }
  },
  tags: [{ type: String }],
  status: { type: String, default: 'draft' },
  featuredOnLanding: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  metaTitle: { type: String },
  metaDescription: { type: String }
}, { timestamps: true, collection: 'portfolioItems' });

portfolioItemSchema.index({ slug: 1 }, { unique: true });
portfolioItemSchema.index({ status: 1, sortOrder: 1 });

module.exports = mongoose.models.PortfolioItem || mongoose.model('PortfolioItem', portfolioItemSchema);
