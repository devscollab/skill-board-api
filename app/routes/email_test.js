const express = require("express");
const router = express.Router();

const emailTest = require("../controllers/email");

// email = "Enter YOUR EMAIL";

router.get("/approve", async (req, res) => {
  emailTest.successful_registration(email);
  res.status(200);
  res.end();
});

router.get("/reject", async (req, res) => {
  emailTest.application_approved(email);
  res.status(200);
  res.end();

});

router.get("/register", async (req, res) => {
  emailTest.application_rejected(email);
  res.status(200);
  res.end();

});

router.get("/password", async (req, res) => {
  emailTest.forgot_password(email);
  res.status(200);
  res.end();

});

router.get("/promo", async (req, res) => {
  emailTest.promotional(email);
  res.status(200);
  res.end();

});


module.exports = router;
