const express = require("express");
// import mongoose
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// Connection
mongoose
  .connect("mongodb://localhost:27017/youtubeUserDatabase")
  .then(function () {
    console.log("Database is connected properly.");
  })
  .catch(function (err) {
    console.log(`Unable to connect database with express. Error :- ${err}`);
  }); 

// Schema
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
});

// Model
const user = mongoose.model("user", userSchema);

// To view all Users
app.get("/", async (req, res) => {
  const allUsers = await user.find({});
  res.status(200).json(allUsers);
});

// To find user
app.get("/:id", async (req, res) => {
  const userData = await user.findById(req.params.id);
  res.json(userData);
});

// To create User
app.post("/", (req, res) => {
  const data = new user({
    firstName: "Safi",
    email: "m.safi@outlook.com",
    jobTitle: "Software Engineer",
    gender: "Male",
  });
  data.save();
  return res.status(201).json({ status: "Data Added" });
});

// To delete User
app.delete("/:id", async (req, res) => {
  await user.findByIdAndDelete(req.params.id);
  return res.json({ status: "Done" });
});

// To update User
app.patch("/:id", async (req, res) => {
  const updatedUser = await user.findByIdAndUpdate(
    req.params.id,
    { lastName: "i fucking changed again" },
    { new: true } // Option to return the updated document
  );
  return res.json({ status: "Done Updating" });
});

app.listen(port, function () {
  console.log("Server on port 3000");
});