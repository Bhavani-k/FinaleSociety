// invoice.model.js
const mongoose = require("mongoose");
const { Types } = mongoose;

const invoiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
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
  approvedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  society: {
    type: mongoose.Schema.ObjectId,
    ref: "Society",
    required: true,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
