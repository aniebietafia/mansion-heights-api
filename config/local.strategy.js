const passport = require("passport");
const { Strategy } = require("passport-local");

module.exports = function locaStrategy() {
  passport.use(
    new Strategy(
      {
        firstNameField: "first_name",
        lastNameField: "last_name",
        emailField: "email",
        passwordField: "password",
        genderField: "gender",
        phoneNumberField: "tel_number",
      },
      (first_name, last_name, email, password, gender, tel_number) => {
        const user = { first_name, last_name, email, password, gender, tel_number };
        done(null, user);
      }
    )
  );
};
