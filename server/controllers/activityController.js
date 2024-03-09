const Activity = require("../models/activity");
const Society = require("../models/society");
const CustomError = require("../utilis/customError");
const stringConstants = require("../utilis/strringConstants");
const Family = require("../models/family"); // Import the Family model

exports.createActivity = async (req, res, next) => {
  const { name, description, cost, costCategory, date, societyId, families } =
    req.body;

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

    // Remove the activity from the activitiesPayment array in associated families
    for (const familyId of activity.families) {
      const family = await Family.findById(familyId);

      if (family) {
        family.activitiesPayment = family.activitiesPayment.filter(
          (activityPayment) => !activityPayment.activity.equals(activity._id)
        );

        await family.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Activity deleted successfully",
      data: activity,
    });
  } catch (error) {
    next(new CustomError(stringConstants.serverError, 500));
  }
};

exports.getOneActivity = async (req, res, next) => {
  const activityId = req.params.id;

  try {
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return next(new CustomError(stringConstants.activityNotFound, 404));
    }

    res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
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

    const allActivities = await Activity.find({ society: societyId });

    res.status(200).json(allActivities);
  } catch (error) {
    next(new CustomError(stringConstants.serverError, 500));
  }
};
