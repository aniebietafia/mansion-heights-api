const Client = require("../models/client.models");
const AdminUser = require("../models/adminUser.models");
const { StatusCodes } = require("http-status-codes");

const indexPage = (req, res, next) => {
  res.render("index", {
    pageTitle: "Landing Page",
  });
};

// Client Sign Up Functionality
const getClientRegisterForm = (req, res, next) => {
  res.render("authUser/client-register", {
    pageTitle: "Register | Client",
  });
};

const postClientRegister = async (req, res, next) => {
  const user = req.body;
  const client = await Client.create(user);
  res.status(StatusCodes.CREATED).json({ client });
};

// Landlord Sign Up Functionality
const getadminUserRegisterForm = async (req, res, next) => {
  res.render("authUser/adminUser-register.ejs", {
    pageTitle: "Register | Admin",
  });
};

const postadminUserRegister = async (req, res, next) => {
  res.send("Post Landlord Sign Up");
};

// Client Login

// Client Logout

module.exports = {
  indexPage,
  getClientRegisterForm,
  getadminUserRegisterForm,
  postClientRegister,
  postadminUserRegister,
};
