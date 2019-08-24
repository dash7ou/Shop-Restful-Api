const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    userEmail: {
      type: String,
      required: true
    },
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);

module.exports.Order = Order;
