/* eslint-disable @typescript-eslint/no-var-requires */

const mongoose = require('mongoose');

const difficultiesSchema = mongoose.Schema({
  idntfr: Number,
  value: String,
  display: String
});

module.exports = mongoose.model('Difficulty', difficultiesSchema);
