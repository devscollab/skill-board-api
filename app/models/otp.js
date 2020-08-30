const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    otp: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('OTP', OTPSchema);

//email and userid of the user is unique to the OTP. Each user will get one OTP which will be assigned to them at the time of password reset process