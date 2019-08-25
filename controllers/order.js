const { User } = require("../models/user");
const { Product } = require("../models/product");
const { Order } = require("../models/order");

exports.getOrders = async (req, res, next) => {};
exports.getOrder = async (req, res, next) => {};
exports.postOrder = async (req, res, next) => {
  /**
     * send like this:-
    {
        "products":[
            {"productId":"5d62911caab15259c396559a","quantity":2},
            {"productId":"5d62944ab2ab495de24a651c","quantity":2},
            {"productId":"5d629462aa3b7d5e0f4521fe","quantity":2}
        ]
    }

    */
  try {
    const productsCome = req.body.products;

    let products = [];
    productsCome.forEach(async product => {
      let productDocument = await Product.findById(product.productId);
      products.push({ product: productDocument, quantity: product.quantity });
    });

    const user = await User.findById(req.userId);

    let isTrue = [];

    products.forEach(product => {
      if (!product.product) {
        isTrue.push(false);
      } else {
        isTrue.push(true);
      }
    });

    if (isTrue.includes(false)) {
      let error = {};
      error.message = new Error("There are product not found..");
      error.statusCode = 404;
      error.data = "";
      throw error;
    }

    if (!user) {
      let error = {};
      error.message = new Error("User not found sorry :(");
      error.statusCode = 404;
      error.data = "";
      throw error;
    }

    const order = new Order({
      user: {
        userEmail: user.email,
        userId: user.id
      },
      products: products
    });
    await order.save();
    res.send({
      message: "order done correctly",
      order: order
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
