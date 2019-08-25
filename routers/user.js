const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const authLoginUserControllers = require("../controllers/auth");
const { body } = require("express-validator");
const isAuth = require("../middleware/auth");

router.post(
  "/signup",
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 5, max: 50 }),
    body("email")
      .isEmail()
      .normalizeEmail()
      .trim(),
    body("password")
      .not()
      .isEmpty()
      .trim(),
    body("age")
      .not()
      .isEmpty()
      .isFloat()
  ],
  userControllers.postSignUp
);
router.post("/login", authLoginUserControllers.loginUser);
router.get("/me", isAuth, userControllers.getUserProfile);

module.exports = router;
