const Property = require("../models/property.models");
const { StatusCodes } = require("http-status-codes");

// Find all Properties
const getAllProperties = async (req, res) => {
  // const apartments = await Property.find({});
  // if (apartments.length === 0) {
  //   return res.send("No available apartments yet.");
  // }
  res.render("property/apartments");
  // res.status(StatusCodes.OK).json({ properties });
};

// Get a Single Product
const getSingleProperty = async (req, res) => {
  const id = req.params.id;
  const property = await Property.findById(id);
  // res.status(StatusCodes.OK).json({ property });
  res.redirect("property/apartment");
};

// Get Property Register form
const getPropertyRegisterForm = (req, res) => {
  res.render("property/register_property");
};

// User creates a new property
const postProperty = async (req, res) => {
  const property = await Property.create(req.body);
  // res.status(StatusCodes.CREATED).json({ property });
  res.redirect("property/aparments");
};

// User edits the current property
const editProperty = async (req, res) => {
  res.send("Edit Property");
};

// User deletes a property
const deleteProperty = async (req, res) => {
  const id = req.params.id;
  await Property.findByIdAndRemove({ _id: id });

  res.status(StatusCodes.OK).json({ msg: "Property deleted" });
};

module.exports = {
  getPropertyRegisterForm,
  getAllProperties,
  postProperty,
  getSingleProperty,
  editProperty,
  deleteProperty,
};
