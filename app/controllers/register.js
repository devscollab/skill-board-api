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
                            personal: {
                                name: req.body.personal.name,
                                college: req.body.personal.college,
                                department: req.body.personal.department,
                                year: req.body.personal.year,
                                division: req.body.personal.division,
                                rollno: req.body.personal.rollno,
                            },
                            social: {
                                phone: req.body.social.phone,
                                linkedin: req.body.social.linkedin,
                                github: req.body.social.github,
                                personalwebsite: req.body.social.personalwebsite,
                                resume: req.body.social.resume,
                                iswhatsapp: req.body.social.iswhatsapp,
                            },
                            skills: {
                                skill: req.body.skills.skill,
                                projectsforskills: req.body.skills.projectsforskills,
                                primaryskill: req.body.skills.primaryskill,
                                secondaryskill: req.body.skills.secondaryskill,
                                cgpa: req.body.skills.cgpa,
                            },
                            rating: req.body.rating,
                            optionals: {
                                introduction: req.body.optionals.introduction,
                                gender: req.body.optionals.gender,
                                age: req.body.optionals.age,
                                mother_tongue: req.body.optionals.mother_tongue,
                                languages_known: req.body.optionals.languages_known,
                            },
                            metaData: {
                                hasAdminAccess: req.body.metaData.hasAdminAccess,
                                github_metadata_object: req.body.metaData.github_metadata_object,
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
                            personal: {
                                name: req.body.personal.name,
                            },
                            social: {
                                phone: req.body.social.phone,
                                linkedin: req.body.social.linkedin,
                                github: req.body.social.github,
                            },
                            optionals: {
                                introduction: req.body.optionals.introduction,
                                gender: req.body.optionals.gender,
                                age: req.body.optionals.age,
                                mother_tongue: req.body.optionals.mother_tongue,
                                languages_known: req.body.optionals.languages_known,
                            },
                            metaData: {
                                hasAdminAccess: req.body.metaData.hasAdminAccess,
                                github_metadata_object: req.body.metaData.github_metadata_object,
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