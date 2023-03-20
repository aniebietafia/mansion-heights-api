const User = require("../models/user.models");
const { StatusCodes } = require("http-status-codes");

const indexPage = (req, res, next) => {
  res.render("index", {
    pageTitle: "Landing Page",
  });
};

// Get Sign ip Form
const getUserSignUpForm = (req, res) => {
  res.render("authUser/user-signup", {
    pageTitle: "Mansion Heights | Sign Up",
  });
};

const postUserSignUp = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(user);
};

// User Login

// User Logout

module.exports = {
  indexPage,
  getUserSignUpForm,
  postUserSignUp,
};
