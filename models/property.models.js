const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  property_type: {
    type: String,
    enum: ["default", "1 Bedroom Flat", "Self Contain", "1 Room", "2 Bedroom Flat"],
  },
  location: {
    type: String,
    required: true,
  },
  view_count: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["under review", "approved"],
    default: "under review",
  },
  features: {
    type: Array,
  },
});

// apartmentSchema.pre("save", (userInput) => {
//   const newInput = userInput.split(", ");
//   newInput.forEach((el) => {
//     return features.push(el);
//   });
//   return features;
// });
// apartmentSchema.methods.formatFeatures = function (userInput) {
//   const newInput = userInput.split(", ");
//   newInput.forEach((el) => {
//     return features.push(el);
//   });
//   return features;
// };

module.exports = mongoose.model("Apartment", apartmentSchema);
