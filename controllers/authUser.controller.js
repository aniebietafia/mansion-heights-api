const User = require("../models/user.models");
// const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils/index");
const { capitalizeFullName, lowerCaseEmail } = require("../utils/algorithms");
const { StatusCodes } = require("http-status-codes");

const indexPage = (req, res, next) => {
  res.render("index", {
    pageTitle: "Landing Page",
  });
};

// Get Sign up Form
const getUserSignUpForm = (req, res) => {
  res.render("authUser/user-signup", {
    pageTitle: "Mansion Heights | Sign Up",
  });
};

// Register New User
const postUserSignUp = async (req, res) => {
  const { fullName, email, password, gender, tel_number, role } = req.body;
  const emailExists = await User.findOne({ email: email });
  if (emailExists) {
    throw new CustomError.BadRequestError("Email already exists. Try another email.");
  }
  // Check if the account is first to register, then assign admin role
  const isFirstAccount = (await User.countDocuments({})) === 0;
  if (!isFirstAccount && role === "admin") {
    throw new CustomError.BadRequestError("Choose a different role.");
  }
  const user = new User({
    fullName: capitalizeFullName(fullName),
    email: lowerCaseEmail(email),
    password,
    gender,
    tel_number,
    role,
  });
  await user.save();
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.redirect("/mansion-heights/apartments");
};

// Render User Login Form
const getLoginForm = (req, res) => {
  res.render("authUser/user-login");
};

// Post User Login
const postUserLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Provide a valid email and password");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("User does not exist. Please sign up first.");
  }

  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new CustomError.UnauthenticatedError("Invalid user credentials.");
  }

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.redirect("/mansion-heights/apartments");
};

// User Logout
const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/mansion-heights/user/login");
};

module.exports = {
  indexPage,
  getUserSignUpForm,
  postUserSignUp,
  getLoginForm,
  postUserLogin,
  logout,
};
