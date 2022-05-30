const { Schema, model } = require('mongoose')
const mongoose = require('../config')

const itemSchema = new Schema(
  {
    name: String,
    description: String,
    photoUrl: String,
    cloudinaryId: String,
    quantity: {
      type: Number, 
      default: 1, 
    },
    completed:{
      type: Boolean, 
      default: false, 
    }, 
    belongsTo: { type: mongoose.Types.ObjectId, ref: 'User' },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    categoryName: String,
  },
  { timestamps: true }
)

module.exports = model('Items', itemSchema)
