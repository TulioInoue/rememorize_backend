const pool = require("../../database/connection");
const HttpError = require("../http-error");

const createPlace = async (req, res, next) => {
  const { place, description, rating } = req.body;
  const imageUrl = req.file.location;
  const s3Key = req.file.key;

  const userId = req.middleware.userId;

  try {
    await pool.query(
      `INSERT INTO rememorize_places (place, description, rating, imageUrl, s3Key, userId) VALUES (?, ?, ?, ?, ?, ?)`,
      [place, description, +rating, imageUrl, s3Key, userId],
    );
    return res
      .status(201)
      .json({ message: "place review created successfully." });
  } catch (err) {
    return next(new HttpError("Could not create place", 500));
  }
};

const getAllPlaces = async (req, res, next) => {
  const [rows] = await pool.query(`SELECT * FROM rememorize_places`);

  return res.json({ places: rows });
};

const getUserPlaces = async (req, res, next) => {
  const userId = +req.middleware.userId;

  const [rows] = await pool.query(
    `SELECT * FROM rememorize_places WHERE userId = (?)`,
    [userId],
  );

  return res.json({ places: rows });
};

module.exports = {
  createPlace,
  getAllPlaces,
  getUserPlaces,
};
