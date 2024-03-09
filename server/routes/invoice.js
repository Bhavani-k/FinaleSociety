const express = require("express");
const router = express.Router();
const {
  createInvoice,
  updateInvoice,
  getOneInvoice,
  getAllInvoices,
} = require("../controllers/invoiceController"); // Adjust the path accordingly
const { isLoggedIn, customRole } = require("../middlewares/user");

// Invoice routes
router.route("/getAllInvoices").get(isLoggedIn, getAllInvoices);
router.route("/createInvoice").post(isLoggedIn, createInvoice);
router
  .route("/updateInvoice/:id")
  .put(isLoggedIn, customRole("admin"), updateInvoice);
router.route("/getOneInvoice/:id").get(isLoggedIn, getOneInvoice); // Add this line

module.exports = router;
