const router = require('express').Router();
const { constants } = require('http2');
const jsonParser = require('express').json();
const routerUsers = require('./users');
const routerCards = require('./cards');
const { login, createUser } = require('../controllers/users');
const { readCookieCredentials } = require('../middlewares/auth');

// registration and login
router.post('/signin', jsonParser, login);
router.post('/signup', jsonParser, createUser);

// main app routes, required to be authenticated
router.use('/users', readCookieCredentials, routerUsers);
router.use('/cards', readCookieCredentials, routerCards);

// 404, url not found
router.use('*', (req, res) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'По указанному url ничего нет.' });
});

module.exports = router;
