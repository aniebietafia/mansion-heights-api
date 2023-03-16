const mongoose = require("mongoose");

const mongodbConnection = async (MONGODB_URL) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database connection established");
  } catch (error) {
    console.log("Failed to connect to database");
    console.log(error);
  }
};

module.exports = mongodbConnection;
