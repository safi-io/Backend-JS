const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      requires: true,
    },
  },
  { timestamps: true }
);

// Model
const user = mongoose.model("user", userSchema);

module.exports = user;
