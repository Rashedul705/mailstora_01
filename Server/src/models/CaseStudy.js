const mongoose = require('mongoose');

// Case studies are their own content type, shown at /case-studies/<slug>/.
// A case study can point to the portfolio project it describes (portfolioSlug), but does not depend on it.
const caseStudySchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    clientName: { type: String, required: true },
    industry: { type: String, default: '' },
    type: { type: String, default: '' },          // e.g. Email Campaign, Klaviyo Flow, Signature
    esp: { type: String, default: '' },           // platform, e.g. Klaviyo
    year: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    portfolioSlug: { type: String, default: '' }, // related portfolio project, optional
    whatWasIncluded: { type: String, default: '' },
    compatibility: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    sortOrder: { type: Number, default: 0 },

    headline: { type: String, default: '' },
    seoTitle: { type: String, default: '' },       // <= 60 characters
    seoDescription: { type: String, default: '' }, // <= 160 characters
    summary: { type: String, default: '' },
    challenge: { type: String, default: '' },
    solution: { type: String, default: '' },
    approach: { type: String, default: '' },       // one step per line
    results: { type: String, default: '' },        // one result per line: "value | label"
    duration: { type: String, default: '' },
    testimonialQuote: { type: String, default: '' },
    testimonialAuthor: { type: String, default: '' },
    testimonialRole: { type: String, default: '' },
}, { timestamps: true, collection: 'caseStudies' });

caseStudySchema.index({ status: 1, sortOrder: 1 });

module.exports = mongoose.models.CaseStudy || mongoose.model('CaseStudy', caseStudySchema);
