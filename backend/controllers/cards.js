/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const card = require('../models/card');
const { ERROR_CODE } = require('../constants/constants');
const BadRequestError = require('../constants/BadRequestError');
const NotFoundError = require('../constants/NotFoundError');
const ForbiddenError = require('../constants/ForbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  card
    .create({ name, link, owner })
    .then((card) => res.status(ERROR_CODE.CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } return next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  card
    .find({})
    .then((cards) => res.status(ERROR_CODE.OK).send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  card
    .findById(req.params.cardId)
    .then((card) => {
      if (card === null) {
        return next(new NotFoundError('Карточка не найдена.'));
      } if (req.user._id !== card.owner.toString()) {
        return next(new ForbiddenError('Нельзя удалять карточки других пользователей.'));
      } return card.deleteOne()
        .then(() => {
          res.status(ERROR_CODE.OK).send({ message: 'Карточка удалена.' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при удалении карточки.'));
      } return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        return next(new NotFoundError('Передан несуществующий id карточки.'));
      } res.status(ERROR_CODE.OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при постановке лайка.'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        return next(new NotFoundError('Передан несуществующий id карточки.'));
      } res.status(ERROR_CODE.OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные для снятии лайка.'));
      } return next(err);
    });
};
