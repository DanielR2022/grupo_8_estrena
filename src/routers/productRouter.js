const express = require("express");
const controller = require("../controllers/productController");
const router = express.Router();

//const controller = require("../controllers/mainController");

/*** GET ONE PRODUCT ***/

router.get("/product-detail/:id", controller.productDet);

/*** EDIT ONE PRODUCT ***/
//router.get("/edit/:id", productsController.edit);
//router.patch("/edit/:id", productsController.update);

router.get("/product-cart", controller.productCart);

router.get("/product-creation", controller.productCre);
router.get("/product-edition", controller.productEdi);

module.exports = router;
