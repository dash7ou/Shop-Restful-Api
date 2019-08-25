const productController = require("../controllers/product");
const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

router.get("/", isAuth, productController.getProducts);
router.get("/:id", isAuth, productController.getProduct);
router.post("/product", isAuth, productController.postProduct);
router.put("/product/:id", isAuth, productController.putProduct);
router.delete("/product/:id", isAuth, productController.deleteProduct);

module.exports = router;
