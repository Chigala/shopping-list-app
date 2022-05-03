const { findById } = require("../database/models/list");
const List = require("../database/models/list"); 

//creating a new list
const create_list = async(req,res) => {
    const productId = req.params.id;
    const userId = req.params.user
    const userList = await List.findOne({belongsTo:userId,listType:"active"})
    //if there is already an active list just push the product id to the items
    if(userList){
        userList.data.push(productId); 
        userList.save(); 
        res.status(200).send(userList); 
    }
    else{
        const{name} = req.body; 
        const list = await new List({
            name,
            belongsTo:userId,
        })

        list.data.push(productId)
         list.save();
        res.status(200).send(list);  
    }
}
//completing the list and then changing the name;
const complete_list = async(req,res)=> {
     const listId = req.params.id; 
     const list = await List.findById(listId); 
     list.listType = "completed";
     list.save(); 
     res.status(200).send(list); 
}

//change list name
const change_listName = async(req,res) => {
    const listId = req.params.id; 
    const list = await List.findById(listId); 
    list.name = req.body.name;
    list.save(); 
    res.status(200).json(list);

}

//cancel list
const cancel_list = async(req,res) => {
    const listId = req.params.id;
    const list = await List.findById(listId); 
    list.listType = "cancelled"; 
    list.save(); 
    res.status(200).json(list); 
}

//delete list
const delete_list = async(req,res)=> {
    const listId = req.params.id; 
    const list = await List.findByIdAndDelete(listId); 
    res.status(202).json(list); 

}

//get full list
const get_fullList = async(req,res)=> {
    const listId = req.params.id; 
    const list = await List.findById(listId).populate("data"); 
    res.status(200).json(list); 
}
//remove a product from the list 
const remove_product = async(req,res) => {
    const productId = req.params.product;
    const listId = req.params.id; 
    const list = await List.findByIdAndUpdate(listId,{$pull:{data:productId}},{new:true}); 
    res.status(200).json(list); 
}
module.exports={
    create_list,
    complete_list,
    change_listName,
    cancel_list, 
    delete_list,
    get_fullList, 
    remove_product
}