const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const authLoginUserControllers = require("../controllers/auth");

router.post("/signup", userControllers.postSignUp);
router.post("/login", authLoginUserControllers.loginUser);

module.exports = router;
