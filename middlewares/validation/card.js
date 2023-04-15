const { celebrate, Joi } = require('celebrate');

const cardInfoSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required()
    .uri()
    .pattern(/^(ftp|http|https):\/\/[^ "]+$/),
});

function cardInfoValidation(req, res, next) {
  celebrate(
    {
      body: cardInfoSchema,
    },
    { abortEarly: false },
  )(req, res, next);
}

module.exports = { cardInfoValidation };
