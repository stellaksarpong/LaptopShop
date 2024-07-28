const router = require("express").Router();
const productController = require("../controllers/product.controller");

router.get("/product", productController.getProducts);
router.post("/product", productController.postProduct);
router.get("/detail/:id", productController.getSingleProductDetails);

module.exports = router;
