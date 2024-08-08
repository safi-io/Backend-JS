const shortid = require("shortid");
const url = require("../models/url");

async function handleGenerateNewUrl(req, res) {
  const body = req.body;
  const shortID = shortid();

  if (!body.url) {
    return res.json({ status: "Enter url" });
  }

  await url.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.redirect("/");
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await url.findOne({ shortId });

  return res.json({
    "Total Clicks": result.visitHistory.length,
  });
}

module.exports = {
  handleGenerateNewUrl,
  handleGetAnalytics,
};
