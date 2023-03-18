const Client = require("../models/client.models");
const Admin = require("../models/admin.models");
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
  res.send("Post Client Sign Up");
};

// Landlord Sign Up Functionality
const getLandlordRegisterForm = async (req, res, next) => {
  res.render("authUser/admin-register.ejs", {
    pageTitle: "Register | Admin",
  });
};

const postLandlordRegister = async (req, res, next) => {
  res.send("Post Landlord Sign Up");
};

// Client Login

// Client Logout

module.exports = {
  indexPage,
  getClientRegisterForm,
  getLandlordRegisterForm,
  postClientRegister,
  postLandlordRegister,
};
