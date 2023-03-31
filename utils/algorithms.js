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

// Algorithm to format the features input field and store it in the database as an array
const convertFeaturesToArray = (userInput) => {
  const arrayOfFeatures = userInput.split(",");
  const removeWhiteSpaces = arrayOfFeatures.map((feature) => {
    return feature.trim().substring(0, 1).toUpperCase() + feature.substring(1).toLowerCase();
  });
  return removeWhiteSpaces;
};

module.exports = {
  capitalizeFullName,
  lowerCaseEmail,
  convertFeaturesToArray,
};
