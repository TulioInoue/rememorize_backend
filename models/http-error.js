class HttpError extends Error {
  constructor(message, errorCode) {
    super()
    this.message = message; // Adds a message;
    this.code = errorCode; // Adds a code;
  }
}

module.exports = HttpError;
