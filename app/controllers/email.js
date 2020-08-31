"use strict";
const fs = require("fs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const successful_registration = (mailto) => {
    let msg =
        "Congratulations, Your Registration is Successful, You can proceed to login now";
    main(mailto, msg).catch(console.error);
};

const application_approved = (mailto) => {
    let msg = "Congratulations, Your Application is Approved ";
    main(mailto, msg).catch(console.error);
};

const application_rejected = (mailto) => {
    let msg =
        "Sorry Your Application is Rejected, Please Try to apply again or contact our support ";
    main(mailto, msg).catch(console.error);
};

const forgot_password = (mailto, OTP) => {
    let msg =
        "Your Request for password has been recieved,Here is Your OTP\n" + OTP;
    console.log(msg);
    main(mailto, msg).catch(console.error);
};

async function main(mailto, messageto) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASS, // generated ethereal password
        },
    });

    console.log(path.join(__dirname, "../views/test.ejs"));

    ejs.renderFile(path.join(__dirname, "../views/test.ejs"), function(err, data) {
        if (err) {
            console.log(err);
        } else {
            let mailOptions = {
                from: '"SkillBoard devs team, PCCOE" <skillboard.opensource@gmail.com>', // sender address
                to: mailto, // list of receivers
                subject: "Service Email", // Subject line
                text: messageto, // plain text body
                html: data,
            };
            console.log("Sending ,mail ======================>");
            transporter.sendMail(mailOptions, function(err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Message sent: " + info.response);
                }
            });
        }
    });
}

module.exports = {
    successful_registration,
    application_approved,
    application_rejected,
    forgot_password,
    main,
};