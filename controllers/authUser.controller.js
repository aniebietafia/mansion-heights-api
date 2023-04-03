const User = require("../models/user.models");
const { attachCookiesToResponse, createTokenUser } = require("../utils/index");
const { capitalizeFullName, lowerCaseEmail } = require("../utils/algorithms");

// Get Sign up Form
const getUserSignUpForm = (req, res) => {
  res.render("authUser/user-signup", {
    signupError: req.flash("error"),
    pageTitle: "Mansion Heights | Sign Up",
  });
};

// Register New User
const postUserSignUp = async (req, res) => {
  const { fullName, email, password, gender, tel_number, role } = req.body;
  const emailExists = await User.findOne({ email: email });
  if (emailExists) {
    // throw new CustomError.BadRequestError("Email already exists. Try another email.");
    req.flash("error", "Email already exists. Try another email.");
    return res.redirect("/lodge-finder/user/signup");
  }
  // Check if the account is first in the database to register, then assign admin role
  const isFirstAccount = (await User.countDocuments({})) === 0;
  if (!isFirstAccount && role === "admin") {
    req.flash("error", "Admin role exists. Choose a different role");
    return res.redirect("/lodge-finder/user/signup");
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

  res.redirect("/lodge-finder/apartments");
};

// Render User Login Form
const getLoginForm = (req, res) => {
  res.render("authUser/user-login", {
    pageTitle: "Login",
    errorMessage: req.flash("error"),
  });
};

// Post User Login
const postUserLogin = async (req, res) => {
  const { email, password } = req.body;

  // check if email and password field is empty
  if (!email || !password) {
    req.flash("error", "Provide a valid email and password");
    return res.redirect("/lodge-finder/user/login");
  }

  // Find user by email
  const user = await User.findOne({ email: email });

  // check if email does not exist in database, redirect user to signup page
  if (!user) {
    req.flash("error", "User does not exist. Please sign up first.");
    return res.redirect("/lodge-finder/user/login");
  }

  // compare entered password with password from database
  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    req.flash("error", "Email or Password is incorrect. Try again!");
    return res.redirect("/lodge-finder/user/login");
  }

  // create a token for the user
  const tokenUser = { fullName: user.fullName, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });

  // if token is verified, login user and redirects user to the apartments page
  res.redirect("/lodge-finder/apartments");
};

// User Logout
const logout = (req, res) => {
  // removes token and sets expiry date to the current time to log user out
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/lodge-finder/user/login");
};

module.exports = {
  getUserSignUpForm,
  postUserSignUp,
  getLoginForm,
  postUserLogin,
  logout,
};
