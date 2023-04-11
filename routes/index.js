const router = require('express').Router();
const { constants } = require('http2');
const routerUsers = require('./users');
const routerCards = require('./cards');
const { login, postUser } = require('../controllers/users');

const jsonParser = require('express').json();

// main app
router.use('/users', routerUsers);
router.use('/cards', routerCards);
// auth
router.post('/signin', jsonParser, login);
router.post('/signup', jsonParser, postUser);
// 404
router.use('*', (req, res) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'По указанному url ничего нет.' });
});

module.exports = router;
