const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    tile: String,
    content: String,
    image: String,
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Article', articleSchema);