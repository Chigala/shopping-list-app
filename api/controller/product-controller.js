const Product = require('../database/models/product')
const cloudinary = require('../services/cloudinary-config')
const Category = require('../database/models/category')

//create a product
const create_product = async (req, res) => {
  const userId = req.params.user
  let result
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'shopping list images'
    })
  }
  const category = await Category.findOne({ name: req.body.category })
  if (category) {
    const product = await new Product({
      name: req.body.name,
      belongsTo: userId,
      category: category._id,
      categoryName: category.name,
      description: req.body.description,
      photoUrl: result?.secure_url,
      cloudinaryId: result?.public_id
    })
    product.save()
    category.items.push(product._id)
    category.save()
    res.status(200).json(product)
  } else {
    const category = await new Category({
      name: req.body.category,
      belongsTo: userId
    })

    const product = await new Product({
      name: req.body.name,
      belongsTo: userId,
      category: category._id,
      categoryName: category.name,
      description: req.body.description,
      photoUrl: result?.secure_url,
      cloudinaryId: result?.public_id
    })
    product.save()
    category.items.push(product._id)
    category.save()
    res.status(200).json(product)
  }
}

//update the products

const update_product = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id)
  await cloudinary.uploader.destroy(product.cloudinaryId)
  let result
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'shopping list images'
    })
  }
  const data = {
    name: req.body.name || product.name,
    description: req.body.description || product.description,
    imageUrl: result?.secure_url || product.imageUrl,
    completed: req.body.completed || false,
    cloudinaryId: result?.public_id || product.cloudinaryId
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, data, {
    new: true
  })

  res.status(200).send(updatedProduct)
}

//delete a product
const delete_product = async (req, res) => {
  const categoryId = req.params.categoryId
  const product = await Product.findByIdAndDelete(req.params.id)
  await Category.findOneAndUpdate(
    { id: categoryId },
    { $pull: { items: req.params.id } }
  )
  await cloudinary.uploader.destroy(product.cloudinaryId)
  res.status(202).send(product)
}

//finding a product
const find_product = async (req, res) => {
  const productId = req.params.id
  const product = await Product.findById(productId)
  res.status(200).send(product)
}
module.exports = {
  create_product,
  update_product,
  delete_product,
  find_product
}
