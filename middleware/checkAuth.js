const jwt = require("jsonwebtoken");
const pool = require("../database/connection");
const HttpError = require("../models/http-error");

const check_auth = async (req, res, next) => {
  // Futuramente, requisições com token precisarão vir no formato "Bearer ...":
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const idEncoded = decodedToken.idEncoded;

    const [Ids] = await pool.query(
      `SELECT id from rememorize_users WHERE idEncoded = ?`,
      [idEncoded],
    );

    if (Ids.length === 0) throw new Error();

    req.middleware = { userID: Ids[0].id };
    next();
  } catch (err) {
    return next(new HttpError("Authentication error", 401));
  }
};

module.exports = check_auth;
