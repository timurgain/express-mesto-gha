const jsonwebtoken = require('jsonwebtoken');
const { constants } = require('http2');
const config = require('../config');

function readCoockieCredentials(req, res, next) {
  const { jwt } = req.cookies;
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, config.jwt.secretKey);
  } catch {
    return res
      .status(constants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
}

module.exports = { readCoockieCredentials };
