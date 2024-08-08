const express = require("express");
const router = express.Router();
const url = require("../models/url");

router.get("/", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const allData = await url.find({ createdBy: req.user._id });
  return res.render("homepage", {
    urls: allData,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router;

module.exports = router;
