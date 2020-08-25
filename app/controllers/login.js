const mongoose = require('mongoose');

exports.loginStudent = (req, res) => {
    res.status(201).json({
        message: "student login successful"
    })
}

exports.loginSuperuser = (req, res) => {
    res.status(201).json({
        message: "superuser login successful"
    })
}