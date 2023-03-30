const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication failed");
  }
  try {
    const { fullName, userId, role } = isTokenValid({ token });
    req.user = { fullName, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication failed");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role !== "Student")) {
      throw new CustomError.UnauthorizedError("You're not authorized to access this resource.");
    }
    next();
  };
};

// const authorizePermissions = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       throw new CustomError.UnauthorizedError("You're not authorized to access this resource.");
//     }
//     next();
//   };
// };

module.exports = {
  authenticateUser,
  authorizePermissions,
};
