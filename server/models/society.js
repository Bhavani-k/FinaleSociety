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
  families: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Family",
    },
  ],
  activities: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Activity",
    },
  ],
});

module.exports = mongoose.model("Society", societySchema);
