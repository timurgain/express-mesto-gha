const router = require('express').Router();
const jsonParser = require('body-parser').json();
const {
  getUsers, getUserById, postUser, patchUserMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', jsonParser, postUser);
router.patch('/me', jsonParser, patchUserMe);
router.patch('/me/avatar', jsonParser, patchUserMe);

module.exports = router;
