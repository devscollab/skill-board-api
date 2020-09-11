const express = require("express");
const router = express.Router();

const auth = require('../controllers/auth');
const verificationController = require('../controllers/profileVerification');

router.get('/all', auth.superuserAuth, verificationController.getUnverifiedProfiles);

router.get('/:id', auth.superuserAuth, verificationController.getUnverifiedProfilesById);

router.post('/approve/:id', auth.superuserAuth, verificationController.approve);

router.post('/reject/:id', auth.superuserAuth, verificationController.reject);

router.patch('/update/:id', auth.superuserAuth, verificationController.updateUnverifiedUserById);

router.delete('/delete/:id', auth.superuserAuth, verificationController.deleteUnverifiedUserById);

module.exports = router