const mongoose = require("mongoose");

const connectWithDb = async (req, res, next) => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("database connected successfully"))
      .catch((error) => console.log(error));
  } catch (err) {
    console.log(`DB error ${err}`);
  }
};

module.exports = connectWithDb;
