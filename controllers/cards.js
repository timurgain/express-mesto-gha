const CardModel = require('../models/card');

function handleError(res, err) {
  if (err.name === 'ValidationError') {
    res
      .status(400)
      .send({ message: 'Переданы некорректные данные полей карточки.' });
    return;
  }
  if (err.name === 'CastError') {
    res
      .status(404)
      .send({ message: 'Карточка с указанным _id не найдена.' });
    return;
  }
  res.status(500).send({ message: err.message });
}

function getCards(req, res) {
  CardModel.find({})
    .then((queryObj) => res.send(queryObj))
    .catch((err) => handleError(res, err));
}

function postCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;
  CardModel.create({ name, link, owner })
    .then((queryObj) => res.send(queryObj))
    .catch((err) => handleError(res, err));
}

function deleteCard(req, res) {
  CardModel.findByIdAndDelete({ _id: req.params.cardId })
    .then((queryObj) => res.send(queryObj))
    .catch((err) => handleError(res, err));
}

function putCardLike(req, res) {
  CardModel.findByIdAndUpdate(
    { _id: req.params.cardId },
    { $addToSet: { likes: req.user._id } },
    { returnDocument: 'after', runValidators: true },
  )
    .then((queryObj) => res.send(queryObj))
    .catch((err) => handleError(res, err));
}

function removeCardLike(req, res) {
  CardModel.findByIdAndUpdate(
    { _id: req.params.cardId },
    { $pull: { likes: req.user._id } },
    { returnDocument: 'after', runValidators: true },
  )
    .then((queryObj) => res.send(queryObj))
    .catch((err) => handleError(res, err));
}

module.exports = {
  getCards,
  postCard,
  deleteCard,
  putCardLike,
  removeCardLike,
};
