const express = require('express');
const Question = require('./models/question')
const mongoose = require('mongoose');

const app = express();

// DB connection
mongoose.connect('mongodb+srv://ppenchev:025043@cluster0.7hxf4.mongodb.net/quiz?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('CONNECTED TO MONGO DB!');
  })
  .catch(() => {
    console.log('CONNECTION FAILED!')
  });

// set required headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
});

// GET Questions
app.get(`/questions/:number/:category/:dificulty`, (req, res, next) => {
  Question.find({ category: req.params.category, difficulty: req.params.dificulty })
    .limit(Number(req.params.number))
    .then(results => {
      res.status(200).json({
        message: 'Successfully',
        results
      })
    });
});


module.exports = app;
