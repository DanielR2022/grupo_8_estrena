const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  productCart: (req, res) => {
    res.render("products/product-cart");
  },

  productDet: (req, res) => {
    let { id } = req.params;
    let product = products.find((product) => product.id == id);
    res.render("products/product-detail", { product, toThousand });
  },

  productCre: (req, res) => {
    res.render("products/product-creation");
  },

  productEdi: (req, res) => {
    let { id } = req.params;
    let product = products.find((product) => product.id == id);
    res.render("products/product-edition", { product, toThousand });
  },
};

module.exports = controller;
