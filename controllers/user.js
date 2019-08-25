const { User } = require("../models/user");
const { validationResult } = require("express-validator");

exports.postSignUp = async (req, res, next) => {
  try {
    const email = await User.emailExist(req.body.email, req.body.password);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = {};
      error.message = new Error("Validation Felid");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    if (!email) {
      const error = {};
      error.message = new Error("This Email already exist");
      error.statusCode = 422;
      error.data = "";
      throw error;
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      age: req.body.age
    });

    await user.save();
    res.status(200).send({
      Email: user.email,
      Name: user.name,
      Age: user.age,
      Products: user.products
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
