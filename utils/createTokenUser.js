const createTokenUser = (user) => {
  return { fullName: user.fullName, userId: user._id };
};
module.exports = {
  createTokenUser,
};
