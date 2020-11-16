const express = require("express");

const authController = require("../controllers/authController");

const productController = require("../controllers/productController");

const router = express.Router();

router.route("/all").get(productController.getAllProducts);

router.route("/create").post(
  //authController.protect,
  //authController.restrictTo("user", "admin"),
  productController.createProduct
);

router
  .route("/one/:id")
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    productController.deleteProduct
  );

module.exports = router;
