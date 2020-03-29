/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const fetch = require('node-fetch')

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

let score = [0, 0, 0]



app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', async (req, res) => {
  let dogUrl = await fetch('https://dog.ceo/api/breeds/image/random').then(res=>res.json());
  let catUrl = 'https://placekitten.com/';
  let cageUrl = 'https://www.placecage.com/';
  let urls = {
    dogUrl: dogUrl.message,
    catUrl,
    cageUrl
  }
  console.log(urls)
  res.send(urls)
});

app.get('/dog-point', (req, res) => {
  score[0]++;
  res.send(score)
})

app.get('/cat-point', (req, res) => {
  score[1]++
  res.send(score)
})

app.get('/cage-point', (req, res) => {
  score[2]++
  res.send(score)
})

app.get('/score', (req, res) => {
  res.send(score)
  
})

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});
  
module.exports = app;
