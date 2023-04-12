const mongoose = require('mongoose');
const { constants } = require('http2');
const {
  NullQueryResultError,
  CredentialsError,
  UniqueValueError,
} = require('./castomErrors');

function handleError(res, err, entity) {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
      message: `Объект ${entity}: переданы некорректные данные полей.`,
    });
    return;
  }
  if (err instanceof mongoose.Error.CastError && err.path === 'owner') {
    res
      .status(constants.HTTP_STATUS_FORBIDDEN)
      .send({ message: `Объект ${entity}: неверный _id в поле owner.` });
    return;
  }
  if (err instanceof mongoose.Error.CastError && err.path === '_id') {
    res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .send({ message: `Объект ${entity}: неверный _id.` });
    return;
  }
  if (err instanceof NullQueryResultError) {
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .send({ message: `Объект ${entity}: не найдено.` });
    return;
  }
  if (err instanceof CredentialsError) {
    res
      .status(constants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Неправильные почта или пароль' });
    return;
  }
  if (err instanceof UniqueValueError) {
    res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .send({ message: `Объект ${entity} с такими данными уже есть в БД` });
    return;
  }
  res
    .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: 'Произошла ошибка на сервере.' });
}

module.exports = { handleError };
