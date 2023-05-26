const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { model } = require("mongoose");

const app = express();
const { API_VERSION } = require('./config');

// Load routing
const userRoutes = require('./routers/user');
const authRoutes = require("./routers/auth");

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static("uploads"));

// Configure Header HTTP - CORS
app.use(cors());

//Route Basic
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, authRoutes);


module.exports = app;

