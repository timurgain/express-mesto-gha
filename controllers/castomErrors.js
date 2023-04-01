class NullQueryResultError extends Error {
  constructor(message='Null query result') {
    super(message);
    this.name = 'NullQueryResultError'
  }
}

module.exports = { NullQueryResultError }
