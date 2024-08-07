const express = require("express");
const path = require("path");

const app = express();
const port = 1000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.get("/", (req, res) => {
  //   res.send("I am live");
  res.render("index", { fullName: "Safi" });
});

app.listen(port, () => {
  console.log("Server Running on", port);
});
