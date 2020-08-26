const express = require("express");
const router = express.Router();


const studentController = require('../controllers/student');


router.get("/all", studentController.getAllStudentProfiles)

router.get("/:id", studentController.getStudentProfileById)

router.patch("/update/:id", studentController.updateStudentProfileById);

router.delete("/delete/:id", studentController.deleteStudentProfileById);

module.exports = router;