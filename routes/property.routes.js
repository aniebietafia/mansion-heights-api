const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const { authenticateUser, authorizePermissions } = require("../middlewares/authentication.middleware");
const apartmentController = require("../controllers/property.controller");

router.route("/").get(apartmentController.indexPage);

router.route("/lodge-finder/apartments").get(authenticateUser, apartmentController.getAllProperties);

router
  .route("/lodge-finder/register")
  .get([authenticateUser, authorizePermissions("admin", "Home Owner")], apartmentController.getPropertyRegisterForm)
  .post(
    [authenticateUser, authorizePermissions("admin", "Home Owner")],
    upload.array("image"),
    apartmentController.postProperty
  );

router
  .route("/lodge-finder/:id")
  .get(authenticateUser, apartmentController.getSingleProperty)
  .patch([authenticateUser, authorizePermissions("admin", "Home Owner")], apartmentController.editProperty)
  .delete([authenticateUser, authorizePermissions("admin", "Home Owner")], apartmentController.deleteProperty);

router
  .route("/lodge-finder/:id/edit")
  .get([authenticateUser, authorizePermissions("admin", "Home Owner")], apartmentController.getEditApartmentForm);

module.exports = router;
