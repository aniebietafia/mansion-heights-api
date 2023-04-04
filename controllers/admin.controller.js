const User = require("../models/user.models");

// Fetch all users in database
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.render("admin/users", {
    userObj: req.user,
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
const editUserForm = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("admin/edit-user", {
    userObj: req.user,
    pageTitle: "Edit User",
    user,
  });
};

const postEditedUser = async (req, res) => {
  const { fullName, email, tel_number, gender, role } = req.body;
  const user = await User.findById(req.params.id);

  user.fullName = fullName;
  user.email = email;
  user.tel_number = tel_number;
  user.gender = gender;
  user.role = role;

  await user.save();
  res.redirect("/lodge-finder/admin/users");
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });

  await user.deleteOne();

  res.redirect("/lodge-finder/admin/users");
};

module.exports = {
  getAllUsers,
  adminEditLodgeForm,
  deleteUser,
  editUserForm,
  postEditedUser,
};
