const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Student = require("../models/student");
const SuperUser = require("../models/superuser");

exports.loginStudent = (req, res) => {
    Student.find({ email: req.body.email })
        .then(docs => {
            if (docs.length < 1) {
                res.status(401).json({
                    message: "user not found"
                })
            } else {
                bcrypt.compare(req.body.password, docs[0].password)
                    .then(result => {
                        if (result === true) {
                            res.status(200).json({
                                message: "login successful",
                                token: "some encrypted token"
                            })
                        } else {
                            res.status(401).json({
                                message: "login failed",
                                error: "password doesnt match"
                            })
                        }
                    })
            }
        })
}

exports.loginSuperuser = (req, res) => {
    SuperUser.find({ email: req.body.email })
        .then(docs => {
            if (docs.length < 1) {
                res.status(401).json({
                    message: "user not found"
                })
            } else {
                bcrypt.compare(req.body.password, docs[0].password)
                    .then(result => {
                        if (result === true) {
                            res.status(200).json({
                                message: "login successful",
                                token: "some encrypted token"
                            })
                        } else {
                            res.status(401).json({
                                message: "login failed",
                                error: "password doesnt match"
                            })
                        }
                    })
            }
        })
}