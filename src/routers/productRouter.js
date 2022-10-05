const express = require("express");
const controller = require("../controllers/productController");
const router = express.Router();

//const controller = require("../controllers/mainController");

router.get("/product-cart", controller.productCart);
router.get("/product-detail", controller.productDet);
router.get("/product-creation", controller.productCre);

module.exports = router;
