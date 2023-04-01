const { constants } = require('http2');
const UserModel = require('../models/user');
const { NullQueryResultError } = require('./castomErrors');
const { handleError } = require('./utils');

const ENTITY = 'пользователь';

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
  const { name, about, avatar } = req.body;
  UserModel.create({ name, about, avatar })
    .then((queryObj) =>
      res.status(constants.HTTP_STATUS_CREATED).send(queryObj)
    )
    .catch((err) => handleError(res, err, ENTITY));
}

function patchUserMe(req, res) {
  UserModel.findByIdAndUpdate(
    { _id: req.user._id },
    { name: req.body.name, about: req.body.about },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  )
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.send(queryObj);
    })
    .catch((err) => handleError(res, err, ENTITY));
}

function patchUserMeAvatar(req, res) {
  UserModel.findByIdAndUpdate(
    { _id: req.user._id },
    { avatar: req.body.avatar },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  )
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.send(queryObj);
    })
    .catch((err) => handleError(res, err, ENTITY));
}

module.exports = {
  getUsers,
  getUserById,
  postUser,
  patchUserMe,
  patchUserMeAvatar,
};
