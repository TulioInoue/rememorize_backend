const HttpError = require("../http-error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const pool = require("../../database/connection");

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid fields", 422));
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    const newEncryptPassword = await bcrypt.hash(password, 10);

    const query = `
    INSERT INTO rememorize_users (firstName, lastName, email, password)
    VALUES (?, ?, ?, ?)
    `;
    const values = [firstName, lastName, email, newEncryptPassword];

    pool.query(query, values);

    res
      .status(201)
      .json({ message: "User created successfully", type: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not create user.", type: "error" });
  }
};

module.exports = {
  createUser,
};
