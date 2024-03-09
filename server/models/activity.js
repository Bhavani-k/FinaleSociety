// activity.model.js
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  cost: {
    type: Number,
  },
  costCategory: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
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
  society: {
    type: mongoose.Schema.ObjectId,
    ref: "Society",
    required: true,
  },
  invoice: {
    type: mongoose.Schema.ObjectId,
    ref: "Invoice",
  },
});

module.exports = mongoose.model("Activity", activitySchema);
