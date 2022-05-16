const{Router} = require("express"); 
const router = Router();
const productController = require("../controller/product-controller") 
const upload = require("../services/multer")

//creating a product 
router.post("/product/:user/:category",upload.single("image"), productController.create_product)
//updating a product
router.put("/product/:id",upload.single("image"),  productController.update_product)
//deleting a product
router.delete("/product/:id", productController.delete_product)
//finding a product 
router.get("/product/:id", productController.find_product)
module.exports = router;