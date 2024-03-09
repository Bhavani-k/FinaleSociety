const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectWithDb = require("./configs/db");
const cookieParser = require("cookie-parser");

const app = express();
connectWithDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const user = require("./routes/user");
const society = require("./routes/society");
const family = require("./routes/family");

app.use("/api/v1", user);
app.use("/api/v1", society);
app.use("/api/v1", family);

module.exports = app;
