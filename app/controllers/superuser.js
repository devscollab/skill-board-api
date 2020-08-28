const mongoose = require('mongoose');
const SuperUser = require("../models/superuser");

exports.getSuperuserById = (req, res) => {
    SuperUser.find({ _id: req.params.id })
        .then(doc => {
            res.status(200).json({
                message: "success",
                docs: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            })
        })
}

exports.getAllSuperusers = (req, res) => {
    SuperUser.find()
        .then(docs => {
            res.status(200).json({
                message: "success",
                docs: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            })
        })
}

exports.updateSuperuserById = (req, res) => {
    const id = req.params.id;
    const updateOperations = req.body;
    for (const operations in updateOperations) {
        updateOperations[operations.propName] = operations.value;
    }
    SuperUser.update({ _id: id }, { $set: updateOperations })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "successfully updated",
                docs: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            })
        });
}

exports.deleteSuperuserById = (req, res) => {
    SuperUser.findByIdAndDelete({ _id: req.params.id })
        .then(doc => {
            res.status(200).json({
                message: "successfully deleted",
                doc: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            })
        })
}