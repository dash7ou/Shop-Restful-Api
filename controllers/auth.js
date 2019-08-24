const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.checkUser(req.body.email, req.body.password);
    if (!user) {
      const error = {};
      error.message = "This user not authentication";
      error.statusCode = 404;
      error.data = "";
    }
    const token = user.generateWebToken();
    console.log(token);

    res
      .header("x-auth-token", token)
      .status(200)
      .send({
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
