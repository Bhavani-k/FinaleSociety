const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    default: generateInvoiceNumber,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  invoiceDate: {
    type: Date,
    default: Date.now,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  activity: {
    type: mongoose.Schema.ObjectId,
    ref: "Activity",
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  paid: {
    type: Boolean,
    required: true,
    default: false,
  },
  society: {
    type: mongoose.Schema.ObjectId,
    ref: "Society",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});
// Function to generate a readable invoice number
function generateInvoiceNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
  return `INV-${year}${month}${day}-${random}`;
}

module.exports = mongoose.model("Invoice", invoiceSchema);
module.exports = mongoose.model("Invoice", invoiceSchema);
