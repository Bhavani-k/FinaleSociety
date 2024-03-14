const Family = require("../models/family");
const User = require("../models/user");
const Society = require("../models/society");
const CustomError = require("../utilis/customError");
const stringConstants = require("../utilis/strringConstants");

exports.createFamily = async (req, res, next) => {
  const {
    name,
    members,
    flatNumber,
    numberOfResidents,
    head,
    societyId,
    contact,
  } = req.body;

  try {
    // Check if the society exists
    const society = await Society.findById(societyId);
    if (!society) {
      return next(new CustomError(stringConstants.societyNotFound, 404));
    }
    // Find user IDs corresponding to the provided email addresses
    const memberIds = await User.find({ email: { $in: members } }).distinct(
      "_id"
    );
    // Find the user ID corresponding to the head's email
    const headUser = await User.findOne({ email: head });
    if (!headUser) {
      return next(new CustomError(stringConstants.headNotFound, 404));
    }

    // Create the family
    const family = await Family.create({
      name,
      members: memberIds,
      flatNumber,
      numberOfResidents,
      head: headUser._id,
      contact,
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
    // const family = await Family.findByIdAndUpdate(
    //   familyId,
    //   { $set: updateData },
    //   { new: true }
    // );

    const family = await Family.findById(familyId);

    if (!family) {
      return next(new CustomError(stringConstants.familyNotFound, 404));
    }
    console.log(family);
    let amount = family.totalAmountToPay;
    if (updateData.activitiesPayment) {
      const oldActivitiesPayment = family.activitiesPayment || [];
      console.log(":::::::::::::::::::::::::::");

      for (const updatedPayment of updateData.activitiesPayment) {
        let correspondingOldPayment = oldActivitiesPayment.filter(
          (oldPayment) => oldPayment.activity === updatedPayment.activity
        );
        console.log(correspondingOldPayment);
        console.log(">>//////////////////////..");
        if (
          correspondingOldPayment &&
          correspondingOldPayment.paid !== updatedPayment.paid
        ) {
          const costDifference = updatedPayment.paid
            ? updatedPayment.cost
            : -updatedPayment.cost;
          console.log(">>>>>>>>>>>>>>>>>>>>>..");
          console.log(costDifference);
          amount += costDifference;
        }
      }
    }
    const updatedFamily = await Family.findByIdAndUpdate(
      familyId,
      { $set: updateData },
      { new: true }
    );
    console.log(amount);
    if (amount < 0) amount = 0;
    family.totalAmountToPay = amount;
    await family.save();

    res.status(200).json({
      success: true,
      message: "Family updated successfully",
      data: updatedFamily,
    });
  } catch (error) {
    console.log(error);
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

exports.updatePaymentStatus = async (req, res, next) => {
  const familyId = req.params.id;
  const { activity, paid } = req.body;
  const family = await Family.findById(familyId);

  if (!family) {
    return next(new CustomError(stringConstants.familyNotFound, 404));
  }

  // Find the index of the activity in the activitiesPayment array
  const index = family.activitiesPayment.findIndex(
    (item) => String(item.activity) === activity
  );

  if (index === -1) {
    return next(
      new CustomError("Activity not found in activitiesPayment", 404)
    );
  }

  // Update the paid status of the activity
  family.activitiesPayment[index].paid = paid;

  let costDifference = family.activitiesPayment[index].paid
    ? family.activitiesPayment[index].cost
    : -family.activitiesPayment[index].cost;

  if (costDifference < 0) costDifference = 0;

  family.totalAmountToPay += costDifference;

  // Save the updated family document
  try {
    await family.save();
    res.status(200).json({ message: "Payment status updated successfully" });
  } catch (err) {
    return next(err);
  }
};
