const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  likes: [{ userId: mongoose.Schema.Types.ObjectId }]
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
