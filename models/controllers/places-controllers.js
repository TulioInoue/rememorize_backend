const HttpError = require("../http-error");

const DUMMY_DATA = [
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
  const { title, description } = req.body;
  const createdPlace = { title, description };

  DUMMY_DATA.push(createdPlace);

  return res.status(201).json({ place: createdPlace });
};

module.exports = {
  getPlacebyID,
  createPlace,
};
