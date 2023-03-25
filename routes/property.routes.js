const express = require("express");
const router = express.Router();

const { authenticateUser, authorizePermissions } = require("../middlewares/authentication.middleware");
const apartmentController = require("../controllers/property.controller");

router.route("/").get(authenticateUser, apartmentController.getAllProperties);

router
  .route("/register")
  .get(authenticateUser, apartmentController.getPropertyRegisterForm)
  .post(authenticateUser, apartmentController.postProperty);

router
  .route("/:id")
  .get(authenticateUser, apartmentController.getSingleProperty)
  .patch(authenticateUser, apartmentController.editProperty)
  .delete(authenticateUser, apartmentController.deleteProperty);

router.route("/:id/edit").get(apartmentController.getEditApartmentForm);

module.exports = router;
