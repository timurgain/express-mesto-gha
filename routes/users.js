const router = require('express').Router();
const jsonParser = require('express').json();
const {
  getUsers, getUserById, patchUserMe, patchUserMeAvatar, getUserMe,
} = require('../controllers/users');
const { userInfoValidation, avatarValidation } = require('../middlewares/validation/user');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', getUserById);

router.patch('/me', jsonParser, userInfoValidation, patchUserMe);
router.patch('/me/avatar', jsonParser, avatarValidation, patchUserMeAvatar);

module.exports = router;
