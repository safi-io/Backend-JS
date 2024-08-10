const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");

const url = require("./models/url");
const { restrictToLogIn, checkAuth } = require("./middlewares/auth");

const app = express();
const port = 4500;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connection to Database
mongoose
  .connect("mongodb://localhost:27017/urlDB")
  .then(() => console.log("Database Connected..."))
  .catch(() => console.log("Database not Connected..."));

// Routes
app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/url", checkAuth, urlRoute);

// Redirection Get Request
app.get("/:slug", async (req, res) => {
  const shortId = req.params.slug;
  const entry = await url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  return res.redirect(entry?.redirectUrl);
});

app.listen(port, () => console.log("Server on Port", port));
