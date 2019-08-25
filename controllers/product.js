const { Product } = require("../models/product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    console.log(products);
    if (!products) {
      const error = {};
      error.message = new Error("No products found...");
      error.statusCode = 404;
      error.data = "";
      console.log("dsdasa");
      throw error;
    }
    res.status(200).send({
      Message: "Successful in fetching data",
      products: products
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const id = req.params.id.toString();
    const product = await Product.findById(id);
    if (!product) {
      const error = {};
      error.message = new Error("No product found...");
      error.statusCode = 404;
      error.data = "";
      throw error;
    }

    res.status(200).send({
      Message: "Successful in fetching data",
      Product: product
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postProduct = async (req, res, next) => {
  // const
};

exports.putProduct = async (req, res, next) => {};

exports.deleteProduct = async (req, res, next) => {};
