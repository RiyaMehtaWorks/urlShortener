const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/urlModel");
const urlRoute = require("./routes/urlRoutes");
const staticRoute = require("./routes/staticRouter");
const { mongodbURI } = require("./config/config");

const app = express();
const PORT = 8000;

connectToMongoDB(mongodbURI);
//telling express that we're using ejs as a view engine
app.set("view engine", "ejs");
//setting path to views folder
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", staticRoute);

app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
