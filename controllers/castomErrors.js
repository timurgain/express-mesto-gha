class NullQueryResultError extends Error {
  constructor(message = 'Query result is null') {
    super(message);
    this.name = 'NullQueryResultError';
  }
}

class CredentialsError extends Error {
  constructor(message = 'Wrong login or password') {
    super(message);
    this.name = 'CredentialsError';
  }
}

class UniqueValueError extends Error {
  constructor(message = 'Unique value error') {
    super(message);
    this.name = 'UniqueValueError';
  }
}

module.exports = { NullQueryResultError, CredentialsError, UniqueValueError };
