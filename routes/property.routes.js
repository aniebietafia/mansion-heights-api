const express = require("express");
const router = express.Router();

const propertyController = require("../controllers/property.controller");

router.route("/").get(propertyController.getAllProperties).post(propertyController.postProperty);

router
  .route("/:id")
  .get(propertyController.getSingleProperty)
  .patch(propertyController.editProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;
