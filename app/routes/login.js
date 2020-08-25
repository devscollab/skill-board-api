const express = require("express");
const router = express.Router();


router.post("/student", (req, res, next) => {
  res.status(201).json({
    message: "Success"
  })
  });

module.exports = router;