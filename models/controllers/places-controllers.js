const HttpError = require("../http-error");
const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

let DUMMY_DATA = [
  {
    id: 1,
    title: "Taj Mahal",
    description: "One of the most famous buildings in the world.",
  },
];

const getPlacebyID = (req, res, next) => {
  const id = req.params.id; // req.paramns -> {"id": etc}

  const place = DUMMY_DATA.find((place) => place.id == id);

  if (!place) {
    const error = new Error();
    return next(
      new HttpError("Could not find place that corresponds to this id", 404),
    );
  }

  res.json({ data: place });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return next(new HttpError("Could not validade fields", 422));
  }

  const { title, description } = req.body;
  const createdPlace = { id: uuid(), title, description };

  DUMMY_DATA.push(createdPlace);

  return res.status(201).json({ place: createdPlace });
};

const deletePlace = (req, res, next) => {
  const { id } = req.body;
  DUMMY_DATA = DUMMY_DATA.filter((place) => place.id == id);
  return res.status(204).json({ message: "place removed.", data: DUMMY_DATA });
};

const putPlace = (req, res, next) => {
  const { id, title, description } = req.body;
  DUMMY_DATA = DUMMY_DATA.map((place) => {
    if (place.id == id) {
      ((place.title = title), (place.description = description));
      return place;
    }

    // return place;
  });

  res.status(204).json({ data: DUMMY_DATA });
};

module.exports = {
  getPlacebyID,
  createPlace,
  deletePlace,
  putPlace,
};
