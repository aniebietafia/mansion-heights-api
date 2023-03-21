const express = require("express");
const router = express.Router();

const authUserController = require("../controllers/authUser.controller");

router.route("/").get(authUserController.indexPage);

router.route("/signup").get(authUserController.getUserSignUpForm).post(authUserController.postUserSignUp);

router.route("/login").get(authUserController.getLoginForm).post(authUserController.postUserLogin);

module.exports = router;
