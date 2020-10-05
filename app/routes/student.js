const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student");
const auth = require("../controllers/auth");

router.get("/all", auth.studentAuth, studentController.getAllStudentProfiles);

router.get("/sort", auth.studentAuth, studentController.getSortedListOfStudents);

router.get("/:id", auth.studentAuth, studentController.getStudentProfileById);

router.patch("/update/:id", auth.studentAuth, studentController.updateStudentProfileById);

router.delete("/delete/:id", auth.studentAuth, studentController.deleteStudentProfileById);

router.get("/", auth.studentAuth, studentController.getStudentsByQuery);

module.exports = router;