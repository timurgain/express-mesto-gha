const { constants } = require('http2');
const CardModel = require('../models/card');
const { NullQueryResultError } = require('./castomErrors');
const { handleError } = require('./utils');

const ENTITY = 'карточка';

function getCards(req, res) {
  CardModel.find({})
    .populate('owner likes')
    .then((queryObj) => res.send(queryObj))
    .catch((err) => handleError(res, err, ENTITY));
}

function postCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;
  CardModel.create({ name, link, owner })
    .then((queryObj) =>
      res.status(constants.HTTP_STATUS_CREATED).send(queryObj)
    )
    .catch((err) => handleError(res, err, ENTITY));
}

function deleteCard(req, res) {
  CardModel.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
    .populate('owner likes')
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.status(constants.HTTP_STATUS_NO_CONTENT).send(queryObj);
    })
    .catch((err) => handleError(res, err, ENTITY));
}

function putCardLike(req, res) {
  CardModel.findOneAndUpdate(
    { _id: req.params.cardId },
    { $addToSet: { likes: req.user._id } },
    { returnDocument: 'after' }
  )
    .populate('owner likes')
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.send(queryObj);
    })
    .catch((err) => handleError(res, err, ENTITY));
}

function removeCardLike(req, res) {
  CardModel.findByIdAndUpdate(
    { _id: req.params.cardId },
    { $pull: { likes: req.user._id } },
    { returnDocument: 'after' }
  )
    .populate('owner likes')
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.send(queryObj);
    })
    .catch((err) => handleError(res, err, ENTITY));
}

module.exports = {
  getCards,
  postCard,
  deleteCard,
  putCardLike,
  removeCardLike,
};
