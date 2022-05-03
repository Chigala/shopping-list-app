const User = require('../database/models/user')
const jwt = require('jwt-simple')
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET


//register the user using passport-local-mongoose plugin
const register_user = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      res.status(200).json('the user is already registered')
      return
    }
    User.register(
      new User({ email: req.body.email, username: req.body.username }),
      req.body.password,
      function (err, msg) {
        if (err) {
          res.status(500).json(err)
        } else {
          res.status(200).json('you have successfully registered')
        }
      }
    )
  } catch (err) {
    console.log(err)
  }
}

//login the user using the passport-local-mongoose plugin
const login_user = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res
        .status(200)
        .json({ message: "this user doesn't exist in our database" })
    } else {
      user.authenticate(req.body.password, function (
        err,
        model,
        PasswordError
      ) {
        if (PasswordError) {
          res.status(500).json('the passsword you entered is incorrect')
        }
        if (model) {
          
          const payload = {
            id: user.id,
            expire: Date.now() + 1000 * 60 * 60 * 24 * 7 //7days
          }
          const token = jwt.encode(payload, jwtSecret)
          res.cookie('cookieToken', token, { httpOnly: true })
          res.status(200).json({msg:"log in complete"})
        }
      })
    }
  } catch (err) {
    console.log(err); 
  }

  
}

module.exports = {
  register_user,
  login_user
}
