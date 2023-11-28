const userRouter = require('express').Router();
const {
  getUsers, getUserById, updateUser, getCurrentUser, updateAvatar,
} = require('../controllers/users');
const { validationGetUserById, validationUpdateUser, validationUpdateAvatar } = require('../middlewares/validation');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', validationGetUserById, getUserById);
userRouter.patch('/me', validationUpdateUser, updateUser);
userRouter.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = userRouter;
