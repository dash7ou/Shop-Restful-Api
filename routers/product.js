const productController = require("../controllers/product");
const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");
const { body } = require("express-validator");

router.get("/", isAuth, productController.getProducts);
router.get("/:id", isAuth, productController.getProduct);
router.post(
  "/",
  isAuth,
  [
    body("name")
      .isLength({ min: 5, max: 50 })
      .trim(),
    body("description")
      .trim()
      .not()
      .isEmpty(),
    body("photo")
      .trim()
      .isURL()
      .not()
      .isEmpty(),
    body("price")
      .trim()
      .not()
      .isEmpty()
      .isFloat()
  ],
  productController.postProduct
);
router.put(
  "/:id",
  isAuth,
  [
    body("name")
      .isLength({ min: 5, max: 50 })
      .trim()
      .isEmpty(),
    body("description")
      .trim()
      .isEmpty(),
    body("photo")
      .trim()
      .isURL()
      .isEmpty(),
    body("price")
      .trim()
      .isFloat()
      .isEmpty()
  ],
  productController.putProduct
);
router.delete("/:id", isAuth, productController.deleteProduct);

module.exports = router;
