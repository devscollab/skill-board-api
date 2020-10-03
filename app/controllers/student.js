const mongoose = require("mongoose");
const Student = require("../models/student");
const { compareSync } = require("bcrypt");
const bcrypt = require("bcrypt");

exports.getStudentProfileById = (req, res) => {
  Student.findOne({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "success",
        docs: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "internal server error",
        error: err,
      });
    });
};

exports.getAllStudentProfiles = (req, res) => {
  Student.find()
    .select(
      "email personal social rating skills metaData.github_metadata_object"
    )
    .then((docs) => {
      console.log(docs);
      res.status(200).json({
        message: "success",
        size: docs.length,
        docs: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "internal server error",
        error: err,
      });
    });
};

exports.updateStudentProfileById = (req, res) => {
  const id = req.params.id;
  const updateOperations = req.body;
  for (const operations in updateOperations) {
    updateOperations[operations.propName] = operations.value;
  }

  Student.update({ _id: id }, { $set: updateOperations })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "successfully updated",
        docs: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "internal server error",
        error: err,
      });
    });
};

exports.deleteStudentProfileById = (req, res) => {
  Student.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "successfully deleted",
        doc: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "internal server error",
        error: err,
      });
    });
};

exports.getStudentsByQuery = (req, res) => {
  const pageNumber = req.query.page;
  const docsLimit = req.query.limit;
  const skipAmount = pageNumber * docsLimit;
  Student.find()
    .limit(10) //unable to set it dynamically, mongo error is being raised
    .skip(skipAmount)
    .then((docs) => {
      res.status(200).json({
        message: "success",
        size: docs.length,
        docs: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "internal server error",
        error: err,
      });
    });
};

exports.updatePassword = async (req, res) => {
  const password = req.body.password;
  await bcrypt.hash(password, 10, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "some error occured while storing credentials",
        error: err,
      });
    }
    if (result) {
      const id = req.params.id;
      Student.updateOne({ _id: id }, { $set: { password: result } })
        .exec()
        .then((doc) => {
          res.status(200).json({
            message: "successfully password updated",
            docs: doc,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "internal server error",
            error: err,
          });
        });
    }
  });
};

exports.getSortedListOfStudents = (req, res) => {
  const { prop1, prop2, prop3 } = req.query;
  const sortParameterMap = new Map();
  if (req.query.prop1) {
    prop1 && sortParameterMap.set(prop1, "asc");
    prop2 && sortParameterMap.set(prop2, "asc");
    prop3 && sortParameterMap.set(prop3, "asc");
  } else {
    sortParameterMap.set("rating", "asc");
  }
  Student.find()
    .sort(Object.fromEntries(sortParameterMap))
    .exec()
    .then((docs) => {
      res.status(200).json({
        message: "success",
        size: docs.length,
        docs: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "internal server error",
        error: err,
      });
    });
};
