const express = require("express");
const { check } = require("express-validator");

// Importar controllers:
const placesController = require("../models/controllers/places");

// Importar middleware:
const middleware = require("../middleware/checkAuth");

const router = express.Router();
router.use(middleware);

router.post(
  "/create",
  [
    check("place").notEmpty(),
    check("description")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    check("rating")
      .isInt({ min: 0, max: 5 })
      .withMessage("Rating should be bettween 0 and 5."),
  ],
  placesController.createPlace,
);
router.get("/places", placesController.getAllPlaces);
router.get("/user-places", placesController.getUserPlaces);

module.exports = router;
