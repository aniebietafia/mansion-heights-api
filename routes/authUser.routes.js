const express = require("express");
const router = express.Router();

const authUserController = require("../controllers/authUser.controller");

router.route("/signup").get(authUserController.getUserSignUpForm).post(authUserController.postUserSignUp);
router.route("/login").get(authUserController.getLoginForm).post(authUserController.postUserLogin);
router.route("/logout").post(authUserController.logout);

router.route("/reset").get(authUserController.resetPasswordForm).post(authUserController.resetPassword);
router.route("/reset/:token").get(authUserController.newPasswordForm);
router.route("/new-password").post(authUserController.postNewPassword);

module.exports = router;
