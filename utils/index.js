const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const { createTokenUser } = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");
const { capitalizeFullName, lowerCaseEmail, convertFeaturesToArray } = require("./algorithms");
const sendResetPasswordEmail = require("./sendResetPasswordEmail");
const createHash = require("./createHash");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  capitalizeFullName,
  lowerCaseEmail,
  convertFeaturesToArray,
  sendResetPasswordEmail,
  createHash,
};
