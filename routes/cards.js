const router = require('express').Router();
const jsonParser = require('express').json();
const {
  getCards,
  postCard,
  deleteCard,
  putCardLike,
  removeCardLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', jsonParser, postCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', jsonParser, putCardLike);
router.delete('/:cardId/likes', removeCardLike);

module.exports = router;
