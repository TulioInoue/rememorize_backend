const pool = require("../../database/connection");
const HttpError = require("../http-error");

const createPlace = async (req, res, next) => {
  const { place, description, rating } = req.body;

  const userId = req.middleware.userId;
  console.log(`userId: ${userId}`);

  try {
    await pool.query(
      `INSERT INTO rememorize_places (place, description, rating, userId) VALUES (?, ?, ?)`,
      [place, description, +rating, userId],
    );
  } catch (err) {
    return next(new HttpError("Could not create place", 500));
  }
};

const getAllPlaces = async (req, res, next) => {
  const [rows] = pool.query(`SELECT * FROM rememorize_places`);

  return res.json({ data: rows });
};

const getUserPlaces = async (req, res, next) => {
  const userId = +req.middleware.userId;

  const rows = pool.query(`SELECT * FROM rememorize_places WHERE userId = ?`, [
    userId,
  ]);

  return res.json({ data: rows });
};

module.exports = {
  createPlace,
  getAllPlaces,
  getUserPlaces,
};
