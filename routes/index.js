const routerUsers = require('./users');
const routerCards = require('./cards');
const router = require('express').Router();

router.use('/users', routerUsers);
router.use('/cards', routerCards);
router.use('*', (req, res) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'По указанному url ничего нет.' });
});

module.exports = router;
