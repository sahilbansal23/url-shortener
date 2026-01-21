const express = require("express");

const router = express.Router();
const URL = require("../models/url");
const urlcontroller = require("../controllers/url");

router.post("/shorten-url", urlcontroller.generateShorturl);

// Route to handle redirection
router.get("/:shortId", urlcontroller.getMainUrl);
router.get("/stats/:shortId", urlcontroller.getUrlStats);

module.exports = router;
