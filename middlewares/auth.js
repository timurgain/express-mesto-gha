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

  // temporary fo debug
  // const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZWQzNWYwNWM4ODZmMDU1ZWI5ODAiLCJpYXQiOjE2ODEzMjE3OTcsImV4cCI6MTY4MTkyNjU5N30.TLX5_9X0glfy7MixCBsQUM8mhcuJJikt1zmSqXioQ6U"
  // const payload = jsonwebtoken.verify(userToken, config.jwt.secretKey);

  // const creatorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM3YzY2Yzk0MjEyYzE3NTBiYTM2ZTgiLCJpYXQiOjE2ODEzNzY5MzksImV4cCI6MTY4MTk4MTczOX0.rhki-vUJgqdkkI_OF2_-9NTp4by4nE73sUwaa4b-5T0";
  // const payload = jsonwebtoken.verify(creatorToken, config.jwt.secretKey);

  // req.user = payload;

  next();
}

module.exports = { readCoockieCredentials };
