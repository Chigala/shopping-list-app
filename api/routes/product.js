const{Router} = require("express"); 
const router = Router();
const productController = require("../controller/product-controller"); 
const product = require("../database/models/product");
const upload = require("../services/multer")

//creating a product 
router.post("/product/:user", upload.single("image"), productController.create_product)
//updating a product
router.put("/product/:id",upload.single("image"),  productController.update_product)
//deleting a product
router.delete("/product/:id/:categoryId", productController.delete_product)
//finding a product 
router.get("/product/:id", productController.find_product)
//incrementing a product quantity
router.put("/product/increment/:id", productController.increment_productQuantity)
//decrementing a product quantity 
router.put("/product/decrement/:id", productController.decrement_productQuantity)
//completing  a product quantity 
router.put("/product/completed/:id", productController.complete_product)
module.exports = router;