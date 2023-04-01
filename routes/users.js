const router = require('express').Router();
const jsonParser = require('express').json();
const {
  getUsers, getUserById, postUser, patchUserMe, patchUserMeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', jsonParser, postUser);
router.patch('/me', jsonParser, patchUserMe);
router.patch('/me/avatar', jsonParser, patchUserMeAvatar);

module.exports = router;
