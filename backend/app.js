/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express');
const Questions = require('./models/question');
const Categories = require('./models/categories');
const Difficulties = require('./models/difficulties');
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
});

// GET Questions
app.get(`/questions/:number/:category/:dificulty`, (req, res) => {
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
});

// GET Categories
app.get(`/categories`, (_req, res) => {
  Categories.find({}).then((results) => {
    res.status(200).json({
      message: 'Successfully',
      results
    });
  });
});

app.get(`/categories/:number`, (req, res) => {
  Categories.find({
    idntfr: req.params.number
  }).then((results) => {
    res.status(200).json({
      message: 'Successfully',
      results
    });
  });
});

// GET Difficulties
app.get(`/difficulties`, (_req, res) => {
  Difficulties.find({}).then((results) => {
    res.status(200).json({
      message: 'Successfully',
      results
    });
  });
});

app.get(`/difficulties/:number`, (req, res) => {
  Difficulties.find({
    idntfr: req.params.number
  }).then((results) => {
    res.status(200).json({
      message: 'Successfully',
      results
    });
  });
});

module.exports = app;
