const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Student = require("../models/student");
const SuperUser = require("../models/superuser");
const UnverfiedUser = require('../models/unverifiedProfiles');

exports.loginStudent = async(req, res) => {
    await UnverfiedUser.find({ email: req.body.email })
        .then(doc => {
            if (doc.length > 0) {
                //user found in unverified profiles
                console.log("found user in unverified profiles")
                bcrypt.compare(req.body.password, doc[0].password)
                    .then(result => {
                        if (result === true) {
                            const token = jwt.sign({
                                    email: req.body.email,
                                    role: "student",
                                    status: "profile pending"
                                },
                                process.env.JWT_KEY, {
                                    expiresIn: '10h'
                                })
                            res.status(200).json({
                                message: "login successful",
                                token: token,
                                role: "unverified"
                            })
                        } else {
                            res.status(401).json({
                                message: "login failed",
                                error: "password doesnt match"
                            })
                        }
                    })
            } else {
                Student.find({ email: req.body.email })
                    .then(document => {
                        if (document.length > 0) {
                            //user found in verified profiles
                            bcrypt.compare(req.body.password, document[0].password)
                                .then(result => {
                                    if (result === true) {
                                        const token = jwt.sign({
                                                email: req.body.email,
                                                role: "student",
                                                status: "verified profile"
                                            },
                                            process.env.JWT_KEY, {
                                                expiresIn: '10h'
                                            })
                                        res.status(200).json({
                                            message: "login successful",
                                            token: token,
                                            role: "student"
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
                    .catch(err => {
                        throw new Error(err);
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            })
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
                                    email: req.body.email,
                                    role: "superuser"
                                },
                                process.env.JWT_KEY, {
                                    expiresIn: '10h'
                                })
                            res.status(200).json({
                                message: "login successful",
                                token: token,
                                role: "superuser"
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