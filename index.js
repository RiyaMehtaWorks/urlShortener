const express = require("express");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/urlModel");
const urlRoute = require("./routes/urlRoutes");
const { mongodbURI } = require("./config/config");

const app = express();
const PORT = 8000;

connectToMongoDB(mongodbURI);

app.use(express.json());
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
