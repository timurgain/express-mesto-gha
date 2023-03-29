const router = require('express').Router();
const jsonParser = require('body-parser').json();
const { getCards, postCard, deleteCard } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', jsonParser, postCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
