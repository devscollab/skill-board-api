const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const email = require('./email');

const SuperUser = require("../models/superuser");
const Profile = require("../models/unverifiedProfiles");

exports.registerStudent = async(req, res) => {
    //find if the email already exists, return failure response else register successfully
    await Profile.findOne({ email: req.body.email })
        .select('email')
        .then(doc => {
            if (doc != null) {
                res.status(401).json({
                    message: "an account with this email already exists. please try registering with another email or proceed to login"
                })
            } else {
                //hash the password
                const password = req.body.password;
                bcrypt.hash(password, 10, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: "some error occured while storing credentials",
                            error: err
                        })
                    }
                    if (result) {
                        //create new document
                        const newProfile = new Profile({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: result,
                            Personal: {
                                name: req.body.Personal.name,
                                college: req.body.Personal.college,
                                department: req.body.Personal.department,
                                year: req.body.Personal.year,
                                division: req.body.Personal.division,
                                rollno: req.body.Personal.rollno,
                            },
                            Social: {
                                phone: req.body.Social.phone,
                                linkedin: req.body.Social.linkedin,
                                github: req.body.Social.github,
                                personalwebsite: req.body.Social.personalwebsite,
                                resume: req.body.Social.resume,
                                iswhatsaap: req.body.Social.iswhatsaap,
                            },
                            Skills: {
                                skill: req.body.Skills.skill,
                                projectsforskills: req.body.Skills.projectsforskills,
                                topskill: req.body.Skills.topskill,
                                cgpa: req.body.Skills.cgpa,
                            },
                            Optionals: {
                                introduction: req.body.Optionals.introduction,
                                gender: req.body.Optionals.gender,
                                age: req.body.Optionals.age,
                                mother_tongue: req.body.Optionals.mother_tongue,
                                languages_known: req.body.Optionals.languages_known,
                            },
                            MetaData: {
                                hasAdminAccess: req.body.MetaData.hasAdminAccess,
                                github_metadata_object: req.body.MetaData.github_metadata_object,
                            },
                        });
                        //save the document to the database
                        newProfile.save()
                            .then(doc => {
                                email.successful_registration(req.body.email);
                                console.log(doc);
                                res.status(200).json({
                                    message: "Student resgistration successful",
                                    doc: doc,
                                });

                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    message: "some error occured while storing user",
                                    error: err,
                                });
                            });
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "some error occured while storing user",
                error: err,
            });
        })
};

exports.registerSuperuser = async(req, res) => {
    //find if the email already exists, return failure response else register successfully
    await SuperUser.findOne({ email: req.body.email })
        .select('email')
        .then(doc => {
            if (doc != null) {
                res.status(401).json({
                    message: "an account with this email already exists. please try registering with another email or proceed to login"
                })
            } else {
                //hash the password
                const password = req.body.password;
                bcrypt.hash(password, 10, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: "some error occued while storing user credentials",
                            error: err
                        })
                    }
                    if (result) {
                        //create new document
                        const superuser = new SuperUser({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: result,
                            Personal: {
                                name: req.body.Personal.name,
                            },
                            Social: {
                                phone: req.body.Social.phone,
                                linkedin: req.body.Social.linkedin,
                                github: req.body.Social.github,
                            },
                            Optionals: {
                                introduction: req.body.Optionals.introduction,
                                gender: req.body.Optionals.gender,
                                age: req.body.Optionals.age,
                                mother_tongue: req.body.Optionals.mother_tongue,
                                languages_known: req.body.Optionals.languages_known,
                            },
                            MetaData: {
                                hasAdminAccess: req.body.MetaData.hasAdminAccess,
                                github_metadata_object: req.body.MetaData.github_metadata_object,
                            },
                        });
                        //save the document to the database
                        superuser.save()
                            .then(doc => {
                                email.successful_registration(req.body.email);
                                res.status(200).json({
                                    message: "superuser resgistration successful",
                                    doc: doc
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: "some error occured while storing the data to the database",
                                    error: err
                                });
                            });
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "some error occured while storing the data to the database",
                error: err
            });
        })
};