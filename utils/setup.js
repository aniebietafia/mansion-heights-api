const capitalizeFullName = (fullName) => {
  const strArr = fullName.split(" ");
  const capitalizeFirstLetters = strArr.map((element) => {
    return element.substring(0, 1).toUpperCase() + element.substring(1).toLowerCase();
  });
  return capitalizeFirstLetters.join(" ");
};

const lowerCaseEmail = (email) => {
  return email.toLowerCase();
};

module.exports = {
  capitalizeFullName,
  lowerCaseEmail,
};
