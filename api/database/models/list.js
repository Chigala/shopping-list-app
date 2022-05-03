const {Schema,model} = require("mongoose"); 
const mongoose = require("../config");


const listSchema = new Schema({
name: String,
belongsTo:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
},
listType: {
    type: String,
    enum : ['active','completed','cancelled'],
    default: 'active'
},  
data: [{type:mongoose.Schema.Types.ObjectId,ref:"Items"}], 
}, {timestamps:true})


module.exports = model("List", listSchema); 