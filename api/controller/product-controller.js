const Product = require("../database/models/product"); 

//create a product 
const create_product = async(req,res) => {
    const categoryId = req.params.category; 
    const userId = req.params.user;
     const product = await new Product({
         name: req.body.name,
         belongsTo: userId, 
         category:categoryId, 

     })
     product.save(); 
     res.status(200).send(product);
}

//update the products 

const update_product = async(req,res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id,{$set:req.body})
   
    res.status(200).send(product); 
}

//delete a product 
const delete_product = async(req,res)=>{
    const product = await Product.findByIdAndDelete(req.params.id); 
    res.status(202).send(product); 
}

//finding a product
const find_product = async(req,res)=>{
    const productId = req.params.id
    const product = await Product.findById(productId); 
    res.status(200).send(product); 
}
module.exports = {
    create_product, 
    update_product,
    delete_product, 
    find_product, 
}

