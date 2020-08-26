const mongoose = require("mongoose");
const Student = require("../models/student");
const SuperUser = require("../models/superuser");

exports.registerStudent = (req, res) => {
  console.log(req.file);
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    Login: {
      email: req.body.Login.email,
      password: req.body.Login.password,
    },
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
  console.log("Student");
  student.save()
    .then(doc => {
      res.status(200).json({doc :doc,
        message:"Student resgistration successful"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.registerSuperuser = (req, res) => {
    console.log(req.body);
    const superuser = new SuperUser({
        _id: new mongoose.Types.ObjectId(),
        Login: {
          email: req.body.Login.email,
          password: req.body.Login.password,
        },
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
  console.log("SuperUser");
  superuser.save()
        .then(doc => {
          res.status(200).json({doc :doc,
            message:"superuser resgistration successful"
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });

};
