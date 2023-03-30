const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^(ftp|http|https):\/\/[^ "]+$/.test(value),
      message: 'Invalid URL format',
    },
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('user', userSchema);
