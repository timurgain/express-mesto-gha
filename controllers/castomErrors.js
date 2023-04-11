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

module.exports = { NullQueryResultError, CredentialsError };
