const mongoose = require("mongoose");
const familySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
    required: true,
    default: [],
  },
  flatNumber: {
    type: String,
    required: true,
    unique: true,
  },
  numberOfResidents: {
    type: Number,
  },
  totalAmountToPay: {
    type: Number,
    default: 0,
  },
  head: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  society: {
    type: mongoose.Schema.ObjectId,
    ref: "Society",
    required: true,
  },
  activitiesPayment: [
    {
      activity: {
        type: mongoose.Schema.ObjectId,
        ref: "Activity",
      },
      cost: {
        type: Number,
        default: 0,
      },
      paid: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Family", familySchema);
