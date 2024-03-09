const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Types } = mongoose;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Usernames must be unique"],
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Please provide valid email id"],
  },
  password: {
    type: String,
    minlength: [6, "Passwords must conatins atlest 6 characters"],
    required: [true, "Please provide password"],
  },
  role: {
    type: String,
    enum: ["admin", "checker", "family"],
    default: "admin",
    required: true,
  },
  society: {
    type: mongoose.Schema.ObjectId,
    ref: "Society",
    default: null,
  },
});
// Set default username to be the same as the email
userSchema.pre("save", function (next) {
  if (!this.username) {
    this.username = this.email;
  }
  next();
});
// encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// validate the password with the user sent password
userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

//create and return JWT Tokens
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = mongoose.model("User", userSchema);
