const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  createUser,
  changePassword,
  updateUser,
  getSocietyUsersEmails,
} = require("../controllers/userController");
const { isLoggedIn, customRole } = require("../middlewares/user");

// all user routes
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/changePassword").post(isLoggedIn, changePassword);
router.route("/updateUser").put(isLoggedIn, updateUser);

// admin routes
router.route("/signup").post(signup);
router
  .route("/createUser")
  .post(isLoggedIn, customRole("admin", "projectManager"), createUser);

router
  .route("/getSocietyUsersEmails/:societyId")
  .get(isLoggedIn, getSocietyUsersEmails);

module.exports = router;
