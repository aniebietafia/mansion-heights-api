const createTokenUser = (user) => {
  return { first_name: user.first_name, userId: user._id };
};
module.exports = {
  createTokenUser,
};
