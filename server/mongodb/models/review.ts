const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const reviewModel = mongoose.model('Review', reviewSchema);

module.exports = reviewModel;
export {};
