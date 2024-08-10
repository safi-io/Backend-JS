const express = require("express");
const {
  handleGenerateNewUrl,
  handleGetAnalytics,
} = require("../controllers/url");

const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.post("/", handleGenerateNewUrl);

router.get("/analytics/:shortId", restrictTo(["ADMIN"]), handleGetAnalytics);

module.exports = router;
