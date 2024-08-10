const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 1800;

// Routes
const userRoute = require("./routes/user");

app.use(express.urlencoded({ extended: false }));

// Connection with DB
mongoose
  .connect("mongodb://localhost:27017/Blogify")
  .then(() => console.log("Mongo DB Connected..."));

app.set("view engine", "ejs");
app.use("/user", userRoute);

app.get("/", (req, res) => {
  return res.render("home");
});

app.listen(port, () => console.log("Server on port", port));
