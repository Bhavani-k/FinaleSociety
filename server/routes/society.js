const express = require("express");
const router = express.Router();
const {
  createSociety,
  updateSociety,
} = require("../controllers/societyController");
const { isLoggedIn, customRole } = require("../middlewares/user");

// Society routes
router.route("/createSociety").post(isLoggedIn, createSociety);
router
  .route("/updateSociety/:id")
  .put(isLoggedIn, customRole("admin"), updateSociety);

module.exports = router;
