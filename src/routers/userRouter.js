const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

router.get("/login", controller.login);
router.get("/register", controller.register);

module.exports = router;
