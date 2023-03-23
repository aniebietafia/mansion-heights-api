const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/authentication.middleware");
const propertyController = require("../controllers/property.controller");

router.route("/").get(propertyController.getAllProperties);

router.route("/property").get(propertyController.getPropertyRegisterForm).post(propertyController.postProperty);

router
  .route("/:id")
  .get(propertyController.getSingleProperty)
  .patch(propertyController.editProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;
