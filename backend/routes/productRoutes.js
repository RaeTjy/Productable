const express = require("express");
const {
  getProductNumber,
  getProducts,
  addProduct,
  modifyProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

router.route("/find").post(getProducts);
router.route("/").post(addProduct);
router.route("/").patch(modifyProduct);
router.route("/").delete(deleteProduct);
router.route("/count").get(getProductNumber);

module.exports = router;
