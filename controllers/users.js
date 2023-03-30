const UserModel = require('../models/user');

function handleError(res, err) {
  if (err.name === 'ValidationError') {
    res
      .status(400)
      .send({ message: 'Переданы некорректные данные полей пользователя.' });
    return;
  }
  if (err.name === 'CastError') {
    res
      .status(404)
      .send({ message: 'Пользователь по указанному _id не найден.' });
    return;
  }
  res.status(500).send({ message: err.message });
}

function getUsers(req, res) {
  UserModel.find({})
    .then((queryObj) => res.send(queryObj))
    .catch((err) => handleError(res, err));
}

function getUserById(req, res) {
  UserModel.findById({ _id: req.params.userId })
    .then((queryObj) => res.send(queryObj))
    .catch((err) => handleError(res, err));
}

function postUser(req, res) {
  const { name, about, avatar } = req.body;
  UserModel.create({ name, about, avatar })
    .then((queryObj) => res.send(queryObj))
    .catch((err) => handleError(res, err));
}

function patchUserMe(req, res) {
  UserModel.findByIdAndUpdate({ _id: req.user._id }, req.body, {
    returnDocument: 'after',
    runValidators: true,
  })
    .then((queryObj) => res.send(queryObj))
    .catch((err) => handleError(res, err));
}

module.exports = {
  getUsers, getUserById, postUser, patchUserMe,
};
