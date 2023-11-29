/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const { ERROR_CODE } = require('../constants/constants');
const { NotFoundError } = require('../constants/NotFoundError');
const { BadRequestError } = require('../constants/BadRequestError');
const ConflictError = require('../constants/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  user
    .find({})
    .then((users) => res.status(ERROR_CODE.OK).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  user
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден.'));
        // но так у меня выходит 500 ошибка, а не 404.
        // не могу понять почему

        // с этой строкой все рабоатет как надо
        // res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Пользователь не найден.' });
      } res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при поиске.'));
      }
      return next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  user
    .findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь не найден.'))
    .then((user) => res.status(ERROR_CODE.OK).send(user))
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(ERROR_CODE.CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } if (err.code === 11000) {
        return next(new ConflictError('Такой пользователь уже существует.'));
      } return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  user
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден.'));
      } res.status(ERROR_CODE.OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      } return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  user
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден.'));
      } res.status(ERROR_CODE.OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
      } return next(err);
    });
};
