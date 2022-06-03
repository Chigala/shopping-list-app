const{Router} = require("express"); 
const router = Router(); 
const List = require("../database/models/list"); 
const listController = require("../controller/list-controller")

//creating a new list
router.post("/list/:list/:id",listController.create_list)

//complete list
router.put("/list/complete/:userId/:id", listController.complete_list); 

//change the name
router.put("/list/:id", listController.change_listName);

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
module.exports = router; 