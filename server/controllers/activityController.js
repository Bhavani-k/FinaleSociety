const Activity = require("../models/activity");
const Society = require("../models/society");
const CustomError = require("../utilis/customError");
const stringConstants = require("../utilis/strringConstants");
const Family = require("../models/family"); // Import the Family model
const mongoose = require("mongoose");

exports.createActivity = async (req, res, next) => {
  const { name, description, cost, costCategory, date, societyId, families } =
    req.body;
  console.log(">>>>>>>>>>>>>>>>>>>>>");
  console.log(req.body);
  try {
    const society = await Society.findById(societyId);

    if (!society) {
      return next(new CustomError(stringConstants.societyNotFound, 404));
    }

    const activity = await Activity.create({
      name,
      description,
      cost,
      costCategory,
      date,
      createdBy: req.user.id,
      families,
      society: societyId,
    });

    society.activities.push(activity._id);
    await society.save();

    // Update families with the cost of the activity divided by the total number of families
    const totalFamilies = families.length;
    const costPerFamily = totalFamilies > 0 ? cost / totalFamilies : 0;

    for (const familyId of families) {
      const family = await Family.findById(familyId);

      if (family) {
        family.activitiesPayment.push({
          activity: activity._id,
          cost: costPerFamily,
          paid: false,
        });

        family.totalAmountToPay += costPerFamily;

        await family.save();
      }
    }

    res.status(201).json({
      success: true,
      message: "Activity created successfully",
      data: activity,
    });
  } catch (error) {
    console.log(error);
    next(new CustomError(stringConstants.serverError, 500));
  }
};

exports.updateActivity = async (req, res, next) => {
  const activityId = req.params.id;
  const updateData = req.body;

  try {
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return next(new CustomError(stringConstants.activityNotFound, 404));
    }

    // Store the previous families associated with the activity and their previous costs
    const previousFamilies = activity.families;
    const previousCosts = {};

    for (const familyId of previousFamilies) {
      const family = await Family.findById(familyId);

      if (family) {
        const activityPayment = family.activitiesPayment.find((payment) =>
          payment.activity.equals(activityId)
        );

        previousCosts[familyId] = activityPayment ? activityPayment.cost : 0;
      }
    }

    // Update the activity with the new data (considering default cost if not provided)
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      { $set: { ...updateData, cost: updateData.cost || activity.cost } },
      { new: true }
    );

    // Calculate the difference between the previous and updated families
    const addedFamilies = updatedActivity.families.filter(
      (family) => !previousFamilies.includes(family)
    );
    const removedFamilies = previousFamilies.filter(
      (family) => !updatedActivity.families.includes(family)
    );

    // Calculate the cost per family for the updated activity
    const totalFamilies = updatedActivity.families.length;
    const costPerFamily =
      totalFamilies > 0 ? updatedActivity.cost / totalFamilies : 0;

    // Update the cost for each family
    for (const familyId of updatedActivity.families) {
      const family = await Family.findById(familyId);

      if (family) {
        const previousCost = previousCosts[familyId] || 0;

        // If the cost has changed, update the cost for the family
        if (costPerFamily !== previousCost) {
          const activityPaymentIndex = family.activitiesPayment.findIndex(
            (payment) => payment.activity.equals(updatedActivity._id)
          );

          if (activityPaymentIndex !== -1) {
            family.activitiesPayment[activityPaymentIndex].cost = costPerFamily;
          } else {
            family.activitiesPayment.push({
              activity: updatedActivity._id,
              cost: costPerFamily,
              paid: false,
            });
          }

          await family.save();
        }
      }
    }

    // Remove the cost for each removed family
    for (const familyId of removedFamilies) {
      const family = await Family.findById(familyId);

      if (family) {
        family.activitiesPayment = family.activitiesPayment.filter(
          (activityPayment) =>
            !activityPayment.activity.equals(updatedActivity._id)
        );

        // Update totalAmountToPay for the removed family
        const totalAmountToPay = family.activitiesPayment.reduce(
          (total, payment) => total + payment.cost,
          0
        );

        family.totalAmountToPay = totalAmountToPay;

        await family.save();
      }
    }

    // Update the totalAmountToPay for each family
    for (const familyId of updatedActivity.families) {
      const family = await Family.findById(familyId);

      if (family) {
        const totalAmountToPay = family.activitiesPayment.reduce(
          (total, payment) => total + payment.cost,
          0
        );

        family.totalAmountToPay = totalAmountToPay;
        await family.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Activity updated successfully",
      data: updatedActivity,
    });
  } catch (error) {
    next(new CustomError(stringConstants.serverError, 500));
  }
};

exports.deleteActivity = async (req, res, next) => {
  const activityId = req.params.id;

  try {
    const activity = await Activity.findByIdAndDelete(activityId);

    if (!activity) {
      return next(new CustomError(stringConstants.activityNotFound, 404));
    }

    // Remove the activity from the associated society's activities array
    const society = await Society.findById(activity.society);
    society.activities = society.activities.filter(
      (act) => !act.equals(activity._id)
    );
    await society.save();

    const activityCostPerFamily = activity.cost / activity.families.length;

    // Remove the activity from the activitiesPayment array in associated families
    for (const familyId of activity.families) {
      const family = await Family.findById(familyId);

      if (family) {
        family.activitiesPayment = family.activitiesPayment.filter(
          (activityPayment) => !activityPayment.activity.equals(activity._id)
        );
        // Update totalAmountToPay by subtracting the cost of the deleted activity
        // const deletedActivityCost = activity.activitiesPayment.find(
        //   (activityPayment) => activityPayment.activity.equals(activity._id)
        // ).cost;

        family.totalAmountToPay -= activityCostPerFamily;
        await family.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Activity deleted successfully",
      data: activity,
    });
  } catch (error) {
    console.log(error);
    next(new CustomError(stringConstants.serverError, 500));
  }
};

exports.getOneActivity = async (req, res, next) => {
  const activityId = req.params.id;

  try {
    const activity = await Activity.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(activityId) } },
      { $unwind: "$families" },
      {
        $lookup: {
          from: "families", // Assuming your family collection is named "families"
          localField: "families",
          foreignField: "_id",
          as: "familyDetails",
        },
      },
      { $unwind: "$familyDetails" },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          costCategory: { $first: "$costCategory" },
          date: { $first: "$date" },
          createdBy: { $first: "$createdBy" },
          society: { $first: "$society" },
          cost: { $first: "$cost" },
          families: { $push: "$familyDetails" },
        },
      },
    ]);

    if (!activity || activity.length === 0) {
      return next(new CustomError(stringConstants.activityNotFound, 404));
    }

    res.status(200).json({
      success: true,
      data: activity[0], // Since it's an array, get the first element
    });
  } catch (error) {
    console.log(error);
    next(new CustomError(stringConstants.serverError, 500));
  }
};

exports.getAllActivitiesOfSociety = async (req, res, next) => {
  const societyId = req.params.societyId;

  try {
    const society = await Society.findById(societyId);

    if (!society) {
      return next(new CustomError(stringConstants.societyNotFound, 404));
    }

    const allActivities = await Activity.aggregate([
      { $match: { society: new mongoose.Types.ObjectId(societyId) } },
      { $unwind: "$families" },
      {
        $lookup: {
          from: "families", // Assuming your family collection is named "families"
          localField: "families",
          foreignField: "_id",
          as: "familyDetails",
        },
      },
      { $unwind: "$familyDetails" },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          costCategory: { $first: "$costCategory" },
          date: { $first: "$date" },
          createdBy: { $first: "$createdBy" },
          society: { $first: "$society" },
          families: { $push: "$familyDetails" },
          cost: { $first: "$cost" },
        },
      },
    ]);

    res.status(200).json(allActivities);
  } catch (error) {
    next(new CustomError(stringConstants.serverError, 500));
  }
};

exports.getAllActivitiesOfFamily = async (req, res, next) => {
  const familyId = req.params.familyId;
  console.log(">>>>>>>>>>>>>>>");
  console.log(familyId);

  try {
    const family = await Family.findById(familyId);

    if (!family) {
      return next(new CustomError(stringConstants.familyNotFound, 404));
    }

    const allActivities = await Activity.find({ family: familyId });

    res.status(200).json(allActivities);
  } catch (error) {
    // Handle server errors with a custom error message
    next(new CustomError(stringConstants.serverError, 500));
  }
};
