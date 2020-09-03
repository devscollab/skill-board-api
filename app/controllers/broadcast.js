const mongoose = require("mongoose");

const SuperUser = require("../models/superuser");
const Student = require("../models/student");
const Profiles = require("../models/unverifiedProfiles");

const email = require("../controllers/email");

exports.broadcastAll = async (req, res) => {
  let mailList = [];
  console.log(req.body.subject);
  console.log(req.body.message);

  try {
    const superuser = await SuperUser.find().select({ email: 1 });
    const profiles = await Profiles.find().select({ email: 1 });
    const student = await Student.find().select({ email: 1 });

    for (i = 0; i < superuser.length; i++) {
      mailList.push(superuser[i].email);
    }
    for (i = 0; i < profiles.length; i++) {
      mailList.push(profiles[i].email);
    }
    for (i = 0; i < student.length; i++) {
      mailList.push(student[i].email);
    }

    for(i=0;i<mailList.length;i++){
        // const broadcast = (mailto, textmsg, subject ,html)
        await email.broadcast(mailList[i],req.body.message,req.body.subject,`${req.body.html}`)
      }

    res.status(200).json({
        message: "success",
        size: mailList.length,
        docs: mailList,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "internal server error",
      error: err,
    });
  }
};

exports.broadcastProfiles = async (req, res) => {
    let mailList = [];
  
    try {
      const profiles = await Profiles.find().select({ email: 1 });

      for (i = 0; i < profiles.length; i++) {
        mailList.push(profiles[i].email);
      }
  
      for(i=0;i<mailList.length;i++){
        // const broadcast = (mailto, textmsg, subject ,html)
        await email.broadcast(mailList[i],req.body.message,req.body.subject,`${req.body.html}`)
      }
  
      res.status(200).json({
          message: "success",
          size: mailList.length,
          docs: mailList,
        });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "internal server error",
        error: err,
      });
    }
  };

exports.broadcastStudents = async (req, res) => {
    let mailList = [];
    console.log(req.body.subject);
    console.log(req.body.message);
  
    try {
      const student = await Student.find().select({ email: 1 });

      for (i = 0; i < student.length; i++) {
        mailList.push(student[i].email);
      }
  
      for(i=0;i<mailList.length;i++){
        // const broadcast = (mailto, textmsg, subject ,html)
        await email.broadcast(mailList[i],req.body.message,req.body.subject,`${req.body.html}`)
      }
  
      res.status(200).json({
          message: "success",
          size: mailList.length,
          docs: mailList,
        });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "internal server error",
        error: err,
      });
    }
  };

exports.broadcastSuperUser = async (req, res) => {
    let mailList = [];
    console.log(req.body.subject);
    console.log(req.body.message);
  
    try {
      const superuser = await SuperUser.find().select({ email: 1 });

  
      for (i = 0; i < superuser.length; i++) {
        mailList.push(superuser[i].email);
      }
 
      for(i=0;i<mailList.length;i++){
        // const broadcast = (mailto, textmsg, subject ,html)
        await email.broadcast(mailList[i],req.body.message,req.body.subject,`${req.body.html}`)
      }
  
      res.status(200).json({
          message: "success",
          size: mailList.length,
          docs: mailList,
        });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "internal server error",
        error: err,
      });
    }
  };