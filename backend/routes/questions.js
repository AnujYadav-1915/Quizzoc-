const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Question = require('../models/Question');

const categoriesData = [
  { name: "General Knowledge", slug: "gk", description: "Test your everyday knowledge", iconUrl: "Globe" },
  { name: "Science & Tech", slug: "science", description: "Physics, biology, space, and code", iconUrl: "BrainCircuit" },
  { name: "Pop Culture", slug: "pop-culture", description: "Movies, music, and internet culture", iconUrl: "Zap" },
  { name: "History", slug: "history", description: "Events that shaped the world", iconUrl: "Target" },
  { name: "Geography", slug: "geography", description: "Countries, capitals, and oceans", iconUrl: "Map" },
  { name: "Gaming", slug: "gaming", description: "From retro to modern AAA titles", iconUrl: "Gamepad" }
];

const generateQuestions = (categories) => {
  const questions = [];
  const gkId = categories.find(c => c.slug === 'gk')._id;
  const scienceId = categories.find(c => c.slug === 'science')._id;
  const popId = categories.find(c => c.slug === 'pop-culture')._id;
  const histId = categories.find(c => c.slug === 'history')._id;
  const geoId = categories.find(c => c.slug === 'geography')._id;
  const gameId = categories.find(c => c.slug === 'gaming')._id;

  questions.push(
    // GK
    { categoryId: gkId, questionText: "What is the capital of Australia?", options: [{text: "Sydney", isCorrect: false}, {text: "Melbourne", isCorrect: false}, {text: "Canberra", isCorrect: true}, {text: "Perth", isCorrect: false}], hint: "It's an inland city.", mediaUrl: "https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=800&q=80" },
    { categoryId: gkId, questionText: "What is the largest ocean on Earth?", options: [{text: "Atlantic", isCorrect: false}, {text: "Indian", isCorrect: false}, {text: "Arctic", isCorrect: false}, {text: "Pacific", isCorrect: true}], hint: "It covers more than 30% of the Earth's surface.", mediaUrl: "https://images.unsplash.com/photo-1505118380757-91f5f563538e?w=800&q=80" },
    // Science
    { categoryId: scienceId, questionText: "What is the hardest natural substance on Earth?", options: [{text: "Gold", isCorrect: false}, {text: "Iron", isCorrect: false}, {text: "Diamond", isCorrect: true}, {text: "Platinum", isCorrect: false}], hint: "Made of pure carbon.", mediaUrl: "https://images.unsplash.com/photo-1573294336021-39589d978438?w=800&q=80" },
    { categoryId: scienceId, questionText: "What is the chemical symbol for Gold?", options: [{text: "Ag", isCorrect: false}, {text: "Au", isCorrect: true}, {text: "Fe", isCorrect: false}, {text: "Hg", isCorrect: false}], hint: "From Latin Aurum.", mediaUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80" },
    // Pop Culture
    { categoryId: popId, questionText: "Who directed 'Inception'?", options: [{text: "Steven Spielberg", isCorrect: false}, {text: "Christopher Nolan", isCorrect: true}, {text: "Quentin Tarantino", isCorrect: false}, {text: "Martin Scorsese", isCorrect: false}], hint: "Directed Interstellar.", mediaUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80" },
    // History
    { categoryId: histId, questionText: "In what year did the Titanic sink?", options: [{text: "1905", isCorrect: false}, {text: "1912", isCorrect: true}, {text: "1918", isCorrect: false}, {text: "1923", isCorrect: false}], hint: "Before WWI.", mediaUrl: "https://images.unsplash.com/photo-1542385262-cdf06b2f4f21?w=800&q=80" },
    // Geo
    { categoryId: geoId, questionText: "Which country has the most islands?", options: [{text: "Indonesia", isCorrect: false}, {text: "Philippines", isCorrect: false}, {text: "Sweden", isCorrect: true}, {text: "Japan", isCorrect: false}], hint: "A Nordic country.", mediaUrl: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80" },
    // Gaming
    { categoryId: gameId, questionText: "What is the best-selling video game console ever?", options: [{text: "PS2", isCorrect: true}, {text: "Nintendo DS", isCorrect: false}, {text: "Game Boy", isCorrect: false}, {text: "PS4", isCorrect: false}], hint: "Released by Sony in 2000.", mediaUrl: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=800&q=80" }
  );

  // Auto-generate 100 questions for scale
  for (let i = 0; i < 100; i++) {
    questions.push({
      categoryId: gkId,
      questionText: `Solve: ${i + 15} + ${i * 3}?`,
      options: [
        {text: `${(i + 15) + (i * 3)}`, isCorrect: true},
        {text: `${(i + 15) + (i * 3) + 2}`, isCorrect: false},
        {text: `${(i + 15) + (i * 3) - 1}`, isCorrect: false},
        {text: `${(i + 15) + (i * 3) + 5}`, isCorrect: false}
      ],
      hint: "Basic math.",
      mediaUrl: null
    });
  }

  return questions;
};

// Seed route
router.get('/seed', async (req, res) => {
  try {
    await Category.deleteMany({});
    await Question.deleteMany({});
    const createdCategories = await Category.insertMany(categoriesData);
    const questionsToInsert = generateQuestions(createdCategories);
    await Question.insertMany(questionsToInsert);
    res.json({ success: true, message: `Seeded ${createdCategories.length} categories and ${questionsToInsert.length} questions.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get Categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Questions by Category
router.get('/', async (req, res) => {
  try {
    const { categoryId } = req.query;
    let query = {};
    if (categoryId) query.categoryId = categoryId;
    
    // Fetch 10 random questions
    const questions = await Question.aggregate([
      { $match: query },
      { $sample: { size: 10 } }
    ]);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
