const HttpError = require("../http-error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const pool = require("../../database/connection");
const { v4: uuid } = require("uuid");

const createUser = async (req, res, next) => {
  console.log("O banco chegou até aqui?");

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid fields", 422));
  }

  const { first_name, last_name, email, password } = req.body;

  try {
    const newEncryptPassword = await bcrypt.hash(password, 10);

    const query = `
    INSERT INTO users_mern1 (first_name, last_name, email, password)
    VALUES (?, ?, ?, ?)
    `;
    const values = [first_name, last_name, email, newEncryptPassword];

    // No mysql2, o resultado vem em um array [rows, fields]
    const [result] = await pool.query(query, values);

    // Para pegar o ID inserido no MySQL:
    res.status(201).json({ id: result.insertId, first_name, last_name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao registrar usuário." });
  }
};

module.exports = {
  createUser,
};
