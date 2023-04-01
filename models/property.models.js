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
    required: true,
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

module.exports = mongoose.model("Apartment", apartmentSchema);
