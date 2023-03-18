// Importing node core modules
const path = require("path");

// Importing npm modules
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const chalk = require("chalk");
// const debug = require("debug")("app");

// Invoking express app
const app = express();

// middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Setting up the ejs
app.set("view engine", "ejs");
app.set("views", "views");
// or
// app.set("views", path.join(__dirname, "views"));

// Importing custom modules and mongodb
const mongodbConnection = require("./db/database");
const authUserRoute = require("./routes/client.routes");

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
