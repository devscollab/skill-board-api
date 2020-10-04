const mongoose = require("mongoose");
const Student = require("../models/student");

exports.searchStudentByName = (req, res) => {
    const searchedName = req.query.name
    Student.find({"personal.name" : {$regex : searchedName ,$options : '$i'}})
        .then(data => {
            console.log(data);
            res.send(data)
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            })
        })
}

exports.searchStudentBySkills = (req,res) => {
    const searchedSkill = req.query.skill
    Student.find({"skills.skill" : {$regex : searchedSkill ,$options : '$i'}})
        .then(data => {
            console.log(data);
            res.send(data)
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            })
        })
}