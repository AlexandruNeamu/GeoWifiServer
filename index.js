const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const homeRoute = require("./routes/home");
const wifiDataRoute = require("./routes/wifiData");
// const authRoute = require('./routes/auth');
// const forgotPasswd = require('./routes/forgotPassword');
// const dashboardRoute = require('./routes/dashboard');

// environment config
dotenv.config();

// connect to DB
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log("connected to db!");
});

// middleware
app.use(express.json());
app.use(cors());

// Route Middlewares
app.use("/", homeRoute);
app.use("/wifiData", wifiDataRoute);
// app.use('/auth', authRoute);
// app.use('/forgotPassword', forgotPasswd);
// app.use('/dashboard', dashboardRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server up and running!");
});
