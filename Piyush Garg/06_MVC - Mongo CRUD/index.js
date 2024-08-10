const express = require("express");
const { logReqRes } = require("./middlewares");
const { connectMongoDB } = require("./connection");
const usersRouter = require("./routes/users.js");

const port = 5000;
const app = express();

// Connection
connectMongoDB("mongodb://localhost:27017/testDB");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes("log.txt"));

// HomePage Request
app.get("/", (req, res) => {
  res.send("HomePage");
});

// Users Request
app.use("/users", usersRouter);

// Listen Port
app.listen(port, () => {
  console.log("Server at Port: ", port);
});
