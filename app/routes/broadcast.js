const express = require("express");
const router = express.Router();

const broadcastController = require("../controllers/broadcast");
const auth = require('../controllers/auth');

router.post('/all', auth.superuserAuth, broadcastController.broadcastAll)

router.post('/unverified', auth.superuserAuth, broadcastController.broadcastProfiles);

router.post("/students", auth.superuserAuth, broadcastController.broadcastStudents);

router.post("/superuser", auth.superuserAuth, broadcastController.broadcastSuperUser);

module.exports = router;