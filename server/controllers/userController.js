const User = require("../models/user");
const Society = require("../models/society");
const CustomError = require("../utilis/customError");
const stringConstants = require("../utilis/strringConstants");
const cookieToken = require("../utilis/cookieToken");

exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username) {
    return next(new CustomError(stringConstants.noUsername, 400));
  }
  if (!email) {
    return next(new CustomError(stringConstants.noEmail, 400));
  }
  if (!password) {
    return next(new CustomError(stringConstants.noPassword, 400));
  }

  const fetchedUsername = await User.findOne({ username });
  if (fetchedUsername) {
    return next(new CustomError(stringConstants.usernameExsist, 400));
  }
  const fetchedEmail = await User.findOne({ email });
  if (fetchedEmail) {
    return next(new CustomError(stringConstants.emailExsist, 400));
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  cookieToken(user, res);
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return next(new CustomError(stringConstants.noUsername, 400));
  }
  if (!password) {
    return next(new CustomError(stringConstants.noPassword, 400));
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new CustomError(stringConstants.noUser, 400));
  }
  const isPasswordCorrect = await user.isValidatedPassword(password);

  if (!isPasswordCorrect) {
    return next(new CustomError(stringConstants.incorrectPassword, 400));
  }

  cookieToken(user, res);
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(204).json({
    success: true,
    message: "Logout succesful",
  });
};
exports.changePassword = async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId).select("+password");

  const isCorrectOldPassword = await user.isValidatedPassword(
    req.body.oldPassword
  );

  if (!isCorrectOldPassword) {
    return next(new CustomError(stringConstants.incorrectPassword, 400));
  }
  user.password = req.body.newPassword;

  await user.save();
  cookieToken(user, res);
};

exports.updateUser = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  const { username, email, society } = req.body;

  if (username) {
    const fetchedUsername = await User.findOne({ username });
    if (fetchedUsername) {
      return next(new CustomError(stringConstants.usernameExsist, 400));
    }
    user.username = username;
  }
  if (email) {
    const fetchedEmail = await User.findOne({ email });
    if (fetchedEmail) {
      return next(new CustomError(stringConstants.emailExsist, 400));
    }
    user.email = email;
  }
  if (society) {
    const fetchedSociety = await User.findOne({ society });
    if (fetchedSociety) {
      return next(new CustomError(stringConstants.societyExists, 400));
    }
    user.society = society;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User profile updated successfully",
    user,
  });
};

exports.createUser = async (req, res, next) => {
  const admin = req.user;
  const { email } = req.body;

  if (!email) {
    return next(new CustomError(stringConstants.noEmail, 400));
  }

  const fetchedEmail = await User.findOne({ email });
  if (fetchedEmail) {
    return next(new CustomError(stringConstants.emailExsist, 400));
  }
  const username = email;
  const password = "123456";
  const society = admin.society;
  const role = "family";

  const user = await User.create({
    username,
    email,
    password,
    society,
    role,
  });

  res.status(200).json(user);
};

exports.getSocietyUsersEmails = async (req, res, next) => {
  const { societyId } = req.params;
  console.log(req.params);

  try {
    // Check if the society exists
    const society = await Society.findById(societyId);
    if (!society) {
      return next(new CustomError(stringConstants.societyNotFound, 404));
    }

    // Fetch all users belonging to the society
    const users = await User.find({ society: societyId });

    // Extract email IDs from the users
    const userEmails = users.map((user) => user.email);

    res.status(200).json({
      success: true,
      data: userEmails,
    });
  } catch (error) {
    console.error(error);
    next(new CustomError(stringConstants.serverError, 500));
  }
};
