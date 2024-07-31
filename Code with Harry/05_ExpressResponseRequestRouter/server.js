const express = require("express");
const price = require('./routes/price');
const app = express();

const port = 3000;
app.use("/price", price);

app.get("/", (req, res) => {
  res.send("Hello from World Safi Khan");
});

app.get("/main", (req, res) => {
  res.sendFile("templates/main.html", { root: __dirname });
});

app.post("/source", (req, res) => {
  res.send("POST Request Done.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
