const express = require("express");
const router = express.Router();

const studentController = require('../controllers/student');
const authController = require('../controllers/auth');

router.get("/all", studentController.getAllStudentProfiles)

router.get("/:id", studentController.getStudentProfileById)

router.patch("/update/:id", studentController.updateStudentProfileById);

router.delete("/delete/:id", studentController.deleteStudentProfileById);

router.get("/", studentController.getStudentsByQuery);

module.exports = router;