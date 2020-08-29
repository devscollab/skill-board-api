const mongoose = require('mongoose');
const Student = require("../models/student");
const { compareSync } = require('bcrypt');

exports.getStudentProfileById = (req, res) => {
    Student.find({ _id: req.params.id })
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

exports.getAllStudentProfiles = (req, res) => {
    Student.find()
        .then(docs => {
            res.status(200).json({
                message: "success",
                size: docs.length,
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

exports.updateStudentProfileById = (req, res) => {
    /*
    const id = req.params.id;
    const updateOperations = req.body;
    for (const operations in updateOperations) {
        updateOperations[operations.propName] = operations.value;
    }
    
    Student.update({ _id: id }, { $set: updateOperations })
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
    */
    try {
        findandupdate(req, res) //, id, updateOperations);
    } catch (err) {
        console.log(err);
    }
}

exports.deleteStudentProfileById = (req, res) => {
    Student.findByIdAndDelete({ _id: req.params.id })
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

exports.getStudentsByQuery = (req, res) => {
    const pageNumber = req.query.page;
    const docsLimit = req.query.limit
    const skipAmount = pageNumber * docsLimit;
    Student.find()
        .limit(10) //unable to set it dynamically, mongo error is being raised
        .skip(skipAmount)
        .then(docs => {
            res.status(200).json({
                message: "success",
                size: docs.length,
                docs: docs
            })
        }).catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            })
        })
}


async function findandupdate(req, res) {
    const id = req.params.id;
    const updateOperations = req.body;
    for (const operations in updateOperations) {
        updateOperations[operations.propName] = operations.value;
    }
    await Student.findOne({ _id: id })
        .then(doc => {
            updationKeys = Object.keys(updateOperations);
            console.log(updationKeys)
                //need some code here to fix overriding
        })
    await Student.updateOne({ _id: id }, { $set: updateOperations })
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