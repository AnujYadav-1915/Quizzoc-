require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Question = require('../models/Question');

const DB_URI = process.env.MONGO_URI || "mongodb+srv://ashish11211121:OaWl7s0YhP0n7B4Z@cluster0.k0f1k.mongodb.net/quiz-app?retryWrites=true&w=majority&appName=Cluster0";

const categoriesData = [
  { name: "General Knowledge", slug: "gk", description: "Test your everyday knowledge", iconUrl: "Globe" },
  { name: "Science & Tech", slug: "science", description: "Physics, biology, space, and code", iconUrl: "BrainCircuit" },
  { name: "Pop Culture", slug: "pop-culture", description: "Movies, music, and internet culture", iconUrl: "Zap" },
  { name: "History", slug: "history", description: "Events that shaped the world", iconUrl: "Target" },
  { name: "Geography", slug: "geography", description: "Countries, capitals, and oceans", iconUrl: "Map" },
  { name: "Gaming", slug: "gaming", description: "From retro to modern AAA titles", iconUrl: "Gamepad" },
  { name: "Mythology", slug: "mythology", description: "Gods, monsters, and legends", iconUrl: "Sword" },
  { name: "Space", slug: "space", description: "The final frontier", iconUrl: "Rocket" }
];

const generateQuestions = (categories) => {
  const questions = [];
  
  // General Knowledge
  const gkId = categories.find(c => c.slug === 'gk')._id;
  questions.push(
    { categoryId: gkId, questionText: "What is the capital of Australia?", options: [{text: "Sydney", isCorrect: false}, {text: "Melbourne", isCorrect: false}, {text: "Canberra", isCorrect: true}, {text: "Perth", isCorrect: false}], hint: "It's an inland city, purposely built between Sydney and Melbourne.", mediaUrl: "https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=800&q=80" },
    { categoryId: gkId, questionText: "Which of the following is NOT a primary color?", options: [{text: "Red", isCorrect: false}, {text: "Blue", isCorrect: false}, {text: "Yellow", isCorrect: false}, {text: "Green", isCorrect: true}], hint: "It is created by mixing blue and yellow.", mediaUrl: null }
  );

  // Science
  const scienceId = categories.find(c => c.slug === 'science')._id;
  questions.push(
    { categoryId: scienceId, questionText: "What is the hardest natural substance on Earth?", options: [{text: "Gold", isCorrect: false}, {text: "Iron", isCorrect: false}, {text: "Diamond", isCorrect: true}, {text: "Platinum", isCorrect: false}], hint: "It is made of pure carbon.", mediaUrl: "https://images.unsplash.com/photo-1573294336021-39589d978438?w=800&q=80" },
    { categoryId: scienceId, questionText: "What is the chemical symbol for Gold?", options: [{text: "Ag", isCorrect: false}, {text: "Au", isCorrect: true}, {text: "Fe", isCorrect: false}, {text: "Hg", isCorrect: false}], hint: "It comes from the Latin word 'Aurum'.", mediaUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80" },
    { categoryId: scienceId, questionText: "Who developed the theory of relativity?", options: [{text: "Isaac Newton", isCorrect: false}, {text: "Nikola Tesla", isCorrect: false}, {text: "Albert Einstein", isCorrect: true}, {text: "Galileo Galilei", isCorrect: false}], hint: "E=mc^2", mediaUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80" }
  );

  // Space
  const spaceId = categories.find(c => c.slug === 'space')._id;
  questions.push(
    { categoryId: spaceId, questionText: "Which planet is known as the Red Planet?", options: [{text: "Venus", isCorrect: false}, {text: "Jupiter", isCorrect: false}, {text: "Saturn", isCorrect: false}, {text: "Mars", isCorrect: true}], hint: "Elon Musk wants to colonize it.", mediaUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80" },
    { categoryId: spaceId, questionText: "What is the largest planet in our solar system?", options: [{text: "Saturn", isCorrect: false}, {text: "Jupiter", isCorrect: true}, {text: "Neptune", isCorrect: false}, {text: "Uranus", isCorrect: false}], hint: "It has a giant red spot.", mediaUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80" }
  );

  // Pop Culture
  const popId = categories.find(c => c.slug === 'pop-culture')._id;
  questions.push(
    { categoryId: popId, questionText: "Who directed the movie 'Inception'?", options: [{text: "Steven Spielberg", isCorrect: false}, {text: "Christopher Nolan", isCorrect: true}, {text: "Quentin Tarantino", isCorrect: false}, {text: "Martin Scorsese", isCorrect: false}], hint: "He also directed Interstellar.", mediaUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80" },
    { categoryId: popId, questionText: "What is the highest-grossing film of all time?", options: [{text: "Avatar", isCorrect: true}, {text: "Avengers: Endgame", isCorrect: false}, {text: "Titanic", isCorrect: false}, {text: "Star Wars: The Force Awakens", isCorrect: false}], hint: "It features blue aliens.", mediaUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80" }
  );

  // History
  const histId = categories.find(c => c.slug === 'history')._id;
  questions.push(
    { categoryId: histId, questionText: "In what year did the Titanic sink?", options: [{text: "1905", isCorrect: false}, {text: "1912", isCorrect: true}, {text: "1918", isCorrect: false}, {text: "1923", isCorrect: false}], hint: "Before WWI began.", mediaUrl: "https://images.unsplash.com/photo-1542385262-cdf06b2f4f21?w=800&q=80" },
    { categoryId: histId, questionText: "Who was the first President of the United States?", options: [{text: "Thomas Jefferson", isCorrect: false}, {text: "John Adams", isCorrect: false}, {text: "George Washington", isCorrect: true}, {text: "Abraham Lincoln", isCorrect: false}], hint: "He is on the $1 bill.", mediaUrl: "https://images.unsplash.com/photo-1584873735166-508b4ea17b8f?w=800&q=80" }
  );

  // Gaming
  const gameId = categories.find(c => c.slug === 'gaming')._id;
  questions.push(
    { categoryId: gameId, questionText: "What is the best-selling video game console of all time?", options: [{text: "PlayStation 2", isCorrect: true}, {text: "Nintendo DS", isCorrect: false}, {text: "Game Boy", isCorrect: false}, {text: "PlayStation 4", isCorrect: false}], hint: "It was released by Sony in 2000.", mediaUrl: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=800&q=80" }
  );

  // Add bulk synthetic questions for scale
  for (let i = 0; i < 50; i++) {
    questions.push({
      categoryId: gkId,
      questionText: `What is ${i + 5} + ${i * 2}?`,
      options: [
        {text: `${(i + 5) + (i * 2)}`, isCorrect: true},
        {text: `${(i + 5) + (i * 2) + 2}`, isCorrect: false},
        {text: `${(i + 5) + (i * 2) - 1}`, isCorrect: false},
        {text: `${(i + 5) + (i * 2) + 5}`, isCorrect: false}
      ],
      hint: "Use basic math.",
      mediaUrl: null
    });
  }

  return questions;
};

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB successfully.");

    console.log("Clearing existing categories and questions...");
    await Category.deleteMany({});
    await Question.deleteMany({});

    console.log("Seeding Categories...");
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`Created ${createdCategories.length} categories.`);

    console.log("Seeding Questions...");
    const questionsToInsert = generateQuestions(createdCategories);
    await Question.insertMany(questionsToInsert);
    console.log(`Successfully seeded ${questionsToInsert.length} questions!`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seedDatabase();
