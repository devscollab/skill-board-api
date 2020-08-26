const express = require("express");
const router = express.Router();


const registerController = require('../controllers/register');

router.post("/student", registerController.registerStudent);

router.post("/superuser", registerController.registerSuperuser);

module.exports = router;