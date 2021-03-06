const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
userSchema.statics.emailExist = async email => {
  const existEmail = await User.findOne({ email: email });
  const error = {};
  if (existEmail) {
    error.message = new Error("This email is exist try another one");
    error.statusCode = 422;
    error.data = "";
    throw error;
  }
  return email;
};

userSchema.statics.checkUser = async (email, password) => {
  const emailExist = await User.findOne({ email: email });

  if (!emailExist) {
    const error = {};
    error.message = new Error("There are problem in your email or password");
    error.statusCode = 422;
    error.data = "";
    throw error;
  }
  const passwordMatch = await bcryptjs.compare(password, emailExist.password);
  if (!passwordMatch) {
    const error = {};
    error.message = new Error(
      "There are problem in your email or password xxx"
    );
    error.statusCode = 422;
    error.data = "";
    throw error;
  }

  return emailExist;
};

userSchema.pre("save", async function(res, req, next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 12);
  }
  next();
});

userSchema.methods.generateWebToken = function() {
  const user = this;
  const webToken = jwt.sign(
    {
      _id: user._id.toString(),
      isAdmin: user.isAdmin
    },
    "Thissisnpnepenep",
    {
      expiresIn: "2h"
    }
  );
  return webToken;
};
const User = mongoose.model("User", userSchema);

module.exports.User = User;
