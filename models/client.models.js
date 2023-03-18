const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "This field cannot be empty."],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "This field cannot be empty."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "This email already exists"],
    },
    gender: {
      type: String,
    },
    tel_number: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
