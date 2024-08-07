const shortid = require("shortid");
const url = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required." });
  }

  const shortID = shortid();
  await url.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });

  const allData = await url.find({});

  return res.render("submitRedirect", {
    redirectUrl: body.url,
    shortID: shortID,
    urls: allData,
  });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.slug;
  const entry = await url.findOne({
    shortId,
  });

  if (entry) {
    res.json({ VistiorCount: entry.visitHistory.length });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleAnalytics,
};
