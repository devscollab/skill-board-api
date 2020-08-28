const express = require("express");
const router = express.Router();

const verificationController = require('../controllers/profileVerification');

router.get('/all', verificationController.getUnverifiedProfiles);

router.post('/approve/:id', verificationController.approve);

router.post('/reject/:id', verificationController.reject);

module.exports = router