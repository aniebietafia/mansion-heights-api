const Apartment = require("../models/property.models");
const CustomError = require("../errors");
const { convertFeaturesToArray, checkPermissions } = require("../utils/index");

const indexPage = (req, res) => {
  res.render("index", {
    pageTitle: "Lodge Finder",
  });
};

// Find all Properties
const getAllProperties = async (req, res) => {
  const apartments = await Apartment.find({}).populate({
    path: "user",
    select: "fullName",
  });
  res.render("property/apartments", {
    userObj: req.user,
    pageTitle: "Lodge Finder",
    apartments,
  });
};

// Get a Single Product
const getSingleProperty = async (req, res) => {
  const id = req.params.id;
  const apartment = await Apartment.findById(id).populate({
    path: "user",
    select: "fullName role tel_number",
  });

  if (!apartment) {
    throw new CustomError.NotFoundError("Apartment does not exist.");
  }

  apartment.view_count += 1;
  await apartment.save();
  res.render("property/apartment", {
    pageTitle: "Lodge",
    userObj: req.user,
    apartment,
  });
};

// Get Property Register form
const getPropertyRegisterForm = async (req, res) => {
  res.render("property/register_property", {
    userObj: req.user,
  });
};

// User creates a new property
const postProperty = async (req, res) => {
  req.body.user = req.user.userId;
  const { images, user, description, property_type, location, features } = req.body;
  const apartment = new Apartment({
    images: images,
    user: user,
    description: description,
    property_type: property_type,
    location: location,
    features: convertFeaturesToArray(features),
  });
  apartment.images = req.files.map((el) => ({
    url: el.path,
    filename: el.filename,
  }));
  await apartment.save();
  res.redirect(`/lodge-finder/${apartment._id}`);
};

// Get edit apartment form
const getEditApartmentForm = async (req, res) => {
  const apartment = await Apartment.findById(req.params.id);
  if (req.user.role === "admin") {
    return res.render("admin/edit", {
      userObj: req.user,
      pageTitle: "Edit Lodge | Admin",
      apartment,
    });
  }
  checkPermissions(req.user, apartment.user);
  res.render("property/edit", {
    userObj: req.user,
    pageTitle: "Edit Lodge",
    apartment,
  });
};

// controller to update lodge
const editProperty = async (req, res) => {
  const id = req.params.id;
  const { property_type, location, features, status, description } = req.body;
  const apartment = await Apartment.findById(id);

  if (req.user.role === "admin") {
    apartment.property_type = property_type;
    apartment.location = location;
    apartment.features = convertFeaturesToArray(features);
    apartment.status = status;
    apartment.description = description;

    await apartment.save();
    return res.redirect(`/lodge-finder/${apartment._id}`);
  }

  checkPermissions(req.user, apartment.user);

  apartment.property_type = property_type;
  apartment.location = location;
  apartment.features = convertFeaturesToArray(features);
  apartment.status = status;
  apartment.description = description;

  await apartment.save();

  res.redirect(`/lodge-finder/${apartment._id}`);
};

// controller to delete lodge
const deleteProperty = async (req, res) => {
  const { id: propertyId } = req.params;
  const apartment = await Apartment.findOne({ _id: propertyId });
  checkPermissions(req.user, apartment.user);

  await apartment.deleteOne();

  res.redirect("/lodge-finder/apartments");
};

module.exports = {
  indexPage,
  getPropertyRegisterForm,
  getAllProperties,
  postProperty,
  getSingleProperty,
  editProperty,
  deleteProperty,
  getEditApartmentForm,
};
