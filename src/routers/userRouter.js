const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const validationUserCreation = require("../middlewares/userMiddlewareCreation");
const userLogMiddleware = require("../middlewares/userLogMiddleware");
const userVisitMiddleware = require("../middlewares/userVisitMiddleware");
const validationUserLogin = require("../middlewares/userMiddlewareLogin");

//configuracion de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/users");
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

/*** REGISTER ONE USER ***/
router.get("/user-register", userLogMiddleware, controller.register);
router.post(
  "/user-register",
  upload.single("image"),
  validationUserCreation,
  controller.userStore
);

router.get("/user-login", userLogMiddleware, controller.login);
router.post("/user-login", validationUserLogin, controller.prosLogin);

router.get("/user-profile", userVisitMiddleware, controller.profile);

router.get("/logout", controller.logout);

module.exports = router;
