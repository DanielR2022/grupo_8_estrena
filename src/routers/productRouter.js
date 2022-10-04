const express = require("express");
const controller = require("../controllers/productController");
const router = express.Router();

//const controller = require("../controllers/mainController");

router.get("/productCar", controller.productCar);
router.get("/productDet", controller.productDet);

module.exports = router;
