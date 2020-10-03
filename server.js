const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

const loginRoutes = require("./app/routes/login");
const studentRoutes = require("./app/routes/student");
const registerRoutes = require("./app/routes/register");
const superuserRoutes = require("./app/routes/superuser");
const unverifiedProfileRoutes = require("./app/routes/profileVerification");
const forgotPasswordRoutes = require("./app/routes/forgotPassword");
const searchStudent = require("./app/routes/search")

const auth = require("./app/controllers/auth"); //this auth can be used to check if token is present or not

// Only For Email Testing
// const emailTest = require('./app/routes/email_test');
const broadcast = require('./app/routes/broadcast');

const app = express();

const port = process.env.PORT || 3000;

dotenv.config();

//middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Control-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


//connection to database
const uri = process.env.DB_CONNECTION_STRING;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to database");
  }
);

// Setting render method to ejs

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"));

//routes
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/superuser", superuserRoutes);
app.use("/api/unverified", unverifiedProfileRoutes);
app.use("/api/forgotpassword", forgotPasswordRoutes);
app.use("/api/search" , searchStudent)

// Email Test Route
// app.use("/api/emailtest", emailTest);
app.use("/api/broadcast", broadcast);

// DOCS MD Rendering
app.get("/", (req, res) => {
  res.render("docs");
});


//handling bad requests
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//clean otp collection each 6 hrs
// const passwordReset = require('./app/controllers/forgotPassword');
// setInterval(passwordReset.cleanCollection, 2160000000);

//clean otp collection every 10 mins
const passwordReset = require("./app/controllers/forgotPassword");
setInterval(passwordReset.cleanCollection, 600000);

//listening to server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
