const Society = require("../models/society");
const User = require("../models/user");
const CustomError = require("../utilis/customError");
const stringConstants = require("../utilis/strringConstants");
const cookieToken = require("../utilis/cookieToken");

exports.createSociety = async (req, res, next) => {
  const { name, address, totalCorpusFunds, cashInHand } = req.body;
  const userId = req.user.id;
  console.log(req.user);
  const user = await User.findById(userId);
  console.log(name, user);
  if (!name) {
    return next(new CustomError(stringConstants.noSocietyName, 400));
  }

  try {
    const existingSociety = await Society.findOne({ name });

    if (existingSociety) {
      return next(new CustomError(stringConstants.societyExists, 400));
    }

    const society = await Society.create({
      name,
      address,
      totalCorpusFunds,
      cashInHand,
      createdBy: userId,
    });
    if (society) {
      user.society = society._id;
    }
    await user.save();

    res.status(201).json({
      society,
    });
  } catch (error) {
    console.log(error);
    next(new CustomError(stringConstants.serverError, 500));
  }
};

// Add this function to your controller
exports.updateSociety = async (req, res, next) => {
  const societyId = req.params.id;
  const updateData = req.body;

  try {
    const society = await Society.findByIdAndUpdate(
      societyId,
      { $set: updateData },
      { new: true }
    );

    if (!society) {
      return next(new CustomError(stringConstants.societyNotFound, 404));
    }

    res.status(200).json({
      success: true,
      message: "Society updated successfully",
      data: society,
    });
  } catch (error) {
    next(new CustomError(stringConstants.serverError, 500));
  }
};

exports.getOneSociety = async (req, res, next) => {
  const societyId = req.params.id;

  try {
    const society = await Society.findById(societyId);

    if (!society) {
      return next(new CustomError(stringConstants.societyNotFound, 404));
    }

    res.status(200).json({
      success: true,
      data: society,
    });
  } catch (error) {
    next(new CustomError(stringConstants.serverError, 500));
  }
};
