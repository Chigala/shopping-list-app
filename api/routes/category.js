const{Router} = require("express"); 
const router = Router(); 
const categoryController = require("../controller/category-controller"); 

///creating a new Category
router.post("/category/:id",categoryController.create_category)

/// updating the category
router.put("/category/:id",categoryController.update_category)

//deleting the category 
router.delete("/category/:id",categoryController.delete_category)

//add a product to the category when a new product is added
router.put("/category/:id/:category", categoryController.update_product)

//view all the categories of a particular user
router.get("/category/:id", categoryController.find_category)
module.exports = router; 