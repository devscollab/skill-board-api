const UnverifiedProfiles = require('../models/unverifiedProfiles');
const Student = require('../models/student');

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

exports.approve = (req, res) => {
    UnverifiedProfiles.find({ _id: req.params.id })
        .then(doc => {
            const student = new Student({
                _id: doc[0]._id,
                email: doc[0].email,
                password: doc[0].password,
                Personal: {
                    name: doc[0].Personal.name,
                    college: doc[0].Personal.college,
                    department: doc[0].Personal.department,
                    year: doc[0].Personal.year,
                    division: doc[0].Personal.division,
                    rollno: doc[0].Personal.rollno,
                },
                Social: {
                    phone: doc[0].Social.phone,
                    linkedin: doc[0].Social.linkedin,
                    github: doc[0].Social.github,
                    personalwebsite: doc[0].Social.personalwebsite,
                    resume: doc[0].Social.resume,
                    iswhatsaap: doc[0].Social.iswhatsaap,
                },
                Skills: {
                    skill: doc[0].Skills.skill,
                    projectsforskills: doc[0].Skills.projectsforskills,
                    topskill: doc[0].Skills.topskill,
                    cgpa: doc[0].Skills.cgpa,
                },
                Optionals: {
                    introduction: doc[0].Optionals.introduction,
                    gender: doc[0].Optionals.gender,
                    age: doc[0].Optionals.age,
                    mother_tongue: doc[0].Optionals.mother_tongue,
                    languages_known: doc[0].Optionals.languages_known,
                },
                MetaData: {
                    hasAdminAccess: doc[0].MetaData.hasAdminAccess,
                    github_metadata_object: doc[0].MetaData.github_metadata_object,
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