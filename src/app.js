//aqui requiero Express , Path y Router
const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./routers/mainRouter");
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");

app.use(express.json());

//app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

//declaro los valores estaticos , img, css
app.use(express.static(path.join(__dirname, "../public")));

//declaracion para que pueda usar - EJS
app.set("view engine", "ejs");

//declaracion de la carpeta wiews es la que tiene todas las vistas - EJS
app.set("views", path.join(__dirname, "/views"));

//declaro todas las rutas
app.use("/", mainRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

//Levanto el servidor en el puerto indicado
app.listen(3000, () => {
  console.log("Servidor levantado");
});
