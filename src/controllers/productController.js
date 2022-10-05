const controller = {
  productCart: (req, res) => {
    res.render("products/product-cart");
  },

  productDet: (req, res) => {
    res.render("products/product-detail");
  },

  productCre: (req, res) => {
    res.render("products/product-creation");
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
