const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb ');

const app = express();
const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.listen(PORT);
