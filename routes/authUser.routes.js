const express = require("express");
const router = express.Router();

const authUserController = require("../controllers/authUser.controller");

router.route("/").get(authUserController.indexPage);

// router.route("/client-register").get(authUserController.getClientSignupForm).post(authUserController.postClientSignup);

router
  .route("/client-register")
  .get(authUserController.getClientRegisterForm)
  .post(authUserController.postClientRegister);

router
  .route("/adminUser-register")
  .get(authUserController.getadminUserRegisterForm)
  .post(authUserController.postadminUserRegister);

module.exports = router;
