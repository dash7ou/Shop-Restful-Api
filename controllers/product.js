const { Product } = require("../models/product");
const { User } = require("../models/user");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (!products) {
      const error = {};
      error.message = new Error("No products found...");
      error.statusCode = 404;
      error.data = "";

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
  try {
    const user = await User.findById(req.userId);
    const name = req.body.name;
    const photo = req.body.photo;
    const description = req.body.description;
    const price = req.body.price;

    if (!user) {
      const error = {};
      error.message = new Error("There are problem to add product");
      error.statusCode = 422;
      error.data = "";
      throw error;
    }

    if (!photo || !name || !description || !price) {
      const error = {};
      error.message = new Error(
        "There are problem to add product make sure every require filed.."
      );
      error.statusCode = 422;
      error.data = "";
      throw error;
    }

    const product = new Product({
      name: name,
      photo: photo,
      description: description,
      price: price,
      author: user._id
    });

    await product.save();

    res.send({
      message: "Successfully create new product",
      product: product
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putProduct = async (req, res, next) => {};

exports.deleteProduct = async (req, res, next) => {};
