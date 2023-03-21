const User = require("../models/user.models");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

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

// const hashPassword = async (pwd) => {
//   const salt = await bcrypt.genSalt(12);
//   const hash = await bcrypt.hash(pwd, salt);
//   return hash;
// };

const postUserSignUp = async (req, res) => {
  // const user = await User.create({ ...req.body });
  // res.status(StatusCodes.CREATED).json(user);

  const { password, email, first_name, last_name, gender, tel_number, user_type } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hashedPassword,
    user_type: user_type,
    gender: gender,
    tel_number: tel_number,
  });

  await user.save();

  res.status(StatusCodes.CREATED).json({ user });
};

// User Login
const getLoginForm = (req, res) => {
  res.render("authUser/login");
};

const postUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!email) {
    console.log("Invalid credentials.");
  }
  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) {
    res.send("Invalid. Try again.");
  } else {
    res.status(StatusCodes.OK).json({ user });
  }
};

// User Logout

module.exports = {
  indexPage,
  getUserSignUpForm,
  postUserSignUp,
  getLoginForm,
  postUserLogin,
};
