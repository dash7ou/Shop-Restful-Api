const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    age: {
      type: Number,
      trim: true,
      min: 10,
      max: 255
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    products: {
      items: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
          },
          quantity: {
            type: Number,
            required: true
          }
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports.User = User;
