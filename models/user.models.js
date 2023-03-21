const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
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
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Prefer not to say"],
    },
    tel_number: {
      type: Number,
      required: true,
    },
    user_type: {
      type: String,
      enum: ["Home Owner", "Student"],
      required: true,
    },
  },
  { timestamps: true }
);

// UserSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(12);
//   this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model("User", UserSchema);
