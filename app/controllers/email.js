"use strict";
const nodemailer = require("nodemailer");

const successful_registration = (mailto) => {
    let msg = "Congratulations, Your Registration is Successful, You can proceed to login now"
    main(mailto, msg).catch(console.error);
}

const application_approved = (mailto) => {
    let msg = "Congratulations, Your Application is Approved "
    main(mailto, msg).catch(console.error);
}

const application_rejected = (mailto) => {
    let msg = "Sorry Your Application is Rejected, Please Try to apply again or contact our support "
    main(mailto, msg).catch(console.error);
}

const forgot_password = (mailto) => {
    let msg = "Your Request for password has been recieved,Here is Your Secret Login Code"
    main(mailto, msg).catch(console.error);
}

async function main(mailto, messageto) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASS, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"SkillBoard devs team, PCCOE" <skillboard.opensource@gmail.com>', // sender address
        to: mailto, // list of receivers
        subject: "Registration Email", // Subject line
        text: messageto, // plain text body
        html: messageto, // html body
    });

    console.log("Message sent: %s", info.messageId);
}


module.exports = { successful_registration, application_approved, application_rejected, forgot_password, main }