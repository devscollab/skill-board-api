const Student = require('../models/student');
const Superuser = require('../models/superuser');
const Otp = require('../models/otp');
const mongoose = require('mongoose');

function getOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

resetStudentPassword = async(req, res) => {
    let randomNumber = getOTP();
    let id = req.params.id;
    let email = "";
    await Student.findById({ _id: id })
        .then(doc => {
            email = doc.email;
        })
        .catch(err => {
            res.status(401).json({
                message: "internal server error",
                error: "err"
            })
        })

    const otp = new Otp({
        _id: new mongoose.Types.ObjectId,
        otp: randomNumber,
        email: email,
        userId: id
    });

    await otp.save()
        .then(doc => {
            res.status(200).json({
                message: "doc",
                otp: doc
            })
        })
        .catch(err => {
            res.status(401).json({
                message: "internal server error",
                error: "err"
            })
        })
}

resetSuperuserPassword = (req, res) => {
    let OTP = getOTP();
    id = req.params.id;

    res.status(200).json({
        message: "success",
        OTP: OTP
    })
}

module.exports = { resetStudentPassword, resetSuperuserPassword };