const User = require("../models/user");
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
  const { username, currentProject, projects, email } = req.body;

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
  if (currentProject) {
    user.currentProject = currentProject;
  }
  if (projects) {
    user.projects = projects;
  }
  await user.save();

  res.status(200).json({
    success: true,
    message: "User profile updated successfully",
    user,
  });
};

exports.createUser = async (req, res, next) => {
  const { role, currentProject } = req.user;
  let userRole = "projectManager";
  if (role == "projectManager") {
    userRole = "dataEntry";
  }

  const { username, email, password } = req.body;

  let projects = [];
  projects.push(currentProject);

  if (!username) {
    return next(new CustomError(stringConstants.noUsername, 400));
  }
  if (!email) {
    return next(new CustomError(stringConstants.noEmail, 400));
  }
  if (!password) {
    return next(new CustomError(stringConstants.noPassword, 400));
  }
  if (!currentProject && userRole == "dataEntry") {
    return next(new CustomError(stringConstants.noProjectSelected, 400));
  }

  const fetchedUsername = await User.findOne({ username });
  const fetchedEmail = await User.findOne({ email });
  let user;

  if (fetchedEmail && fetchedUsername) {
    user = await User.findByIdAndUpdate(
      fetchedUsername._id,
      {
        $addToSet: { projects: currentProject, currentProject: currentProject },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  } else {
    if (fetchedEmail) {
      return next(new CustomError(stringConstants.emailExsist, 400));
    }
    if (fetchedUsername) {
      return next(new CustomError(stringConstants.usernameExsist, 400));
    }

    user = await User.create({
      username,
      email,
      currentProject,
      password,
      role: userRole,
      projects,
    });
    // console.log(user)
  }

  res.status(200).json(user);
};
