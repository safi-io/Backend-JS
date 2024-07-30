const express = require("express");

const app = express();

const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello There");
});

// Set EJS as the view engine for rendering templates
app.set("view engine", "ejs");

// Define a route for "/data"
app.get("/data", (req, res) => {
  // Create a variable to pass to the template
  let title = "I am new here";

  // Render the 'index' template and pass the title variable
  res.render("index", { title: title });
});

app.listen(port, () => {
  console.log("Port is being listened on port 4000");
});
