var express = require('express');
var app = express();

const ImageRepository = require('./Repository/ImageRepository');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8000);