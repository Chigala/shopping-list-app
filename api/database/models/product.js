const { Schema, model } = require('mongoose')
const mongoose = require('../config')

const itemSchema = new Schema(
  {
    name: String,
    description: String,
    photoUrl: String,
    cloudinaryId: String,   
    quantity: {
      type: Number
    },
    completed: false,
    belongsTo: { type: mongoose.Types.ObjectId, ref: 'User' },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' }
  },
  { timestamps: true }
)

module.exports = model('Items', itemSchema)
