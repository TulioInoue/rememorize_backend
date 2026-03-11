const express = require("express");
const { check } = require("express-validator");

// Importar controllers:
const usersControllers = require("../models/controllers/users");

const router = express.Router();

router.post("/create", usersControllers.createUser);

module.exports = router;
