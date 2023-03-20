const express = require("express");
const router = express.Router();

const authUserController = require("../controllers/authUser.controller");

router.route("/").get(authUserController.indexPage);

router.route("/signup").get(authUserController.getUserSignUpForm).post(authUserController.postUserSignUp);

module.exports = router;
