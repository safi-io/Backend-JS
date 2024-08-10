const express = require("express");
const user = require("../models/user");

const router = express.Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await user.create({ fullName, email, password });
  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  // Logic for sign in
  const userData = await user.matchPassword(email, password);
  console.log(userData);
  res.redirect("/");
});

module.exports = router;
