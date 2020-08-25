const mongoose = require('mongoose');

exports.registerStudent = (req, res) => {
    res.status(201).json({
        message: "student resgistration successful"
    })
}

exports.registerSuperuser = (req, res) => {
    res.status(201).json({
        message: "superuser resgistration successful"
    })
}