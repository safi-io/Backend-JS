import express from "express";
import mongoose from "mongoose";
import { dummy } from "./models/dummy.js";

const app = express();
const port = 5000;

await mongoose.connect("mongodb://localhost:27017/dummyDataBase");

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

const names = [
  "safi",
  "saad",
  "asad",
  "samina",
  "ibrahim",
  "hamza",
  "umair",
  "khan",
  "zeeshan",
];

const model = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008];

const isBlack = [true, false];


app.get("/generate", function (req, res) {
  for (let i = 0; i < 5; i++) {

    const randomName = Math.floor(Math.random() * names.length);
      const randomModel = Math.floor(Math.random() * model.length);
      const randomBlack = Math.floor(Math.random() * isBlack.length);

    const data = new dummy({
      name: names[randomName],
      model: model[randomModel],
      isBlack: isBlack[randomBlack],
    });

    data.save();
  }
});

app.get("/delete", async (req, res) => {
  await dummy.deleteMany({});
});

app.listen(port, function () {
  console.log("App is being listened on port 5000");
});
