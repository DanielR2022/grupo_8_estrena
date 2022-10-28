const express = require("express");
const controller = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const validationProduct = require("../middlewares/productMiddleware");
//const controller = require("../controllers/mainController");

//configuracion de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
    // cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//ejecucion de multer
const upload = multer({ storage });

/*** GET ONE PRODUCT ***/
router.get("/product-detail/:id", controller.productDet); // punto 3 sprint 4

/*** EDIT ONE PRODUCT ***/
router.get("/product-edition/:id", controller.productEdi); // punto 5 sprint 4
router.put(
  "/product-edition/:id",
  upload.single("image"),
  validationProduct,
  controller.productUpdate
); // punto 6 sprint 4

router.get("/product-cart", controller.productCart);

/*** CREATE ONE PRODUCT ***/
router.get("/product-creation", controller.productCre); // punto 2 sprint 4
router.post(
  "/product-creation",
  upload.single("image"),
  validationProduct,
  controller.productStore
); // punto 64sprint 4

module.exports = router;
