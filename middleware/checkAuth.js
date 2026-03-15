const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

const check_auth = (req, res, next) => {
  // Futuramente, requisições com token precisarão vir no formato "Bearer ...":
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { idEncoded: decodedToken.idEncoded };
    next();
  } catch (err) {
    return next(new HttpError("Authentication error", 401));
  }
};

module.exports = check_auth;
