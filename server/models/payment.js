// paymentRequest.model.js
const mongoose = require("mongoose");
const { Types } = mongoose;

const paymentRequestSchema = new mongoose.Schema({
  family: {
    type: mongoose.Schema.ObjectId,
    ref: "Family",
    required: true,
  },
  invoice: {
    type: mongoose.Schema.ObjectId,
    ref: "Invoice",
    required: true,
  },
  amountToPay: {
    type: Number,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  approvedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  society: {
    type: mongoose.Schema.ObjectId,
    ref: "Society",
    required: true,
  },
});

module.exports = mongoose.model("PaymentRequest", paymentRequestSchema);
