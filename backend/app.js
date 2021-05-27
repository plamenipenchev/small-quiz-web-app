/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express');
const Questions = require('./models/question');
const Categories = require('./models/categories');
const Difficulties = require('./models/difficulties');
const Game = require('./models/game');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// DB connection
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASS}${process.env.CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('CONNECTED TO MONGO DB!');
  })
  .catch(() => {
    // eslint-disable-next-line no-console
    console.log('CONNECTION FAILED!');
  });

// set required headers
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// parsing application/json
app.use(express.json());

//  parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// GET Questions
app.get(`/api/questions/:number/:category/:dificulty`, (req, res) => {
  try {
    Questions.find({
      category: req.params.category,
      difficulty: req.params.dificulty
    })
      .limit(Number(req.params.number))
      .then((results) => {
        res.status(200).json({
          message: 'Successfully',
          results
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET Categories
app.get(`/api/categories`, (_req, res) => {
  try {
    Categories.find({}).then((results) => {
      res.status(200).json({
        message: 'Successfully',
        results
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get(`/api/categories/:number`, (req, res) => {
  try {
    Categories.find({
      idntfr: req.params.number
    }).then((results) => {
      res.status(200).json({
        message: 'Successfully',
        results
      });
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// GET Difficulties
app.get(`/api/difficulties`, (_req, res) => {
  try {
    Difficulties.find({}).then((results) => {
      res.status(200).json({
        message: 'Successfully',
        results
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get(`/api/difficulties/:number`, (req, res) => {
  try {
    Difficulties.find({
      idntfr: req.params.number
    }).then((results) => {
      res.status(200).json({
        message: 'Successfully',
        results
      });
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// CREATE Quiz Game
app.post(`/api/games`, (req, res) => {
  const game = new Game({
    difficulty: req.body.difficulty,
    category: req.body.category,
    status: 'pending',
    numberCorrectAnswers: 0,
    numberNotCorrectAnswers: 0,
    questionsAnswersLs: []
  });
  try {
    game.save();
    res.status(201).json({
      message: 'Game created successfully',
      quizId: game.id,
      game
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get(`/api/games/:id`, (req, res) => {
  try {
    Game.findById(req.params.id).then((game) => {
      res.status(200).json({
        message: 'Game Successfully Return',
        game
      });
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.patch(`/api/games/:id`, (req, res) => {
  const filter = { _id: req.params.id };

  const update = {
    status: req.body.status,
    numberCorrectAnswers: req.body.numberCorrectAnswers,
    numberNotCorrectAnswers: req.body.numberNotCorrectAnswers,
    questionsAnswersLs: req.body.questionsAnswersLs
  };
  try {
    Game.findOneAndUpdate(filter, update, { useFindAndModify: false }).then(
      (game) => {
        res.status(200).json({
          message: 'Game Successfully Updated',
          game
        });
      }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = app;
