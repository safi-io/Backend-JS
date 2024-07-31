const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.send("You are at base page of price");
});

router.get("/:slug", (req, res) => {
  res.send(`Your are at price but at ${req.params.slug}`);
});

module.exports = router;
