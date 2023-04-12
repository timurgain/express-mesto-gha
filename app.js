const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

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

// read current user id from jwd payload
app.use(cookieParser());

// use routes
app.use('/', routes);

app.listen(config.app.port);
