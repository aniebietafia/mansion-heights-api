const mongoose = require("mongoose");
require("dotenv").config();

// Connection to mongodb database
const mongodbConnection = (MONGODB_URL) => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(MONGODB_URL, {
      dbName: process.env.dbName,
    })
    .then((result) => {
      console.log("Database connection established.");
    })
    .catch((error) => {
      console.log("Failed to connect to database.");
      console.log(error);
    });
};

module.exports = mongodbConnection;
