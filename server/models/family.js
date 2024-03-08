const mongoose = require("mongoose");
const familySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
  flatNumber: {
    type: String,
    required: true,
  },
  numberOfResidents: {
    type: Number,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  society: {
    type: mongoose.Schema.ObjectId,
    ref: "Society",
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Family", familySchema);
