const express = require("express");
const router = express.Router();
const { handleUserSignup } = require("../controllers/userControllers");
router.post("/", handleUserSignup);

module.exports = router;
