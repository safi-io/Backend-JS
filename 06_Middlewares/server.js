const express = require("express");
const app = express();

const port = 3000;

// Serve static files from the 'public' directory
// This is a built-in middleware function in Express
app.use(express.static("public"));

// Custom middleware function
const myLogger = function (req, res, next) {
  // This middleware will be executed for every request to the server
  console.log(`I am from the middleware myLogger and my type is ${req.method}`);
  // Call next() to pass control to the next middleware function
  next();
};

// Use the custom middleware
app.use(myLogger);

app.get("/", (req, res) => {
  res.send("You are at main page");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
