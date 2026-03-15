const HttpError = require("../http-error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const pool = require("../../database/connection");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid fields", 422));
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    const newEncryptPassword = await bcrypt.hash(password, 10);

    pool.query(
      `
    INSERT INTO rememorize_users (firstName, lastName, email, password)
    VALUES (?, ?, ?, ?)
    `,
      [firstName, lastName, email, newEncryptPassword],
    );

    res
      .status(201)
      .json({ message: "User created successfully", type: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not create user.", type: "error" });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const [users] = await pool.query(
    "SELECT * FROM rememorize_users WHERE email = ?",
    [email],
  );
  const user = [users][0];

  if (!user) {
    return next(new HttpError("Invalid Credentials", 403));
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(new HttpError("Invalid Credentials", 403));
  }

  const idEncoded = uuidv4();

  await pool.query("UPDATE rememorize_users SET idEncoded = ? WHERE id = ?", [
    idEncoded,
    user.id,
  ]);

  const token = jwt.sign(
    {
      idEncoded: idEncoded,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "24h",
    },
  );
};

module.exports = {
  createUser,
};
