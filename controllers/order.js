const { User } = require("../models/user");
const { Product } = require("../models/product");
const { Order } = require("../models/order");

exports.getOrders = async (req, res, next) => {
  try {
    const userId = req.userId;
    const orders = await Order.find();

    let ordersUser = [];
    orders.forEach(order => {
      if (order.user.userId.toString() === userId.toString()) {
        ordersUser.push(order);
      }
    });
    res.send({
      message: "Fetch orders done.",
      orders: ordersUser
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      let error = {};
      error.message = new Error("No order found...");
      error.statusCode = 404;
      error.data = "";
      throw error;
    }
    if (order.user.userId.toString() === req.userId.toString()) {
      let error = {};
      error.message = new Error("user not owner a order..");
      error.statusCode = 422;
      error.data = "";
      throw error;
    }

    res.send({
      message: "Fetching orders done.",
      order: order
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
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
    let totalPrice = 0;
    products.forEach(
      product => (totalPrice += product.product.price * product.quantity)
    );

    const order = new Order({
      user: {
        userEmail: user.email,
        userId: user.id
      },
      products: products,
      totalPrice: totalPrice
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
