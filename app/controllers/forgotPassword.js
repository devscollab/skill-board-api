const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const Student = require('../models/student');
const Superuser = require('../models/superuser');
const Otp = require('../models/otp');

const StudentController = require('../controllers/student');
const SuperuserController = require('../controllers/superuser');
const Email = require('../controllers/email');

function getOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

exports.resetStudentPassword = async(req, res) => {
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
        role: "student",
        email: email,
        userId: id
    });

    Email.forgot_password(email, randomNumber);
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

exports.resetSuperuserPassword = async(req, res) => {
    let randomNumber = getOTP();
    let id = req.params.id;
    let email = "";
    await Superuser.findById({ _id: id })
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
        role: "superuser",
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

exports.verifyOTP = async(req, res) => {
    await Otp.findOne({ otp: req.body.OTP })
        .then(doc => {
            const token = jwt.sign({
                id: doc.userId,
                role: doc.role,
                task: "forgot password"
            }, process.env.JWT_KEY, {
                expiresIn: '10h'
            })

            res.status(200).json({
                message: "use this token for sending updated password",
                token: token
            })

        })
        .catch(err => {
            res.status(401).json({
                message: "internal server error",
                error: err
            })
        })
    await Otp.findOneAndDelete({ otp: req.body.OTP })
        .catch(err => {
            res.status(401).json({
                message: "internal server error",
                error: err
            })
        })
}