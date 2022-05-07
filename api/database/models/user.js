const {Schema,model} = require("mongoose"); 
const passportLocalMongoose = require("passport-local-mongoose"); 

const userSchema = new Schema({
username: {
    type: String, 
    unique: true, 
}, 
email: {
    type: String, 
},
googleid:{
    type: String,
    
} 
}, {timestamps:true})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
module.exports = model("User", userSchema); 