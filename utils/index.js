const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const { createTokenUser } = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");
const { capitalizeFullName, lowerCaseEmail } = require("./setup");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  capitalizeFullName,
  lowerCaseEmail,
};
