const{Router} = require("express"); 
const router = Router(); 
const List = require("../database/models/list"); 
const listController = require("../controller/list-controller")
const upload = require("../services/multer")

//creating a new list
router.post("/list/:list/:id",listController.create_list)

//get all the list(the ones that are completed and then the ones that were cancelled)
router.get("/list/get-all/:id",listController.get_AllList)

//complete list
router.put("/list/complete/:userId/:id", listController.complete_list); 

//change the name
router.put("/list/:id", upload.single("image"), listController.change_listName);

//delete list 
router.delete("/list/:id", listController.delete_list);

//remove a product
router.put("/list/remove-product/:listId/:product", listController.remove_product); 

//cancel a list
router.put("/list/cancel/:userId/:id", listController.cancel_list); 

//view the list with the products arranged according to their categories 
router.get("/list/:id", listController.get_fullList)

//view the list without the products arranged accordingly to their categories 
router.get("/list-data/:id", listController.get_list)

//view the data exactly how you can use it in chart js to do the statistics
router.get("/list-statistics-data/:id", listController.displayDailyProductStatistics)

//view the data exactly how you can use it in chart js to do the statistics
router.get("/list-category-statistics-data/:id", listController.frequencyOfCategories)
module.exports = router; 