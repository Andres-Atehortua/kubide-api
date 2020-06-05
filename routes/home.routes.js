//Express imports
const express = require("express");
const router = express.Router();
// Controller
const { HomeController } = require("./../controllers");

router.get("/", HomeController.index);

module.exports = router;
