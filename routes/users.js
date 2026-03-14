const express = require("express");
const { check } = require("express-validator");

// Importar controllers:
const usersControllers = require("../models/controllers/users");

const router = express.Router();

router.post(
  "/create",
  [
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("email").isEmail(),
    check("password").notEmpty(),
  ],
  usersControllers.createUser,
);

module.exports = router;
