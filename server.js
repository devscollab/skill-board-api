const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const loginRoutes = require('./app/routes/login')
const studentRoutes = require('./app/routes/student')
const registerRoutes = require('./app/routes/register')
const superuserRoutes = require('./app/routes/superuser')
const unverifiedProfileRoutes = require('./app/routes/profileVerification')
const forgotPasswordRoutes = require('./app/routes/forgotPassword');

const auth = require('./app/controllers/auth') //this auth can be used to check if token is present or not

const app = express();

dotenv.config();

//middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        "Origin, X-Requested-with, Control-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// In case Atlas Doesnt Work -> uncomment it
// mongoose.connect('mongodb://localhost/Skill',
//     { useNewUrlParser: true, useUnifiedTopology: true }
// );


//connection to database
const uri = process.env.DB_CONNECTION_STRING;
mongoose.connect(
    uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("connected to database");
    })

//routes
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/superuser", superuserRoutes);
app.use("/api/unverified", unverifiedProfileRoutes);
app.use("/api/forgotpassword", forgotPasswordRoutes);

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
            message: error.message
        }
    });
});

//listening to server
app.listen(3000, () => {
    console.log("server running on port 3000");
})