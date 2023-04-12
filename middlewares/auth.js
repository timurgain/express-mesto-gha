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

  // req.user = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZWQzNWYwNWM4ODZmMDU1ZWI5ODAiLCJpYXQiOjE2ODEzMjE3OTcsImV4cCI6MTY4MTkyNjU5N30.TLX5_9X0glfy7MixCBsQUM8mhcuJJikt1zmSqXioQ6U"

  return next();
}

module.exports = { readCoockieCredentials };
