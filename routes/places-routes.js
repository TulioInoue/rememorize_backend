const express = require("express");
const { check } = require("express-validator");
const placeControllers = require("../models/controllers/places-controllers");

const router = express.Router();

router.get("/:id", placeControllers.getPlacebyID);
router.post(
  "/",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeControllers.createPlace,
);
router.delete("/delete", placeControllers.deletePlace);
router.put("/put", placeControllers.putPlace);

module.exports = router;
