const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  source: {
    type: String,
    default: "blog",
  }
}, { timestamps: { createdAt: 'subscribedAt', updatedAt: false } });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
