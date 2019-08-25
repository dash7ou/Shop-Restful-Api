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
    const productNew = [{ product: product._id, quantity: 1 }];

    user.products.items.push(...productNew);

    await user.save();
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

exports.putProduct = async (req, res, next) => {
  try {
    const allowUpdate = ["name", "photo", "description", "price"];
    const requireUpdate = Object.keys(req.body);

    const isValidateToUpdate = requireUpdate.every(update =>
      allowUpdate.includes(update)
    );

    if (!isValidateToUpdate) {
      const error = {};
      error.message = new Error("make sure what you want to update :)");
      error.statusCode = 422;
      error.data = "";
      throw error;
    }
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      const error = {};
      error.message = new Error("No product to delete it..");
      error.statusCode = 422;
      error.data = "";
      throw error;
    }
    if (product.author.toString() !== req.userId.toString()) {
      const error = {};
      error.message = new Error(
        "This user cant update this product you are not owner.."
      );
      error.statusCode = 422;
      error.data = "";
      throw error;
    }

    requireUpdate.forEach(update => (product[update] = req.body[update]));
    await product.save();
    res.send({
      message: "successfully update product!",
      product: product
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = {};
      error.message = new Error("No product to delete it..");
      error.statusCode = 404;
      error.data = "";
      throw error;
    }
    if (product.author.toString() !== req.userId.toString()) {
      const error = {};
      error.message = new Error(
        "This user cant delete this product you are not owner.."
      );
      error.statusCode = 422;
      error.data = "";
      throw error;
    }

    await Product.findOneAndDelete({
      _id: product._id,
      author: req.userId
    });
    res.send({
      message: "Deleted Product!",
      product: product
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
