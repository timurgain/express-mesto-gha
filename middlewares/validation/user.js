const { celebrate, Joi } = require('celebrate');

// Schemas
const signinSchema = Joi.object().keys({
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/),
});

const userInfoSchema = Joi.object().keys({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string()
    .uri()
    .pattern(/^(ftp|http|https):\/\/[^ "]+#*$/),
});

// Validation maddlewares
function signinValidation(req, res, next) {
  celebrate(
    {
      body: signinSchema,
    },
    { abortEarly: false, allowUnknown: true },
  )(req, res, next);
}

function signupValidation(req, res, next) {
  celebrate(
    {
      body: signinSchema.concat(userInfoSchema),
    },
    { abortEarly: false, allowUnknown: true },
  )(req, res, next);
}

function userInfoValidation(req, res, next) {
  celebrate(
    {
      body: userInfoSchema,
    },
    { abortEarly: false, allowUnknown: true },
  )(req, res, next);
}

module.exports = { signinValidation, signupValidation, userInfoValidation };
