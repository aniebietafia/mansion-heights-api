const Property = require("../models/property.models");
const { StatusCodes } = require("http-status-codes");

// Find all Properties
const getAllProperties = async (req, res) => {
  const properties = await Property.find({});
  if (properties.length === 0) {
    console.log("No Apartments available yet");
  }
  res.status(StatusCodes.OK).json({ properties });
};

// Get a Single Product
const getSingleProperty = async (req, res) => {
  const id = req.params.id;
  const property = await Property.findById(id);
  res.status(StatusCodes.OK).json({ property });
};

// User creates a new property
const postProperty = async (req, res) => {
  const property = await Property.create(req.body);
  res.status(StatusCodes.CREATED).json({ property });
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
  getAllProperties,
  postProperty,
  getSingleProperty,
  editProperty,
  deleteProperty,
};
