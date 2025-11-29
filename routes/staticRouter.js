const express = require("express");
const URL = require("../models/urlModel");
const router = express.Router();
// const URL = require("../models/urlModel");

router.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", { urls: allUrls });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

module.exports = router;
