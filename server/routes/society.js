const express = require("express");
const router = express.Router();
const {
  createSociety,
  updateSociety,
  getOneSociety,
} = require("../controllers/societyController");
const { isLoggedIn, customRole } = require("../middlewares/user");

// Society routes
router.route("/createSociety").post(isLoggedIn, createSociety);
router
  .route("/updateSociety/:id")
  .put(isLoggedIn, customRole("admin"), updateSociety);
router.route("/getOneSociety/:id").get(isLoggedIn, getOneSociety); // Add this line

module.exports = router;
