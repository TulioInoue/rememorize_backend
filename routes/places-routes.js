const express = require("express");
const placeControllers = require("../models/controllers/places-controllers");

const router = express.Router();

router.get("/:id", placeControllers.getPlacebyID);
router.post("/", placeControllers.createPlace);
router.delete("/delete", placeControllers.deletePlace);
router.put("/put", placeControllers.putPlace);

module.exports = router;
