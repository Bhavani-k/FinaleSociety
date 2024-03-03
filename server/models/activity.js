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
    type: Number,
  },
  date: {
    type: Date,
    required: true,
  },
  families: [
    {
      type: Types.ObjectId,
      ref: "Family",
    },
  ],
});

module.exports = mongoose.model("Activity", activitySchema);
