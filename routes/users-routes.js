const express = require("express");

// Importar controllers:
const usersControllers = require("../models/controllers/users-controllers");

const router = express.Router();

router.get("/:id", usersControllers.getUsers);
router.post("/", usersControllers.createUser);

module.exports = router;
