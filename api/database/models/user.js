const {Schema,model} = require("mongoose"); 
const passportLocalMongoose = require("passport-local-mongoose"); 

const userSchema = new Schema({
username: {
    type: String, 
    unique: true, 
    required: true,
}, 
email: {
    type: String, 
    unique:true, 
    required: true,
} 
}, {timestamps:true})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
module.exports = model("User", userSchema); 