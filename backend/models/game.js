/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  category: Number,
  difficulty: Number,
  status: String,
  numberCorrectAnswers: Number,
  numberNotCorrectAnswers: Number,
  questionsAnswersLs: Array
});

module.exports = mongoose.model('Game', gameSchema);
