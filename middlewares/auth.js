const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');
const { AuthenticationRequiredError } = require('../errors/castomErrors');

function readCookieCredentials(req, res, next) {
  const { jwt } = req.cookies;
  if (!jwt) throw new AuthenticationRequiredError();
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, config.jwt.secretKey);
  } catch {
    throw new AuthenticationRequiredError();
  }
  req.user = payload;
  return next();
}

module.exports = { readCookieCredentials };
