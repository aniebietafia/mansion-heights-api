const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const { authenticateUser, authorizePermissions } = require("../middlewares/authentication.middleware");

router.route("/users").get([authenticateUser, authorizePermissions("admin")], adminController.getAllUsers);

router.route("/:id/edit").get([authenticateUser, authorizePermissions("admin")], adminController.adminEditLodgeForm);

module.exports = router;
