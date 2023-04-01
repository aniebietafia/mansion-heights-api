const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: process.env.DURATION });
  return token;
};

const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.SECRET);
};

// function to attach cookies to the response
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const twentyFourHours = 1000 * 60 * 60 * 24;

  // adding jwt token to the response of a created user
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + twentyFourHours),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
