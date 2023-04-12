const router = require('express').Router();
const { constants } = require('http2');
const jsonParser = require('express').json();
const routerUsers = require('./users');
const routerCards = require('./cards');
const { login, postUser } = require('../controllers/users');
const { readCoockieCredentials } = require('../middlewares/auth');

// registration and login
router.post('/signin', jsonParser, login);
router.post('/signup', jsonParser, postUser);
// main app routes, required to be authenticated
router.use('/users', readCoockieCredentials, routerUsers);
router.use('/cards', readCoockieCredentials, routerCards);
// 404, url not found
router.use('*', (req, res) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'По указанному url ничего нет.' });
});

module.exports = router;
