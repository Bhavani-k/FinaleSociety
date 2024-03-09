const express = require("express");
const router = express.Router();
const {
  createActivity,
  updateActivity,
  deleteActivity,
  getOneActivity,
  getAllActivitiesOfSociety,
} = require("../controllers/activityController");
const { isLoggedIn } = require("../middlewares/user");

// Activity routes
router.route("/createActivity").post(isLoggedIn, createActivity);
router.route("/updateActivity/:id").put(isLoggedIn, updateActivity);
router.route("/deleteActivity/:id").delete(isLoggedIn, deleteActivity);
router.route("/getOneActivity/:id").get(isLoggedIn, getOneActivity);
router
  .route("/getAllActivitiesOfSociety/:societyId")
  .get(isLoggedIn, getAllActivitiesOfSociety);

module.exports = router;
