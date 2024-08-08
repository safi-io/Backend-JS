const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const url = require("./models/url");

const app = express();
const port = 4500;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connection to Database
mongoose
  .connect("mongodb://localhost:27017/urlDB")
  .then(() => console.log("Database Connected..."))
  .catch(() => console.log("Database not Connected..."));

// Routes
app.use("/", staticRoute);
app.use("/url", urlRoute);

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
  res.redirect(entry?.redirectUrl);
});

app.listen(port, () => console.log("Server on Port", port));
