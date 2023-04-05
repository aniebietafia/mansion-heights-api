const crypto = require("crypto");
const User = require("../models/user.models");
const { attachCookiesToResponse, createTokenUser, sendResetPasswordEmail, createHash } = require("../utils");
const { capitalizeFullName, lowerCaseEmail } = require("../utils/algorithms");
const CustomError = require("../errors");

// const transporter = nodemailer.createTransport({
//   host: process.env.ETHEREAL_HOST,
//   port: process.env.ETHEREAL_PORT,
//   auth: {
//     user: process.env.ETHEREAL_USER,
//     pass: process.env.ETHEREAL_HOST_PASS,
//   },
// });

// Get Sign up Form
const getUserSignUpForm = (req, res) => {
  res.render("authUser/user-signup", {
    signupError: req.flash("error"),
    pageTitle: "Mansion Heights | Sign Up",
  });
};

// Register New User
const postUserSignUp = async (req, res) => {
  const { fullName, email, password, gender, tel_number, role, apartments } = req.body;
  const emailExists = await User.findOne({ email: email });
  if (emailExists) {
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
    apartments,
  });
  await user.save();

  // create token and attach to a user
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

// fetch reset password form
const resetPasswordForm = async (req, res) => {
  res.render("authUser/reset-password", {
    pageTitle: "Reset Password",
  });
};

// controller to send reset password request
const resetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Provide a valid email address");
  }

  const user = await User.findOne({ email });

  if (user) {
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");

    // send email to user
    const origin = "http://localhost:4000/lodge-finder";
    await sendResetPasswordEmail({
      fullName: user.fullName,
      email: user.email,
      token: resetPasswordToken,
      origin,
    });

    const expiration = 1000 * 60 * 10; //sets token expiration to ten minutes
    const resetPasswordTokenExpiration = new Date(Date.now() + expiration);

    user.resetPasswordToken = createHash(resetPasswordToken);
    user.resetPasswordTokenExpiration = resetPasswordTokenExpiration;
    await user.save();
  }

  res.redirect("/lodge-finder/user/login");
};

// controller to render new password form
const newPasswordForm = async (req, res) => {
  res.render("authUser/new-password", {
    pageTitle: "Lodge Finder | New Password",
  });
};

// controller to post new password
const postNewPassword = async (req, res) => {
  res.send("Post New Password");
};

module.exports = {
  getUserSignUpForm,
  postUserSignUp,
  getLoginForm,
  postUserLogin,
  logout,
  resetPasswordForm,
  resetPassword,
  newPasswordForm,
  postNewPassword,
};
