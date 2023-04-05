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

// get admin form to edit an apartment
const adminEditLodgeForm = async (req, res) => {
  res.render("admin/edit", {
    userObj: req.user,
    pageTitle: "Edit Lodge",
  });
};

// render the form update users in the database
const editUserForm = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.render("admin/edit-user", {
    userObj: req.user,
    pageTitle: "Edit User",
    user,
  });
};

// controller to update user in the database
const postEditedUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, tel_number, gender, role } = req.body;
  const user = await User.findOne({ _id: id });
  console.log(user);

  // updating old data with the new data
  user.fullName = fullName;
  user.email = email;
  user.tel_number = tel_number;
  user.gender = gender;
  user.role = role;

  await user.save();
  res.redirect("/lodge-finder/admin/users");
};

// controller to delete user(s) from the database
const deleteUser = async (req, res) => {
  // fetching the user by id
  const { id: userId } = req.params;
  const user = await User.findByIdAndDelete({ _id: userId });

  // await user.deleteOne();

  res.redirect("/lodge-finder/admin/users");
};

module.exports = {
  getAllUsers,
  adminEditLodgeForm,
  deleteUser,
  editUserForm,
  postEditedUser,
};
