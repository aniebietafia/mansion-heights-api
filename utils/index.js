const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const { createTokenUser } = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");
const { capitalizeFullName, lowerCaseEmail, convertFeaturesToArray } = require("./algorithms");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  capitalizeFullName,
  lowerCaseEmail,
  convertFeaturesToArray,
};
