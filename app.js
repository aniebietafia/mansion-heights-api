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
const MemoryStore = require("memorystore")(session);

// Invoking express app
const app = express();

// middlewares
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 10,
    },
  })
);

require("./config/passport")(app);

// Setting up the ejs
app.set("view engine", "ejs");
app.set("views", "views");
// or
// app.set("views", path.join(__dirname, "views"));

// Importing custom modules and mongodb
const mongodbConnection = require("./db/database");
const authUserRoute = require("./routes/authUser.routes");

// app middlewares
app.use("/mansion-heights", authUserRoute);

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
