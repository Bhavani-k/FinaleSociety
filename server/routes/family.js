const express = require("express");
const router = express.Router();
const {
  createFamily,
  updateFamily,
  getOneFamily,
  getAllFamiliesOfSociety,
  updatePaymentStatus,
} = require("../controllers/familyController");
const { isLoggedIn } = require("../middlewares/user");

// Family routes
router.route("/createFamily").post(isLoggedIn, createFamily);
router.route("/updateFamily/:id").put(isLoggedIn, updateFamily);
router.route("/updatePaymentStatus/:id").put(isLoggedIn, updatePaymentStatus);

// Family routes
router.route("/getOneFamily/:id").get(isLoggedIn, getOneFamily);
router
  .route("/getAllFamiliesOfSociety/:societyId")
  .get(isLoggedIn, getAllFamiliesOfSociety);

module.exports = router;
