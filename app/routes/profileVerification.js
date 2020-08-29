const express = require("express");
const router = express.Router();

const auth = require('../controllers/auth');
const verificationController = require('../controllers/profileVerification');

router.get('/all', auth.superuserAuth, verificationController.getUnverifiedProfiles);

router.post('/approve/:id', auth.superuserAuth, verificationController.approve);

router.post('/reject/:id', auth.superuserAuth, verificationController.reject);

module.exports = router