const mongoose = require("mongoose");

// Method 1 using async await
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

// Method 2 using promises
// const mongodbConnection = (MONGODB_URL) => {
//   mongoose.set("strictQuery", false);

//   mongoose
//     .connect(MONGODB_URL)
//     .then(() => {
//       console.log("Database connection established.");
//     })
//     .catch((error) => {
//       console.log("Failed to connect to database.");
//       console.log(error);
//     });
// };

module.exports = mongodbConnection;
