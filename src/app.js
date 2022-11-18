//aqui requiero Express , Path y Router
var express = require("express");
var path = require("path");

var mainRouter = require("./routers/mainRouter");
var productRouter = require("./routers/productRouter");
var userRouter = require("./routers/userRouter");
var methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE
var session = require("express-session");
const cookie = require("cookie-parser");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

//declaro los valores estaticos , img, css
app.use(express.static(path.join(__dirname, "../public")));

//declaracion para que pueda usar - EJS
app.set("view engine", "ejs");

//declaracion de la carpeta wiews es la que tiene todas las vistas - EJS
app.set("views", path.join(__dirname, "/views"));

app.use(cookie());

app.use(
  session({
    secret: "Pagina Estsrena secret",
    resave: false,
    saveUninitialized: true,
  })
);

//declaro todas las rutas
app.use("/", mainRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

//Levanto el servidor en el puerto indicado
app.listen(3000, () => {
  console.log("Servidor levantado");
});
