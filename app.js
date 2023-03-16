// Importing node core modules
const path = require("path");

// Importing npm modules
const express = require("express");
require("dotenv").config();

// Invoking express app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Importing custom modules and mongodb
const mongodbConnection = require("./db/database");

const PORT = process.env.PORT || 8000;

const start = () => {
  try {
    mongodbConnection(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
