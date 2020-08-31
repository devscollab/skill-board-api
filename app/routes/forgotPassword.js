const express = require('express');
const router = express.Router();

const forgotPasswordController = require('../controllers/forgotPassword');
const Student = require('../controllers/student');
const Superuser = require('../controllers/superuser');
const Auth = require('../controllers/auth');

router.get('/student/:id', forgotPasswordController.resetStudentPassword);

router.get('/superuser/:id', forgotPasswordController.resetSuperuserPassword);

router.post('/verify', forgotPasswordController.verifyOTP);

router.post('/update/student/:id', Auth.forgotPasswordAuth, Student.updatePassword);

router.post('/update/superuser/:id', Auth.forgotPasswordAuth, Superuser.updateSuperuserById);

module.exports = router;