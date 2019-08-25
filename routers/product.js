const productController = require("../controllers/product");
const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

router.get("/", isAuth, productController.getProducts);
router.get("/:id", isAuth, productController.getProduct);
router.post("/", isAuth, productController.postProduct);
router.put("/:id", isAuth, productController.putProduct);
router.delete("/:id", isAuth, productController.deleteProduct);

module.exports = router;
