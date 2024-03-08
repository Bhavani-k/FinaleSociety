// society.model.js
const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  totalCorpusFunds: {
    type: Number,
    default: 0,
  },
  cashInHand: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  // Add any other relevant fields for a society
});

module.exports = mongoose.model("Society", societySchema);
