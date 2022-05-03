const { Schema, model } = require('mongoose')
const mongoose = require('../config')

const categorySchema = new Schema(
  {
    name: String,

    belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Items' }]
  },
  { timestamps: true }
)

module.exports = model('Category', categorySchema)
