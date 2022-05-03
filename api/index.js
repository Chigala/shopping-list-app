const express = require("express"); 
const app = express();
const User = require(".//database/models/user");
const cors = require("cors")
const passport = require("passport"); 
require("./middlewares/passportAuth/password-jwt")
const cookie = require("cookie-parser");
const cookieSession = require("cookie-session");
require("dotenv").config(); 
const sessionKey = process.env.SESSION_KEY; 
///the mongoDB config file 
require("../api/database/config"); 

///the user route config file
const userRoute = require(".//routes/user"); 

//the category route config file
const categoryRoute = require("./routes/category")

//the list route config file
const listRoute = require("./routes/list"); 

//the product route config file 
const productRoute = require("./routes/product"); 

//json parser
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
//cookie parser
app.use(cookie()); 

//sessions for storing the sessions
app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [sessionKey],
    })
  );

  

app.use(passport.initialize())
app.use(passport.session())



//setting up passport-local-mongoose plugin 
passport.use(User.createStrategy());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//route middlewares
app.use("/api", userRoute);
 
app.use("/api", categoryRoute); 
app.use("/api", listRoute); 
app.use("/api", productRoute);



//server connection
app.listen(5000,()=> {
    console.log("this port is currently running")
})