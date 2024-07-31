import express from "express";
import mongoose from "mongoose";
import { mobile } from "./models/mobile.js";

const app = express();

await mongoose.connect("mongodb://localhost:27017/mobileData");

const port = 3000;

app.get("/save", (req, res) => {
  const data = new mobile({ name: "iphone", model: 15, isBlack: true });
  data.save();
  res.send("I am live");
});

app.listen(port, () => {
  console.log("App is being listend upon on local host 3000");
});
