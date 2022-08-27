const express = require("express");
const bodyParser = require("body-parser");
const { model } = require("mongoose");

const app = express();
const { API_VERSION } = require('./config');

// Load routing
// ....

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP
// ....

module.exports = app;

