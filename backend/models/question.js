const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  category: String,
  type: String,
  difficulty: String,
  question: String,
  correct_answer: String,
  incorrect_answers: Array
});

module.exports = mongoose.model('Question', questionSchema);
