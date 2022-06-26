const express = require("express"); 
const bodyParser = require("body-parser")
const app = express();
const User = require(".//database/models/user");
const cors = require("cors")
const passport = require("passport"); 

//passport middlewares
// require("./middlewares/passportAuth/password-jwt")
require("./middlewares/passportAuth/google-auth")

//my authentication middlware
const verifyJwt = require("./middlewares/verifyJwt")

const cookie = require("cookie-parser");
const cookieSession = require("cookie-session");
require("dotenv").config(); 
const sessionKey = process.env.SESSION_KEY; 

//importing my cors credentials
const credentials = require("./middlewares/credentials")
//import your cors options
const corsOptions = require("./config/cors-origin")

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
//cors credentials it is very important to be directly ontop of the cors
app.use(credentials)

app.use(cors(corsOptions))
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

//this middleware here is to protect all my endpoints
app.use(verifyJwt) 

app.use("/api", categoryRoute); 
app.use("/api", listRoute); 
app.use("/api", productRoute);



//server connection
const port = process.env.PORT || 5000;
app.listen(port,()=> {
    console.log(`this port is currently running on port ${port} `)
})