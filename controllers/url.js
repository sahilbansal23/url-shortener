const { nanoid } = require("nanoid");

const URL = require("../models/url");

const generateShorturl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "redirectUrl is required" });
    }

    // Generate a short ID (you can use any method you prefer)
    const shortId = nanoid(8);

    await URL.create({
      shortId: shortId,
      redirectUrl: url,
    });

    // Respond with the shortened URL
    res
      .status(201)
      .json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortId}` });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
};

const getMainUrl = async (req, res) => {
  const { shortId } = req.params;
  console.log(`url entry short url ${shortId}`);

  try {
    const urlEntry = await URL.findOne({ shortId });
    if(urlEntry===null){
      return res.status(404).json({ message: "URL not found" });
    }
    // console.log(`url entry found ${urlEntry}`);

    if (urlEntry) {
      // Log the visit with a timestamp
      urlEntry.visitHistory.push({ timestamp: Date.now() });
      await urlEntry.save();

      // Redirect to the original URL
      return res.redirect(urlEntry.redirectUrl);
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Server error" });
  }
};

const getUrlStats = async (req, res) => {
  const { shortId } = req.params;

  try {
    const urlEntry = await URL.findOne({ shortId });

    if (!urlEntry) {
      return res.status(404).json({ message: "URL not found" });
    }

    if (urlEntry) {
      return res.status(200).json({
        redirectUrl: urlEntry.redirectUrl,
        visitCount: urlEntry.visitHistory.length,
        visitHistory: urlEntry.visitHistory,
      });
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { generateShorturl, getMainUrl, getUrlStats };
