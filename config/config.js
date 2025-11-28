const dotenv = require("dotenv");
dotenv.config();

const mongodbURI = process.env.MONGO_URI;

module.exports = { mongodbURI };
