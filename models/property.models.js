const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  image_url: {
    type: String,
    required: true,
    trim: true,
  },
  home_owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    //required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  property_type: {
    type: String,
    enum: ["1 Bedroom Flat", "Self Contain", "1 Room", "2 Bedroom Flat"],
  },
  view_count: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["available", "rented"],
  },
  features: {
    type: Array,
  },
});

module.exports = mongoose.model("Property", propertySchema);
