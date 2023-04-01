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
    currentUser: req.user.fullName,
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
  res.render("property/register_property");
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
  checkPermissions(req.user, apartment.user);
  if (req.user.role === "admin") {
    return res.render("admin/edit", {
      pageTitle: "Edit Lodge | Admin",
      apartment,
    });
  }
  res.render("property/edit", {
    pageTitle: "Edit Lodge",
    apartment,
  });
};

// User edits the current property
const editProperty = async (req, res) => {
  const { id: lodgeId } = req.params;
  // const id = req.params.id;

  const apartment = await Apartment.findByIdAndUpdate(
    { _id: lodgeId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  // const apartment = await Apartment.findByIdAndUpdate(id, {...req.body}, { new: true, runValidators: true });

  if (!apartment) {
    throw new CustomError.NotFoundError("This apartment does not exist");
  }

  res.redirect(`/lodge-finder/${apartment._id}`);
};

// User deletes a property
const deleteProperty = async (req, res) => {
  const { id: propertyId } = req.params;
  await Apartment.findOneAndRemove({ _id: propertyId });

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
