const express = require("express");
const router = express.Router();
const url = require("../models/url");

router.get("/", async (req, res) => {
  const allData = await url.find({});
  return res.render("homepage", {
    urls: allData,
  });
});

module.exports = router;
