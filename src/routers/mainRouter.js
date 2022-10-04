const express = require("express");
const mainController = require("../controllers/mainController");
const router = express.Router();

//const mainController = require("../controllers/mainController");

router.get("/", mainController.index);

module.exports = router;
