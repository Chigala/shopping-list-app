const{Router} = require("express"); 
const router = Router(); 
const List = require("../database/models/list"); 
const listController = require("../controller/list-controller")

//creating a new list
router.post("/list/:user/:id",listController.create_list)

//complete list
router.put("/list/complete/:id", listController.complete_list); 

//change the name
router.put("/list/:id", listController.change_listName);

//delete list 
router.delete("/list/:id", listController.delete_list);

//remove a product
router.put("/list/remove-product/:id/:product", listController.remove_product); 

//cancel a list
router.put("/list/cancel/:id", listController.cancel_list); 

//view a full list with all the products inside
router.get("/list/:id", listController.get_fullList)
module.exports = router; 