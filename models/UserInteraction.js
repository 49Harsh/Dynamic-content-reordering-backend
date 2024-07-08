const mongoose = require('mongoose');

const userInteractionSchema = new mongoose.Schema({
  userId: String,
  articleId: String,
  action: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserInteraction', userInteractionSchema);