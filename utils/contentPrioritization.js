const UserInteraction = require('../models/UserInteraction');
const Article = require('../models/Article');

async function prioritizeContent(userId) {
  // Get user interactions
  const interactions = await UserInteraction.find({ userId });

  // Count interactions per article
  const articleScores = {};
  interactions.forEach(interaction => {
    if (!articleScores[interaction.articleId]) {
      articleScores[interaction.articleId] = 0;
    }
    articleScores[interaction.articleId]++;
  });

  // Get all articles and sort them based on scores
  const articles = await Article.find();
  articles.sort((a, b) => {
    const scoreA = articleScores[a._id] || 0;
    const scoreB = articleScores[b._id] || 0;
    return scoreB - scoreA;
  });

  return articles;
}

module.exports = { prioritizeContent };