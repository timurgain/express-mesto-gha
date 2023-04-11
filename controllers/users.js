const { constants } = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const { NullQueryResultError, CredentialsError } = require('./castomErrors');
const { handleError } = require('./utils');
const config = require('../config');

const ENTITY = 'User';

function getUsers(req, res) {
  UserModel.find({})
    .then((queryObj) => res.send(queryObj))
    .catch((err) => handleError(res, err));
}

function getUserById(req, res) {
  UserModel.findById({ _id: req.params.userId })
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.send(queryObj);
    })
    .catch((err) => handleError(res, err, ENTITY));
}

function postUser(req, res) {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({
        password: hash, email, name, about, avatar,
      });
    })
    .then((queryObj) => res.status(constants.HTTP_STATUS_CREATED).send(queryObj))
    .catch((err) => handleError(res, err, ENTITY));
}

function updateUser(req, res, data) {
  UserModel.findByIdAndUpdate({ _id: req.user._id }, data, {
    returnDocument: 'after',
    runValidators: true,
  })
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.send(queryObj);
    })
    .catch((err) => handleError(res, err, ENTITY));
}

function patchUserMe(req, res) {
  updateUser(req, res, { name: req.body.name, about: req.body.about });
}

function patchUserMeAvatar(req, res) {
  updateUser(req, res, { avatar: req.body.avatar });
}

function login(req, res) {
  UserModel.findOne({ email: req.body.email }).then((user) => {
    if (!user) throw new CredentialsError();
    return bcrypt.compare(req.body.password, user.password)
      .then((isMatch) => {
        if (!isMatch) throw new CredentialsError();
        const token = jwt.sign({ _id: user._id }, config.jwt.secretKey, {
          expiresIn: '7d',
        });
        res
          .status(constants.HTTP_STATUS_OK)
          .cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
          .end();
      })
      .catch((err) => handleError(res, err, ENTITY));
  });
}

module.exports = {
  getUsers,
  getUserById,
  postUser,
  patchUserMe,
  patchUserMeAvatar,
  login,
};
