const express = require("express");
const placeControllers = require("../models/controllers/places-controllers");

const router = express.Router();

router.get("/:id", placeControllers.getPlacebyID);

module.exports = router;
