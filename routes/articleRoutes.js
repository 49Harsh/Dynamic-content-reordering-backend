const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { prioritizeContent } = require('../utils/contentPrioritization');

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new article
router.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update the GET all articles route
router.get('/', async (req, res) => {
    try {
      const userId = req.query.userId; // Assume the frontend sends a userId
      if (userId) {
        const prioritizedArticles = await prioritizeContent(userId);
        res.json(prioritizedArticles);
      } else {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.json(articles);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});


module.exports = router;