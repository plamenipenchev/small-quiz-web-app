/* eslint-disable @typescript-eslint/no-var-requires */

const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
  idntfr: Number,
  label: String,
  display: String
});

// export default model('Categories', categoriesSchema);
module.exports = mongoose.model('Categories', categoriesSchema);
