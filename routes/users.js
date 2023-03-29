const router = require('express').Router();
const jsonParser = require('body-parser').json();
const { getUsers, getUserById, postUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', jsonParser, postUser);

module.exports = router;
