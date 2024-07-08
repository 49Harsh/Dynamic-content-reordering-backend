const express = require('express');
const router = express.Router();
const UserInteraction = require('../models/UserInteraction');

router.post('/', async (req, res) => {
  const interaction = new UserInteraction({
    userId: req.body.userId,
    articleId: req.body.articleId,
    action: req.body.action,
  });

  try {
    const newInteraction = await interaction.save();
    res.status(201).json(newInteraction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;