const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/mestodb ');

const app = express();
const { PORT = 3000 } = process.env;

// temporary user while auth is not ready
app.use((req, res, next) => {
  req.user = {
    _id: '64244c5daf10c7950554893d',
  };
  next();
});

app.use('/users', router);

app.listen(PORT);
