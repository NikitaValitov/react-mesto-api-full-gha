const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле является обязательным'],
    minlength: [2, 'минимальная длина 2 символа'],
    maxlength: [30, 'максимальаня длина 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле является обязательным'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле является обязательным'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
