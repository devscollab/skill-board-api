const mongoose = require('mongoose');
const Student = require("../models/student");
const SuperUser = require("../models/superuser");

exports.getSuperuserById = (req, res) => {
    res.status(201).json({
        message: "sending superuser " + req.params.id
    });
}

exports.getAllSuperusers = (req, res) => {
    res.status(201).json({
        message: "sending all superusers"
    });
}

exports.updateSuperuserById = (req, res) => {
    res.status(201).json({
        message: "Updated" + req.params.id
    })
}

exports.deleteSuperuserById = (req, res) => {
    res.status(201).json({
        message: "Deleted" + req.params.id
    })
}