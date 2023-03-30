const CardModel = require('../models/card');

function getCards(req, res) {
  CardModel.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function postCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;
  CardModel.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function deleteCard(req, res) {
  CardModel.findByIdAndDelete({ _id: req.params.cardId })
    .then((delCard) => res.send(delCard))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function putCardLike(req, res) {
  CardModel.findByIdAndUpdate(
    { _id: req.params.cardId },
    { $addToSet: { likes: req.user._id } },
    { returnDocument: 'after', runValidators: true }
  )
    .then((likedCard) => res.send(likedCard))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function removeCardLike(req, res) {
  CardModel.findByIdAndUpdate(
    { _id: req.params.cardId },
    { $pull: { likes: req.user._id } },
    { returnDocument: 'after', runValidators: true }
  )
    .then((likedCard) => res.send(likedCard))
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = {
  getCards,
  postCard,
  deleteCard,
  putCardLike,
  removeCardLike,
};
