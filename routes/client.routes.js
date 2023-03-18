const express = require("express");
const router = express.Router();

const authUserController = require("../controllers/auth-user.controller");

router.route("/").get(authUserController.indexPage);

// router.route("/client-register").get(authUserController.getClientSignupForm).post(authUserController.postClientSignup);

router
  .route("/client-register")
  .get(authUserController.getClientRegisterForm)
  .post(authUserController.postClientRegister);

router
  .route("/landlord-register")
  .get(authUserController.getLandlordRegisterForm)
  .post(authUserController.postLandlordRegister);

module.exports = router;
