const express = require("express");
const mongoose = require("mongoose");
const blog = require("./models/blog");
const cookieParser = require("cookie-parser");
const path = require("path");
const { checkForAuthCookie } = require("./middlewares/auth");
const app = express();
const port = 1800;

// Routes
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve("./public")));

// Connection with DB
mongoose
  .connect("mongodb://localhost:27017/Blogify")
  .then(() => console.log("Mongo DB Connected..."));

app.set("view engine", "ejs");
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
  const allData = await blog.find({}).sort({ createdAt: -1 });
  return res.render("home", { user: req.user, blogs: allData });
});

app.listen(port, () => console.log("Server on port", port));
