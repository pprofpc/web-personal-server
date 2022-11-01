const express = require("express");
const bodyParser = require("body-parser");
const { model } = require("mongoose");

const app = express();
const { API_VERSION } = require('./config');

// Load routing
const userRoutes = require('./routers/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static("uploads"));

// Configure Header HTTP
// ....

//Route Basic
app.use(`/api/${API_VERSION}`, userRoutes);


module.exports = app;

