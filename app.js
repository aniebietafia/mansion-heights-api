// Importing node core modules
const path = require("path");

// Importing npm modules
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const chalk = require("chalk");
// const debug = require("debug")("app");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

// Invoking express app
const app = express();

// Importing custom modules and mongodb
const mongodbConnection = require("./db/database");
const authUserRoute = require("./routes/authUser.routes");
const propertyRoute = require("./routes/property.routes");
const sessionMiddleware = require("./middlewares/session.middleware");
const flashMiddleware = require("./middlewares/flash.middleware");

// middlewares
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionMiddleware));
app.use(flash(flashMiddleware));

require("./config/passport")(app);

// Setting up the ejs
app.set("view engine", "ejs");
app.set("views", "views");
// or
// app.set("views", path.join(__dirname, "views"));

// app middlewares
app.use("/mansion-heights", authUserRoute);
app.use("/mansion-heights/apartments", propertyRoute);

const PORT = process.env.PORT || 8000;

const start = () => {
  try {
    mongodbConnection(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${chalk.blue(PORT)}`);
      // debug(`server running on http://localhost:${chalk.blue(PORT)}`);
    });
  } catch (error) {
    // console.log(error);
    debug(error);
  }
};
start();
