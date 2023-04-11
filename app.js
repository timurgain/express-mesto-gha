const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./config');
const routes = require('./routes/index');

// connect mongo
const {
  db: { host, port, name },
} = config;
mongoose.connect(`mongodb://${host}:${port}/${name}`);

// make app
const app = express();

// use logger
app.use(morgan('tiny'));

// temporary user while auth is not ready
app.use((req, res, next) => {
  req.user = {
    _id: '64244c5daf10c7950554893d',
  };
  next();
});

// use routes
app.use('/', routes);

app.listen(config.app.port);
