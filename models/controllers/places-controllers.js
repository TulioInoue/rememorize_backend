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

module.exports = {
  getPlacebyID,
};
