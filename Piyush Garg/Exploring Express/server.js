const express = require("express");

const port = 10000;

const app = express();

app.get("/", (req, res) => {
  res.send("You are at home page");
});

app.listen(port, () => {
  console.log("Server on port 10000");
});
