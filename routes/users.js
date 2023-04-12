const router = require('express').Router();
const jsonParser = require('express').json();
const {
  getUsers, getUserById, patchUserMe, patchUserMeAvatar, getUserMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/me', getUserMe);
router.patch('/me', jsonParser, patchUserMe);
router.patch('/me/avatar', jsonParser, patchUserMeAvatar);

module.exports = router;
