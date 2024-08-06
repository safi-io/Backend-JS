const express = require("express");

const {handleAnalytics} = require('../controllers/url')

const router = express.Router();

router.get("/:slug", handleAnalytics);

module.exports = router;
