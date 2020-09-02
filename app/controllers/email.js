"use strict";
const fs = require("fs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const skillboardtemp = "skillboard_template.ejs";

const successful_registration = (mailto) => {
  let msg ="Congratulations, Your Registration is Successful, You can proceed to login now";
  let subject = "Successful Registration"
  main(mailto, msg, skillboardtemp,subject).catch(console.error);
};

const application_approved = (mailto) => {
  let msg = "Congratulations, Your Application is Approved ";
  let subject = "Application Approved"
  main(mailto, msg, skillboardtemp,subject).catch(console.error);
};

const application_rejected = (mailto) => {
  let msg ="Sorry Your Application is Rejected, Please Try to apply again or contact our support ";
  let subject = "Application Rejected"
  main(mailto, msg, skillboardtemp,subject).catch(console.error);
};

const forgot_password = (mailto, OTP) => {
  // OTP TEST LOGIC
  if (!OTP) {
    OTP = 3000;
  }
  // OTP TEST LOGIC NOT FOR PRODUCTION

  let msg ="Your Request for password has been recieved,Here is Your OTP\n" + OTP;
  let subject = "PASSWORD RESET"
  main(mailto, msg, skillboardtemp,subject).catch(console.error);
};

const promotional = (mailto) => {
  let msg = "You are invited to the launch of a new project by Devscollab ";
  let subject = "We invite you to launch of our new product"
  main(mailto, msg, skillboardtemp,subject).catch(console.error);
};

async function main(mailto, message, template, subject) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  console.log(path.join(__dirname, `../views/${template}`));

  ejs.renderFile(
    path.join(__dirname, `../views/${template}`), {
    message: message
  },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        let mailOptions = {
          from: '"SkillBoard devs team, PCCOE" <skillboard.opensource@gmail.com>', // sender address
          to: mailto, // list of receivers
          subject: subject, // Subject line
          text: message, // plain text body
          html: data,
        };
        console.log("Sending ,mail ======================>");
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Message sent: " + info.response);
          }
        });
      }
    }
  );
}

module.exports = {
  successful_registration,
  application_approved,
  application_rejected,
  forgot_password,
  promotional,
  main,
};