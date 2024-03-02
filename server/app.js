const express = require("express");
const dotenv = require("dotenv").config();
const connectWithDb = require("./configs/db");

const app = express();

connectWithDb();

module.exports = app;
