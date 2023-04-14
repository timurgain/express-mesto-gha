const router = require('express').Router();
const jsonParser = require('express').json();
const {
  getCards,
  postCard,
  deleteCard,
  putCardLike,
  removeCardLike,
} = require('../controllers/cards');

const { cardInfoValidation } = require('../middlewares/validation/card');

// card
router.get('/', getCards);
router.post('/', jsonParser, cardInfoValidation, postCard);
router.delete('/:cardId', deleteCard);
// cards likes
router.put('/:cardId/likes', jsonParser, putCardLike);
router.delete('/:cardId/likes', removeCardLike);

module.exports = router;
