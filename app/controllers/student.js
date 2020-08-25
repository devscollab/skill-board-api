const mongoose = require('mongoose');

exports.getStudentProfileById = (req, res) => {
    res.status(201).json({
        message: "sending profile " + req.params.id
    });
}

exports.getAllStudentProfiles = (req, res) => {
    res.status(201).json({
        message: "sending all profiles"
    });
}

exports.updateStudentProfileById = (req, res) => {
    res.status(201).json({
        message: "Updated" + req.params.id
    })
}

exports.deleteStudentProfileById = (req, res) => {
    res.status(201).json({
        message: "Deleted" + req.params.id
    })
}