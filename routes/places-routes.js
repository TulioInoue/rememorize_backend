const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("GET Requests in Places.");
  res.json({ data: "ahhhhhh" });
});

module.exports = router;
