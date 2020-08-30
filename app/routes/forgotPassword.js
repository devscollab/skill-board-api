const express = require('express');
const router = express.Router();

const forgotPasswordController = require('../controllers/forgotPassword');

router.get('/student/:id', forgotPasswordController.resetStudentPassword);

router.get('/superuser/:id', forgotPasswordController.resetSuperuserPassword);

module.exports = router;