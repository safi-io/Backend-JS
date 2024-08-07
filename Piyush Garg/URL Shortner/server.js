const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const analyticsRoute = require("./routes/analytics");
const staticRoute = require("./routes/static");
const { connectToMongoDB } = require("./connection");
const url = require("./models/url");

const app = express();
const port = 7700;

// Connection
connectToMongoDB("mongodb://localhost:27017/urlDB")
  .then(() => console.log("Mongo DB connected."))
  .catch(() => console.log("Mongo DB unable to connect."));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use("/", staticRoute);
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRoute);
app.use("/analytics", analyticsRoute);

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

  if (entry) {
    res.redirect(entry.redirectUrl);
  } else {
    res.json({
      status: "Invalid ID",
    });
  }
});

app.listen(port, function () {
  console.log("Server is live on Port", port);
});
