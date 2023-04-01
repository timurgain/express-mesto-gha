const { constants } = require('http2');
const express = require('express');
const mongoose = require('mongoose');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

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

app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', (req, res) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'По указанному url ничего нет.' });
});

app.listen(PORT);
