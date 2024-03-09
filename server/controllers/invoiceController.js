// Assuming you have Express and necessary modules set up
const express = require("express");

const Invoice = require("../models/invoice");
const Activity = require("../models/activity");
const User = require("../models/user");
const CustomError = require("../utilis/customError"); // Ensure you have a CustomError utility defined

exports.createInvoice = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(req.user);
    const societyId = req.user.society;
    console.log();
    const { paymentAmount, activityId } = req.body;

    // Check if activityId exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return next(new CustomError("Activity not found", 404));
    }

    const invoice = await Invoice.create({
      paymentAmount,
      activity: activityId,
      approved: false, // Set default approval status
      createdBy: userId,
      society: societyId,
    });

    // Link the invoice to the activity
    activity.invoice = invoice._id;
    await activity.save();

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    console.error(error);
    next(new CustomError("Server error", 500));
  }
};

exports.updateInvoice = async (req, res, next) => {
  const invoiceId = req.params.id;
  const updateData = req.body;

  try {
    const invoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      { $set: updateData },
      { new: true }
    );

    if (!invoice) {
      return next(new CustomError("Invoice not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: invoice,
    });
  } catch (error) {
    console.error(error);
    next(new CustomError("Server error", 500));
  }
};

exports.getAllInvoices = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming you have user information in the request

    // Assuming that the society ID is stored in the user document
    const user = await User.findById(userId);
    const society = user.society;

    // Get all invoices of the society
    const invoices = await Invoice.find({ society });

    res.status(200).json({
      success: true,
      message: "All invoices retrieved successfully",
      data: invoices,
    });
  } catch (error) {
    console.error(error);
    next(new CustomError("Server error", 500));
  }
};

exports.getOneInvoice = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming you have user information in the request
    const invoiceId = req.params.id;

    // Find the invoice associated with the given ID and user
    const invoice = await Invoice.findOne({
      _id: invoiceId,
      createdBy: userId,
    });

    if (!invoice) {
      return next(new CustomError("Invoice not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Invoice retrieved successfully",
      data: invoice,
    });
  } catch (error) {
    console.error(error);
    next(new CustomError("Server error", 500));
  }
};
