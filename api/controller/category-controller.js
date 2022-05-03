const Category = require("../database/models/category"); 

//create a category
const create_category = async(req,res) => {
    const userID = req.params.id;
    const category = await new Category({
      name: req.body.name,
      belongsTo: userID
    });
    category.save(); 
    res.status(200).json(category);
}
//update the category
const update_category = async(req,res)=> {
    const categoryId = req.params.id
    const userCategory = await Category.findById(categoryId); 
    userCategory.name = req.body.name; 
    userCategory.save();  
    res.status(200).send(userCategory); 
}

//deleting the category
const delete_category = async(req,res)=> {
     const categoryId = req.params.id; 
     const category = await Category.findByIdAndDelete(categoryId); 
     res.status(202).send(category); 
}

//pushing the product id when a new product is added to the present user
const update_product = async(req,res)=> {
    const productId = req.params.id;
    const categoryId = req.params.category; 
    const category = await Category.findById(categoryId); 
    category.items.push(productId); 
    category.save()
    res.status(200).send(category); 
}

//finding all the categories that matches the current users
const find_category = async(req,res)=>{
    const userId = req.params.id; 
    const category = await Category.find({belongsTo:userId}).populate("items"); 
    res.status(200).send(category); 
}
module.exports = {
    create_category,
    update_category, 
    delete_category,
    update_product, 
    find_category
}