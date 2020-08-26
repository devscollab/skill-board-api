const mongoose = require('mongoose');
const Student = require("../models/student");
const SuperUser = require("../models/superuser");

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