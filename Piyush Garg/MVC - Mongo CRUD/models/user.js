const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

// Model
const user = mongoose.model("user", userSchema);

module.exports = user;
