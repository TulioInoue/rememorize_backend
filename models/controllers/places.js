const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const settings = require("../../S3/settings");
const pool = require("../../database/connection");
const HttpError = require("../http-error");

const createPlace = async (req, res, next) => {
  const { place, description, rating } = req.body;
  if (!req.file) {
    return next(new HttpError("No image attached", 422));
  }
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

const deleteUserPlace = async (req, res, next) => {
  const image_id = req.body.id;
  console.log(image_id);

  try {
    const [rows] = await pool.query(
      "SELECT s3Key from rememorize_places WHERE id = ?",
      [image_id],
    );

    console.log("rows:", rows);
    // Deletar do S3 a imagem de acordo com a url arquivada no RDS:
    await settings.s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: rows[0].s3Key,
      }),
    );

    await pool.query("DELETE FROM rememorize_places WHERE id = ?", [image_id]);
    res.json({ message: "Image and place removed successfully." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete image." });
  }
};

module.exports = {
  createPlace,
  getAllPlaces,
  getUserPlaces,
  deleteUserPlace,
};
