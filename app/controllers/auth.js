const jwt = require('jsonwebtoken');

exports.studentAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.decode(token.split(' ')[1]);
            if (decoded.role === "student") {
                next()
            } else {
                res.status(401).json({
                    message: "Auth failed",
                    error: "cannot grant access to the resource"
                })
            }
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
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.decode(token.split(' ')[1]);
            if (decoded.role === "superuser") {
                next()
            } else {
                res.status(401).json({
                    message: "Auth failed",
                    error: "cannot grant access to the resource"
                })
            }
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