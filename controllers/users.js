const { constants } = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const {
  NullQueryResultError,
  CredentialsError,
  UniqueValueError,
} = require('../errors/castomErrors');
const config = require('../config');

function getUsers(req, res, next) {
  UserModel.find({})
    .then((queryObj) => res.send(queryObj))
    .catch(next);
}

function getUserById(req, res, next) {
  UserModel.findById({ _id: req.params.userId })
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.send(queryObj);
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    email, password, name, about, avatar,
  } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (user) throw new UniqueValueError();
      bcrypt
        .hash(password, 10)
        .then((hash) => UserModel.create({
          password: hash, email, name, about, avatar,
        }))
        .then((queryObj) => res.status(constants.HTTP_STATUS_CREATED).send(queryObj));
    })
    .catch(next);
}

function getUserMe(req, res, next) {
  // middleware.auth takes jwt from cookie and decode in req.user
  UserModel.findOne({ _id: req.user._id })
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.send(queryObj);
    })
    .catch(next);
}

function updateUser(req, res, data) {
  return UserModel.findByIdAndUpdate({ _id: req.user._id }, data, {
    returnDocument: 'after',
    runValidators: true,
  })
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.send(queryObj);
    });
}

function patchUserMe(req, res, next) {
  updateUser(req, res, { name: req.body.name, about: req.body.about }).catch(next);
}

function patchUserMeAvatar(req, res, next) {
  updateUser(req, res, { avatar: req.body.avatar }).catch(next);
}

function login(req, res, next) {
  UserModel.findOne({ email: req.body.email }).select('+password').then((user) => {
    if (!user) throw new CredentialsError();
    return bcrypt
      .compare(req.body.password, user.password)
      .then((isMatch) => {
        if (!isMatch) throw new CredentialsError();
        const token = jwt.sign({ _id: user._id }, config.jwt.secretKey, {
          expiresIn: '7d',
        });
        res
          .status(constants.HTTP_STATUS_OK)
          .cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
          .end();
      });
  })
    .catch(next);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  getUserMe,
  patchUserMe,
  patchUserMeAvatar,
  login,
};
