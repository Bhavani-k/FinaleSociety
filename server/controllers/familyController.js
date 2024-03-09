const Family = require("../models/family");
const User = require("../models/user");
const Society = require("../models/society");
const CustomError = require("../utilis/customError");
const stringConstants = require("../utilis/strringConstants");

exports.createFamily = async (req, res, next) => {
  const { name, members, flatNumber, numberOfResidents, head, societyId } =
    req.body;

  try {
    // Check if the society exists
    const society = await Society.findById(societyId);
    if (!society) {
      return next(new CustomError(stringConstants.societyNotFound, 404));
    }

    // Create the family
    const family = await Family.create({
      name,
      members,
      flatNumber,
      numberOfResidents,
      head,
      society: societyId,
    });

    // Update society with the new family
    society.families.push(family._id);
    await society.save();

    res.status(201).json({
      success: true,
      message: "Family created successfully",
      data: family,
    });
  } catch (error) {
    console.log(error);
    next(new CustomError(stringConstants.serverError, 500));
  }
};

exports.updateFamily = async (req, res, next) => {
  const familyId = req.params.id;
  const updateData = req.body;

  try {
    const family = await Family.findByIdAndUpdate(
      familyId,
      { $set: updateData },
      { new: true }
    );

    if (!family) {
      return next(new CustomError(stringConstants.familyNotFound, 404));
    }

    res.status(200).json({
      success: true,
      message: "Family updated successfully",
      data: family,
    });
  } catch (error) {
    next(new CustomError(stringConstants.serverError, 500));
  }
};

exports.getOneFamily = async (req, res, next) => {
  try {
    const family = await Family.findById(req.params.id);

    if (!family) {
      return next(new CustomError(stringConstants.noFamily, 404));
    }

    res.status(200).json({
      success: true,
      family,
    });
  } catch (error) {
    next(new CustomError(stringConstants.serverError, 500));
  }
};

exports.getAllFamiliesOfSociety = async (req, res, next) => {
  const societyId = req.params.societyId;

  try {
    const society = await Society.findById(societyId);

    if (!society) {
      return next(new CustomError(stringConstants.societyNotFound, 404));
    }

    const allFamilies = await Family.find({ society: societyId });

    res.status(200).json(allFamilies);
  } catch (error) {
    next(new CustomError(stringConstants.serverError, 500));
  }
};
