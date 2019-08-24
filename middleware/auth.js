const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    const error = {};
    error.message = "This user not authentication";
    error.statusCode = 401;
    error.data = " ";
    throw error;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "Thissisnpnepenep");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    error.message = "This user not authentication";
    error.statusCode = 401;
    error.data = " ";
    throw error;
  }
  req.userId = decodedToken._id;
  next();
};
