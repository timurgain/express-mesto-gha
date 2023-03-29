const UserModel = require('../models/user');

function getUsers(req, res) {
  UserModel.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function getUserById(req, res) {
  UserModel.findById({ _id: req.params.userId })
    .then((user) => res.send({ user }))
    .catch((err) => res.status(404).send({ message: err.message }));
}

function postUser(req, res) {
  const { name, about, avatar } = req.body;
  UserModel.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = { getUsers, getUserById, postUser };
