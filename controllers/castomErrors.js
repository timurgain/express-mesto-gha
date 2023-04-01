class NullQueryResultError extends Error {
  constructor(message='Query result is null') {
    super(message);
    this.name = 'NullQueryResultError'
  }
}

module.exports = { NullQueryResultError }
