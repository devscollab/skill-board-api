const express = require("express");
const router = express.Router();

const searchController = require('../controllers/search');
const auth = require('../controllers/auth');

router.get("/name",auth.studentAuth, searchController.searchStudentByName )

router.get("/skills",auth.studentAuth, searchController.searchStudentBySkills)

module.exports = router;