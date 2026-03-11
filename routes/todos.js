const express = require("express");
const { check } = require("express-validator");

// Importar controllers:
const usersController = require("../models/controllers/users");

const router = express.Router();

router.post("/create", usersController.createUser);

module.exports = router;
