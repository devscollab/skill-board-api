const bcrypt = require('bcrypt');

const UnverifiedProfiles = require('../models/unverifiedProfiles');
const Student = require('../models/student');
const SuperUser = require('../models/superuser');

const email = require('../controllers/email');

exports.getUnverifiedProfiles = (req, res) => {
    UnverifiedProfiles.find()
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

exports.getUnverifiedProfilesById = (req, res) => {
    UnverifiedProfiles.findOne({ _id: req.params.id })
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

exports.approve = (req, res) => {
    UnverifiedProfiles.find({ _id: req.params.id })
        .then(doc => {
            const student = new Student({
                _id: doc[0]._id,
                email: doc[0].email,
                password: doc[0].password,
                personal: {
                    name: doc[0].personal.name,
                    college: doc[0].personal.college,
                    department: doc[0].personal.department,
                    year: doc[0].personal.year,
                    division: doc[0].personal.division,
                    rollno: doc[0].personal.rollno,
                },
                social: {
                    phone: doc[0].social.phone,
                    linkedin: doc[0].social.linkedin,
                    github: doc[0].social.github,
                    personalwebsite: doc[0].social.personalwebsite,
                    resume: doc[0].social.resume,
                    iswhatsapp: doc[0].social.iswhatsapp,
                },
                skills: {
                    skill: doc[0].skills.skill,
                    projectsforskills: doc[0].skills.projectsforskills,
                    primaryskill: doc[0].skills.primaryskill,
                    secondaryskill: doc[0].skills.secondaryskill,
                    cgpa: doc[0].skills.cgpa,
                },
                rating: doc[0].rating,
                optionals: {
                    introduction: doc[0].optionals.introduction,
                    gender: doc[0].optionals.gender,
                    age: doc[0].optionals.age,
                    mother_tongue: doc[0].optionals.mother_tongue,
                    languages_known: doc[0].optionals.languages_known,
                    pronoun: doc[0].optionals.pronoun
                },
                metaData: {
                    hasAdminAccess: doc[0].metaData.hasAdminAccess,
                    github_metadata_object: doc[0].metaData.github_metadata_object,
                },
            });
            student.save()
                .then(doc => {
                    UnverifiedProfiles.findByIdAndDelete({ _id: req.params.id })
                        .then(doc => {
                            //send approval email before sending response to the user by id defined in the request parameters
                            email.application_approved(doc.email);
                            res.status(200).json({
                                message: "success! profile is approved. Approval notification is delivered to the user",
                                doc: doc
                            })
                        })
                })

        }).catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            })
        })
}

exports.reject = (req, res) => {
    //send rejection email before sending response to the user by id defined in the request parameters
    UnverifiedProfiles.findById({ _id: req.params.id })
        .then(doc => {
            email.application_rejected(doc.email);
            res.status(200).json({
                message: "success! profile is rejected. Rejection notification is sent to the user"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            })
        })
}

exports.deleteUnverifiedUserById = (req, res) => {
    UnverifiedProfiles.findByIdAndDelete({ _id: req.params.id })
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

exports.updateUnverifiedUserById = (req, res) => {
    const id = req.params.id;
    const updateOperations = req.body;
    for (const operations in updateOperations) {
        updateOperations[operations.propName] = operations.value;
    }

    UnverifiedProfiles.update({ _id: id }, { $set: updateOperations })
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

exports.updatePassword = async(req, res) => {
    const password = req.body.password;
    await bcrypt.hash(password, 10, (err, result) => {
        if (err) {
            res.status(500).json({
                message: "some error occured while storing credentials",
                error: err
            })
        }
        if (result) {
            const id = req.params.id;
            UnverifiedProfiles.updateOne({ _id: id }, { $set: { password: result } })
                .exec()
                .then(doc => {
                    res.status(200).json({
                        message: "successfully password updated",
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
    })
}