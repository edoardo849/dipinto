var express = require('express'),
    painter  = require('./painter');

var app = module.exports = express.Router();

app.get('/api/random-painting', function(req, res) {
  res.status(200).send(painter.getRandomPaintings(req.query.n));
});
