const User = require('../database/models/user')
const jwt = require('jwt-simple')
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET
const sendEmail = require('../services/nodemailer')
const Jwt = require('jsonwebtoken')
const Category = require('../database/models/category')

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
          Category.create([
            { name: 'food and vegetables', belongsTo:msg._id },
            { name: 'household and furniture', belongsTo:msg._id },
            { name: 'school stuffs', belongsTo:msg._id }
          ]); 
          res
            .status(200)
            .json({ msg: 'you have successfully registered', user: msg })
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
          res.status(200).json({ msg: 'log in complete' })
        }
      })
    }
  } catch (err) {
    console.log(err)
  }
}

//gets the user profile
const get_profile = (req, res, next) => {
  res.json({
    message: 'you made it to the secure route',
    user: true,
    token: req.query.jwttoken
  })
}

//logout the user
const logout = (req, res) => {
  if (req.cookies['cookieToken']) {
    res.clearCookie('cookieToken', { domain: 'localhost:3000', path: '/' })
    res.status(200).json({ msg: 'you have been logged out', isLoggedIn: false })
  } else {
    req.logout
    res.status(200).json({ msg: 'you a not logged in' })
  }
}

//forgot_password controller it sends the user an email with a token
const forgot_password = async (req, res) => {
  const { email } = req.body
  if (email) {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(200).json({ msg: 'the user name is not found' })
      return
    }
    const userId = user.id
    const password = user.password
    const secret = password + process.env.JWT_SECRET
    const payload = {
      id: userId
    }
    const token = Jwt.sign(payload, secret, { expiresIn: '15m' })
    const link = `http://localhost:5000/api/forgot-password/${userId}/${token}`
    sendEmail(link, email)
    console.log('the new function has been called')
    res.status(200).json({ msg: token, userid: userId })
  } else {
    res.status(200).json('Please input an email')
  }
}

//validates the token that was attached to the message sent to the email
const email_token_validator = async (req, res) => {
  const id = req.params.id

  const token = req.params.token

  try {
    const user = await User.findById(id)
    const secret = user.password + process.env.JWT_SECRET
    Jwt.verify(token, secret)
    // res.status(200).json('the user has a valid token')
    res.redirect(`http://localhost:3000/change-password/${id}`)
  } catch (err) {
    console.log(err)
    res.status(200).redirect('http://localhost:3000/login')
  }
}

//change password controller
const change_password = async (req, res) => {
  const { password, userId } = req.body
  try {
    const user = await User.findById(userId)
    if (user) {
      user.setPassword(password, function () {
        user.save()
        res.status(200).json({ msg: 'the password has been changed' })
      })
    } else {
      console.log("this user doesn't exist")
      res.json('the user is not in the database')
    }
  } catch (err) {
    res.status(200).json("the user doesn't exist")
  }
}

module.exports = {
  register_user,
  login_user,
  forgot_password,
  email_token_validator,
  change_password,
  get_profile,
  logout
}
