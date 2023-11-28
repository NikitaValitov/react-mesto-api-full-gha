const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validationCreateCard, validationCardById } = require('../middlewares/validation');

cardRouter.get('/', getCards);
cardRouter.post('/', validationCreateCard, createCard);
cardRouter.delete('/:cardId', validationCardById, deleteCard);
cardRouter.put('/:cardId/likes', validationCardById, likeCard);
cardRouter.delete('/:cardId/likes', validationCardById, dislikeCard);

module.exports = cardRouter;
