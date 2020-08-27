const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");

router.post("/student", loginController.loginStudent);

router.post("/superuser", loginController.loginSuperuser);

module.exports = router;