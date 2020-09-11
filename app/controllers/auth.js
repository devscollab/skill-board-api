const jwt = require('jsonwebtoken');

const Otp = require('../models/otp');

exports.studentAuth = (req, res, next) => {
    const payload = req.headers.authorization;
    if (payload) {
        try {
            const token = payload.split(' ')[1];
            jwt.verify(token, process.env.JWT_KEY, (err, verified) => {
                if (err) {
                    res.status(401).json({
                        message: "Auth failed",
                        error: "token expired"
                    })
                } else {
                    const decoded = jwt.decode(token);
                    if (decoded.role === "student" || decoded.role === "superuser") {
                        next()
                    } else {
                        res.status(401).json({
                            message: "Auth failed",
                            error: "cannot grant access to the resource"
                        })
                    }
                }
            })
        } catch (err) {
            res.status(401).json({
                message: "Auth failed",
                error: "token was tampered"
            })
        }


    } else {
        res.status(401).json({
            message: "Auth failed",
            error: "token not found"
        })
    }
}

exports.superuserAuth = (req, res, next) => {
    const payload = req.headers.authorization;
    if (payload) {
        try {
            const token = payload.split(' ')[1];
            jwt.verify(token, process.env.JWT_KEY, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: "Auth failed",
                        error: "token expired"
                    })
                } else {
                    const decoded = jwt.decode(token);
                    if (decoded.role === "superuser") {
                        next()
                    } else {
                        res.status(401).json({
                            message: "Auth failed",
                            error: "cannot grant access to the resource"
                        })
                    }
                }
            })
        } catch (err) {
            res.status(401).json({
                message: "Auth failed",
                error: "token was tampered"
            })
        }

    } else {
        res.status(401).json({
            message: "Auth failed",
            error: "token not found"
        })
    }
}

exports.forgotPasswordAuth = (req, res, next) => {
    const payload = req.headers.authorization;
    if (payload) {
        try {
            const token = payload.split(' ')[1];
            jwt.verify(token, process.env.JWT_KEY, (err, result) => {
                if (err) {
                    Otp.findOneAndDelete({ otp: req.body.OTP })
                    res.status(401).json({
                        message: "Auth failed",
                        error: "token expired"
                    })
                } else {
                    const decoded = jwt.decode(token);
                    if ((decoded.role === "student" || decoded.role === "superuser" || decoded.role === "unverifiedProfile") && decoded.task === "forgot password") {
                        next()
                    } else {
                        res.status(401).json({
                            message: "Auth failed",
                            error: "cannot grant access to the resource"
                        })
                    }
                }
            })
        } catch (err) {
            res.status(401).json({
                message: "Auth failed",
                error: "token was tampered"
            })
        }

    } else {
        res.status(401).json({
            message: "Auth failed",
            error: "token not found"
        })
    }
}