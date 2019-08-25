const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order");
const isAuth = require("../middleware/auth");

router.get("/", isAuth, orderControllers.getOrders);
router.get("/:id", isAuth, orderControllers.getOrder);
router.post("/", isAuth, orderControllers.postOrder);

module.exports = router;
