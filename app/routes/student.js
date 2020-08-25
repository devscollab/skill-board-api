const express = require("express");
const router = express.Router();


router.patch("/update/:id", (req, res, next) => {
  res.status(201).json({
    message: "Updated"+req.params.id
  })
  });

router.delete("/delete/:id", (req, res, next) => {
  res.status(201).json({
    message: "Deleted"+req.params.id
  })
  });

module.exports = router;