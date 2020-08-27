const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
                            const token = jwt.sign({
                                    id: "some id", //Add parameter here which we want to send in token
                                    role: "student"
                                },
                                process.env.JWT_KEY, //This needs to be change
                                {
                                    expiresIn: '10h'
                                })
                            res.status(200).json({
                                message: "login successful",
                                token: token //token added
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
                            const token = jwt.sign({
                                    id: "some id", //Add parameter here which we want to send in token
                                    role: "superuser"
                                },
                                process.env.JWT_KEY, //This needs to be change
                                {
                                    expiresIn: '10h'
                                })
                            res.status(200).json({
                                message: "login successful",
                                token: token
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