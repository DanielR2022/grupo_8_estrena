const controller = {
  productCar: (req, res) => {
    res.render("products/productCar");
  },

  productDet: (req, res) => {
    res.render("products/productDet");
  },
};

module.exports = controller;

/*
app.get("/productCar", (req, res) => {
  res.sendFile(path.resolve("./src/views/productCar.html"));
});

app.get("/productDet", (req, res) => {
  res.sendFile(path.resolve("./src/views/productDet.html"));
});
*/
