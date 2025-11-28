const mongoose = require("mongoose");
async function connectToMongoDB(URL) {
  await mongoose.connect(URL);
  console.log("Connected to database");
}
module.exports = { connectToMongoDB };
