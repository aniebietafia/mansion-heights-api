const Apartment = require("../models/property.models");
const User = require("../models/user.models");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils/index");

// Fetch all users in database
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.render("admin/users", {
    pageTitle: "All Users",
    users,
  });
};

const adminEditLodgeForm = async (req, res) => {
  res.render("admin/edit", {
    userObj: req.user,
    pageTitle: "Edit Lodge",
  });
};

module.exports = {
  getAllUsers,
  adminEditLodgeForm,
};
