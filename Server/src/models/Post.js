const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  excerpt: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ["Email Marketing", "Digital Marketing", "Business Growth", "Tutorial", "Case Study"],
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  author: {
    name: {
      type: String,
      default: 'Rashedul Islam',
    }
  },
  status: {
    type: String,
    enum: ["draft", "published", "scheduled"],
    default: "draft",
  },
  publishedAt: {
    type: Date,
  },
  scheduledAt: {
    type: Date,
  },
  metaTitle: {
    type: String,
    default: '',
  },
  metaDescription: {
    type: String,
    default: '',
  },
  readingTime: {
    type: Number,
    default: 1,
  },
  views: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

// Auto-calculate reading time before save
postSchema.pre('save', function () {
  if (this.isModified('content') && this.content) {
    const wordCount = this.content.replace(/<[^>]*>?/gm, ' ').split(/\s+/).filter(word => word.length > 0).length;
    this.readingTime = Math.ceil(wordCount / 200) || 1;
  }
});

// Compound index for efficient querying of published posts
postSchema.index({ status: 1, publishedAt: -1 });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
